"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Zap, ArrowLeft, Save } from "lucide-react"
import Logo from "@/components/Logo"
import BadgesGrid from "@/components/BadgesGrid"
import { getEarnedBadges, ALL_BADGES } from "@/lib/badges"
import Link from "next/link"

const avatars = ["⚔️", "🧙", "🦊", "🐉", "🚀", "⭐", "🎮", "🦁", "🐺", "🔥"]

export default function ProfilePage() {
  const { loading, username: initialUsername, email, avatar: initialAvatar, logout } = useAuth()
  const [username, setUsername] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("⚔️")
  const [saved, setSaved] = useState(false)

  const xp = 1240
  const xpMax = 2000
  const level = 7
  const streak = 14

  const earnedBadgeIds = getEarnedBadges({
    xp, streak,
    htmlLessons: 3, cssLessons: 1,
    jsLessons: 1, pythonLessons: 0,
  })

  useEffect(() => {
    if (!loading) {
      setUsername(initialUsername)
      setSelectedAvatar(initialAvatar)
    }
  }, [loading, initialUsername, initialAvatar])

  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { username, avatar: selectedAvatar },
    })
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Chargement... 🗺️</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto border-b border-slate-700/50">
        <Logo size="sm" href="/" />
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
            </Button>
          </Link>
          <Button onClick={logout} variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
            Déconnexion
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* PROFIL HEADER */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-5xl shadow-lg">
                {selectedAvatar}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-extrabold">{username}</h1>
                <p className="text-slate-400 text-sm">{email}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                    <Zap className="w-3 h-3 mr-1" /> Niveau {level}
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Flame className="w-3 h-3 mr-1" /> {streak} jours 🔥
                  </Badge>
                  <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                    <Trophy className="w-3 h-3 mr-1" /> {earnedBadgeIds.length} badges
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-violet-400">{xp}</p>
                <p className="text-xs text-slate-400">XP Total</p>
                <div className="w-24 mt-2">
                  <Progress value={(xp / xpMax) * 100} className="h-2 bg-slate-700" />
                </div>
                <p className="text-xs text-slate-500 mt-1">{xpMax - xp} XP → Niv. {level + 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MODIFIER LE PROFIL */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">✏️ Modifier mon profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Pseudo</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white max-w-sm"
                placeholder="Ton pseudo"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-3 block">Choisis ton avatar</label>
              <div className="flex flex-wrap gap-3">
                {avatars.map((av) => (
                  <button
                    key={av}
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? "bg-violet-600 border-2 border-violet-400 scale-110"
                        : "bg-slate-700 border-2 border-transparent hover:border-slate-500"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleSave} className="bg-violet-600 hover:bg-violet-500 text-white">
              {saved ? "✅ Sauvegardé !" : <><Save className="w-4 h-4 mr-2" />Sauvegarder</>}
            </Button>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "XP Total", value: xp, emoji: "⚡" },
            { label: "Niveau", value: level, emoji: "🎮" },
            { label: "Jours de suite", value: streak, emoji: "🔥" },
            { label: "Badges", value: `${earnedBadgeIds.length}/${ALL_BADGES.length}`, emoji: "🏆" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-5 pb-4">
                <p className="text-2xl mb-1">{stat.emoji}</p>
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BADGES */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              🏆 Mes badges ({earnedBadgeIds.length}/{ALL_BADGES.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BadgesGrid earnedIds={earnedBadgeIds} />
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
