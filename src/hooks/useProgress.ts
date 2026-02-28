"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { getEarnedBadges, ALL_BADGES } from "@/lib/badges"

interface Progress {
  xp: number
  level: number
  streak: number
  lastSeenAt: string | null
  completedLessons: { language: string; lesson_id: number }[]
}

export function useProgress(userId: string | null) {
  const [progress, setProgress] = useState<Progress>({
    xp: 0,
    level: 1,
    streak: 0,
    lastSeenAt: null,
    completedLessons: [],
  })
  const [loading, setLoading] = useState(true)
  const [newBadge, setNewBadge] = useState<{ emoji: string; name: string } | null>(null)

  const fetchProgress = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const [{ data: profile }, { data: lessons }] = await Promise.all([
      supabase
        .from("profiles")
        .select("xp, level, streak, last_seen_at")
        .eq("id", userId)
        .single(),
      supabase
        .from("progress")
        .select("language, lesson_id")
        .eq("user_id", userId),
    ])

    if (profile) {
      setProgress({
        xp: profile.xp ?? 0,
        level: profile.level ?? 1,
        streak: profile.streak ?? 0,
        lastSeenAt: profile.last_seen_at ?? null,
        completedLessons: lessons ?? [],
      })
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    if (!userId) return
    fetchProgress()

    const channel = supabase
      .channel(`profile-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        () => {
          fetchProgress()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchProgress, userId])

  const completeLesson = useCallback(
    async (language: string, lessonId: number, xpReward: number) => {
      if (!userId) return

      // 1) Vérifier si la leçon est déjà complétée
      const { data: existing } = await supabase
        .from("progress")
        .select("id")
        .eq("user_id", userId)
        .eq("language", language)
        .eq("lesson_id", lessonId)
        .maybeSingle()

      const alreadyDone = !!existing

      // 2) Upsert dans progress (protection unique en base)
      await supabase.from("progress").upsert(
        {
          user_id: userId,
          language,
          lesson_id: lessonId,
          xp_earned: xpReward,
        },
        { onConflict: "user_id,language,lesson_id" },
      )

      const today = new Date().toDateString()
      const lastSeen = new Date(progress.lastSeenAt ?? 0).toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      const newStreak =
        lastSeen === yesterday
          ? progress.streak + 1
          : lastSeen === today
          ? progress.streak
          : 1

      // 3) Si déjà complétée → pas de XP en plus
      const gainedXp = alreadyDone ? 0 : xpReward
      const newXp = progress.xp + gainedXp
      const newLevel = Math.floor(newXp / 500) + 1
      const now = new Date().toISOString()

      await supabase.from("profiles").upsert(
        {
          id: userId,
          xp: newXp,
          level: newLevel,
          streak: newStreak,
          last_seen_at: now,
        },
        { onConflict: "id" },
      )

      // 4) Badges : calcul avant / après
      const newLessons = alreadyDone
        ? progress.completedLessons
        : [...progress.completedLessons, { language, lesson_id: lessonId }]

      const htmlLessons = newLessons.filter((l) => l.language === "html").length
      const cssLessons = newLessons.filter((l) => l.language === "css").length
      const jsLessons = newLessons.filter((l) => l.language === "javascript").length
      const pythonLessons = newLessons.filter((l) => l.language === "python").length

      const badgesBefore = getEarnedBadges({
        xp: progress.xp,
        streak: progress.streak,
        htmlLessons: progress.completedLessons.filter((l) => l.language === "html").length,
        cssLessons: progress.completedLessons.filter((l) => l.language === "css").length,
        jsLessons: progress.completedLessons.filter((l) => l.language === "javascript").length,
        pythonLessons: progress.completedLessons.filter((l) => l.language === "python").length,
      })

      const badgesAfter = getEarnedBadges({
        xp: newXp,
        streak: newStreak,
        htmlLessons,
        cssLessons,
        jsLessons,
        pythonLessons,
      })

      const unlocked = badgesAfter.find((id) => !badgesBefore.includes(id))
      if (unlocked) {
        const badge = ALL_BADGES.find((b) => b.id === unlocked)
        if (badge) setNewBadge({ emoji: badge.emoji, name: badge.name })
      }

      setProgress((prev) => ({
        ...prev,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        lastSeenAt: now,
        completedLessons: newLessons,
      }))
    },
    [userId, progress],
  )

  return {
    progress,
    loading,
    completeLesson,
    refetch: fetchProgress,
    newBadge,
    clearBadge: () => setNewBadge(null),
  }
}
