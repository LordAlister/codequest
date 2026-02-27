"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

interface Progress {
  xp: number
  level: number
  streak: number
  lastSeenAt: string | null  // ✅ Ajouté pour calculer le streak
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

  // ── Charge la progression depuis Supabase
  const fetchProgress = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const [{ data: profile }, { data: lessons }] = await Promise.all([
      supabase.from("profiles").select("xp, level, streak, last_seen_at").eq("id", userId).single(),
      supabase.from("progress").select("language, lesson_id").eq("user_id", userId),
    ])

    if (profile) {
      setProgress({
        xp: profile.xp ?? 0,
        level: profile.level ?? 1,
        streak: profile.streak ?? 0,
        lastSeenAt: profile.last_seen_at ?? null,  // ✅ Stocké dans le state
        completedLessons: lessons ?? [],
      })
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  // ── Complète une leçon + ajoute XP + met à jour le streak
  const completeLesson = useCallback(async (
    language: string,
    lessonId: number,
    xpReward: number
  ) => {
    if (!userId) return

    // 1. Calcul du nouveau streak
    const today = new Date().toDateString()
    const lastSeen = new Date(progress.lastSeenAt ?? 0).toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    const newStreak =
      lastSeen === yesterday
        ? progress.streak + 1  // ✅ Connecté hier → +1
        : lastSeen === today
        ? progress.streak       // ✅ Déjà compté aujourd'hui
        : 1                     // ❌ Série brisée → repart à 1

    // 2. Insère la leçon complétée (ignore si déjà faite)
    await supabase.from("progress").upsert({
      user_id: userId,
      language,
      lesson_id: lessonId,
      xp_earned: xpReward,
    }, { onConflict: "user_id,language,lesson_id" })

    // 3. Met à jour XP + level + streak dans profiles
    const newXp = progress.xp + xpReward
    const newLevel = Math.floor(newXp / 500) + 1
    const now = new Date().toISOString()

    await supabase.from("profiles").upsert({
      id: userId,
      xp: newXp,
      level: newLevel,
      streak: newStreak,       // ✅ Streak mis à jour en base
      last_seen_at: now,
    }, { onConflict: "id" })

    // 4. Met à jour le state local immédiatement
    setProgress((prev) => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      streak: newStreak,       // ✅ Streak mis à jour dans l'UI
      lastSeenAt: now,
      completedLessons: [
        ...prev.completedLessons,
        { language, lesson_id: lessonId },
      ],
    }))
  }, [userId, progress.xp, progress.streak, progress.lastSeenAt])

  return { progress, loading, completeLesson, refetch: fetchProgress }
}
