"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Users, BookOpen, Award, Code2 } from "lucide-react"

export default function StatsBar() {
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalBadges, setTotalBadges] = useState(50)
  const [activeLanguages, setActiveLanguages] = useState(4)

  useEffect(() => {
    // ── 1. Supabase Presence → apprenants actifs en live
    const room = supabase.channel("active_learners", {
      config: { presence: { key: crypto.randomUUID() } },
    })

    room
      .on("presence", { event: "sync" }, () => {
        const state = room.presenceState<{ language: string }>()
        const users = Object.values(state).flat()

        // Nb apprenants actifs
        setActiveUsers(users.length)

        // Langages actifs en ce moment (utilisateurs en train d'apprendre quel langage)
        const langs = new Set(users.map((u) => u.language).filter(Boolean))
        setActiveLanguages(langs.size > 0 ? langs.size : 4)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Broadcast le langage actif de l'utilisateur courant
          // (tu peux passer le langage courant en prop si besoin)
          await room.track({
            online_at: new Date().toISOString(),
            language: "html", // valeur par défaut — à remplacer par le vrai langage
          })
        }
      })

    // ── 2. Count badges depuis Supabase
    supabase
      .from("badges")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => {
        if (count) setTotalBadges(count)
      })

    // ── 3. Realtime sur la table progress → langages avec leçons complétées
    const langChannel = supabase
      .channel("languages_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "progress" },
        async () => {
          const { data } = await supabase
            .from("progress")
            .select("language")
          if (data) {
            const uniqueLangs = new Set(data.map((d) => d.language))
            setActiveLanguages(uniqueLangs.size)
          }
        }
      )
      .subscribe()

    // Fetch initial des langages
    supabase
      .from("progress")
      .select("language")
      .then(({ data }) => {
        if (data && data.length > 0) {
          const uniqueLangs = new Set(data.map((d) => d.language))
          setActiveLanguages(uniqueLangs.size)
        }
      })

    return () => {
      supabase.removeChannel(room)
      supabase.removeChannel(langChannel)
    }
  }, [])

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-violet-400" />,
      value: activeUsers > 0 ? `${activeUsers.toLocaleString()}+` : "...",
      label: "Apprenants actifs",
      live: true,
    },
    {
      icon: <BookOpen className="w-6 h-6 text-violet-400" />,
      value: "200+",
      label: "Leçons disponibles",
      live: false,
    },
    {
      icon: <Award className="w-6 h-6 text-violet-400" />,
      value: `${totalBadges}+`,
      label: "Badges à gagner",
      live: false,
    },
    {
      icon: <Code2 className="w-6 h-6 text-violet-400" />,
      value: activeLanguages.toString(),
      label: "Langages enseignés",
      live: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center gap-2 text-center"
        >
          <div className="flex items-center gap-2">
            {stat.icon}
            {stat.live && (
              <span className="flex items-center gap-1 text-xs text-green-400 font-bold">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <p className="text-3xl font-black text-white">{stat.value}</p>
          <p className="text-slate-400 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
