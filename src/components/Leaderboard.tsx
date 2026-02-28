"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

interface LeaderboardEntry {
  id: string
  username: string
  avatar: string
  xp: number
  level: number
}

const medals = ["🥇", "🥈", "🥉"]

export default function Leaderboard({ currentUserId }: { currentUserId: string | null }) {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, username, avatar, xp, level")
      .order("xp", { ascending: false })
      .limit(10)

    if (data) setPlayers(data)
    setLoading(false)
  }, [])

  useEffect(() => {
  fetch()

  // Realtime
  const channel = supabase
    .channel("leaderboard")
    .on("postgres_changes", {
      event: "*",           // ← ALL events (INSERT + UPDATE + DELETE)
      schema: "public",
      table: "profiles",
    }, () => fetch())
    .subscribe()

  // Polling toutes les 10s (plus rapide)
  const interval = setInterval(fetch, 10000)

  return () => {
    supabase.removeChannel(channel)
    clearInterval(interval)
  }
}, [fetch])

  if (loading) return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="pt-6">
        <p className="text-slate-400 text-sm text-center animate-pulse">
          Chargement du classement...
        </p>
      </CardContent>
    </Card>
  )

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Trophy className="text-yellow-400" /> Classement XP
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {players.map((player, index) => {
          const isCurrentUser = player.id === currentUserId
          return (
            <div
              key={player.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                isCurrentUser
                  ? "bg-violet-600/30 border border-violet-500/40"
                  : "bg-slate-700/40 hover:bg-slate-700/60"
              }`}
            >
              {/* Rang */}
              <span className="text-lg w-6 text-center">
                {index < 3 ? medals[index] : `#${index + 1}`}
              </span>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-sm">
                {player.avatar || "🎮"}
              </div>

              {/* Nom */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${
                  isCurrentUser ? "text-violet-300" : "text-white"
                }`}>
                  {player.username || "Anonyme"}
                  {isCurrentUser && (
                    <span className="text-xs text-violet-400 ml-1">(toi)</span>
                  )}
                </p>
                <p className="text-xs text-slate-400">Niveau {player.level}</p>
              </div>

              {/* XP */}
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                {player.xp} XP
              </Badge>
            </div>
          )
        })}

        {players.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-4">
            Aucun joueur encore — sois le premier ! 🚀
          </p>
        )}
      </CardContent>
    </Card>
  )
}
