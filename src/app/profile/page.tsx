"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"
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


// Nombre total de leçons par langage
const TOTAL_LESSONS = {
  html: 3,
  css: 3,
  javascript: 3,
  python: 3,
}
const TOTAL_ALL = Object.values(TOTAL_LESSONS).reduce((a, b) => a + b, 0)

export default function ProfilePage() {
  const { loading, userId, username: initialUsername, email, avatar: initialAvatar, logout } = useAuth()
  const { progress } = useProgress(userId)
  const [username, setUsername] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("⚔️")
  const [saved, setSaved] = useState(false)

  // ✅ Valeurs réelles depuis Supabase
  const xp = progress.xp
  const level = progress.level
  const streak = progress.streak
  const xpMax = level * 500
  const xpInLevel = xp - (level - 1) * 500

  const htmlLessons = progress.completedLessons.filter(l => l.language === "html").length
  const cssLessons = progress.completedLessons.filter(l => l.language === "css").length
  const jsLessons = progress.completedLessons.filter(l => l.language === "javascript").length
  const pythonLessons = progress.completedLessons.filter(l => l.language === "python").length

  const earnedBadgeIds = getEarnedBadges({
    xp, streak,
    htmlLessons, cssLessons, jsLessons, pythonLessons,
  })

  const [joinedAt, setJoinedAt] = useState<string | null>(null)

useEffect(() => {
  const fetchJoinDate = async () => {
    const { data } = await supabase.auth.getUser()
    if (data?.user?.created_at) {
      const date = new Date(data.user.created_at)
      setJoinedAt(date.toLocaleDateString("fr-CA", {
        year: "numeric", month: "long", day: "numeric"
      }))
    }
  }
  fetchJoinDate()
}, [])


  useEffect(() => {
    if (!loading) {
      setUsername(initialUsername)
      setSelectedAvatar(initialAvatar)
    }
  }, [loading, initialUsername, initialAvatar])

  const handleSave = async () => {
    // ✅ Sauvegarde username + avatar dans profiles ET auth
    const [{ error: authError }] = await Promise.all([
      supabase.auth.updateUser({ data: { username, avatar: selectedAvatar } }),
      supabase.from("profiles").update({ username, avatar: selectedAvatar }).eq("id", userId),
    ])
    if (!authError) {
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
                {/* ✅ Affiche "Aventurier" si username est NULL */}
                <h1 className="text-2xl font-extrabold">{username || "Aventurier"}</h1>
                <p className="text-slate-400 text-sm">{email}</p>
                {joinedAt && (<p className="text-slate-500 text-xs mt-1">📅 Membre depuis {joinedAt}</p>)}

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
                  {/* ✅ Barre de progression dans le niveau actuel */}
                  <Progress value={(xpInLevel / 500) * 100} className="h-2 bg-slate-700" />
                </div>
                <p className="text-xs text-slate-500 mt-1">{500 - xpInLevel} XP → Niv. {level + 1}</p>
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

        {/* LEÇONS PAR LANGAGE ✅ NOUVEAU */}
        {/* LEÇONS PAR LANGAGE — avec barre de progression */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center justify-between">
                <span>📚 Leçons complétées</span>
                <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                  {htmlLessons + cssLessons + jsLessons + pythonLessons} / {TOTAL_ALL} leçons
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "HTML", value: htmlLessons, total: TOTAL_LESSONS.html, emoji: "🌐", color: "bg-orange-500" },
                { label: "CSS", value: cssLessons, total: TOTAL_LESSONS.css, emoji: "🎨", color: "bg-blue-500" },
                { label: "JavaScript", value: jsLessons, total: TOTAL_LESSONS.javascript, emoji: "⚡", color: "bg-yellow-500" },
                { label: "Python", value: pythonLessons, total: TOTAL_LESSONS.python, emoji: "🐍", color: "bg-green-500" },
              ].map((lang) => {
                const percent = Math.round((lang.value / lang.total) * 100)
                const completed = lang.value >= lang.total
                return (
                  <div key={lang.label} className="flex items-center gap-3">
                    <span className="text-xl w-7">{lang.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold">{lang.label}</span>
                        <span className={completed ? "text-green-400 font-bold" : "text-slate-400"}>
                          {lang.value}/{lang.total} {completed && "✅"}
                        </span>
                      </div>
                      <Progress value={percent} className="h-2 bg-slate-700" />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

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
