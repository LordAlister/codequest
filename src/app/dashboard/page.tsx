"use client"

import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Star, Code2, LogOut, BookOpen, Zap, Lock } from "lucide-react"
import BadgesGrid from "@/components/BadgesGrid"
import { getEarnedBadges, ALL_BADGES } from "@/lib/badges"
import Link from "next/link"
import Logo from "@/components/Logo"

const languages = [
  { name: "HTML", emoji: "🌐", color: "from-orange-500 to-orange-600", progress: 60, level: 3, lessons: 12, totalLessons: 20, unlocked: true },
  { name: "CSS", emoji: "🎨", color: "from-blue-500 to-blue-600", progress: 30, level: 2, lessons: 6, totalLessons: 20, unlocked: true },
  { name: "JavaScript", emoji: "⚡", color: "from-yellow-500 to-yellow-600", progress: 10, level: 1, lessons: 2, totalLessons: 30, unlocked: true },
  { name: "Python", emoji: "🐍", color: "from-green-500 to-green-600", progress: 0, level: 0, lessons: 0, totalLessons: 30, unlocked: false },
]

export default function Dashboard() {
  const { loading, username, logout } = useAuth()

  const xp = 1240
  const xpMax = 2000
  const level = 7
  const streak = 14

  const earnedBadgeIds = getEarnedBadges({
    xp, streak,
    htmlLessons: 3, cssLessons: 1,
    jsLessons: 1, pythonLessons: 0,
  })

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Chargement de ton aventure... 🗺️</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-4 max-w-6xl mx-auto border-b border-slate-700/50">
        <Logo size="sm" href="/" />
        <div className="flex items-center gap-2">
          <Badge className="hidden sm:flex bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Flame className="w-3 h-3 mr-1" /> {streak} jours 🔥
          </Badge>
          <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
            <Zap className="w-3 h-3 mr-1" /> {xp} XP
          </Badge>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
              Profil
            </Button>
          </Link>
          <Button onClick={logout} variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* PROFIL HERO */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/profile">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg hover:scale-110 transition-all">
                  ⚔️
                </div>
              </Link>
              <div className="flex-1 text-center sm:text-left w-full">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Salut, {username} ! 👋
                </h1>
                <p className="text-slate-400 mb-3 text-sm">Niveau {level} — Aventurier du Code</p>
                <div className="w-full max-w-md mx-auto sm:mx-0">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>{xp} XP</span>
                    <span>{xpMax} XP</span>
                  </div>
                  <Progress value={(xp / xpMax) * 100} className="h-3 bg-slate-700" />
                  <p className="text-xs text-slate-500 mt-1">{xpMax - xp} XP avant le niveau {level + 1}</p>
                </div>
              </div>
              <div className="flex sm:flex-col gap-3">
                <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                  <Trophy className="mx-auto mb-1 text-yellow-400" size={20} />
                  <p className="text-lg font-bold">{earnedBadgeIds.length}</p>
                  <p className="text-xs text-slate-400">Badges</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                  <BookOpen className="mx-auto mb-1 text-violet-400" size={20} />
                  <p className="text-lg font-bold">20</p>
                  <p className="text-xs text-slate-400">Leçons</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                  <Star className="mx-auto mb-1 text-pink-400" size={20} />
                  <p className="text-lg font-bold">#{streak}</p>
                  <p className="text-xs text-slate-400">Série</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LANGAGES */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="text-violet-400" /> Tes parcours
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <Card key={lang.name} className={`border-slate-700 transition-all ${lang.unlocked ? "bg-slate-800/50 hover:border-violet-500" : "bg-slate-800/20 opacity-60"}`}>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{lang.emoji}</span>
                      <div>
                        <p className="font-bold text-white">{lang.name}</p>
                        <p className="text-xs text-slate-400">{lang.unlocked ? `Niveau ${lang.level}` : "Verrouillé"}</p>
                      </div>
                    </div>
                    {lang.unlocked ? (
                      <Badge className={`bg-gradient-to-r ${lang.color} text-white border-0`}>
                        {lang.lessons}/{lang.totalLessons} leçons
                      </Badge>
                    ) : (
                      <Lock className="text-slate-500" size={20} />
                    )}
                  </div>
                  {lang.unlocked && (
                    <>
                      <Progress value={lang.progress} className="h-2 bg-slate-700" />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-slate-400">{lang.progress}% complété</span>
                        <Link href={`/learn/${lang.name.toLowerCase()}`}>
                          <Button size="sm" className={`bg-gradient-to-r ${lang.color} text-white border-0 h-7 text-xs`}>
                            Continuer →
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* BADGES */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-400" /> Tes badges ({earnedBadgeIds.length}/{ALL_BADGES.length})
          </h2>
          <BadgesGrid earnedIds={earnedBadgeIds} />
        </div>

        {/* DÉFI DU JOUR */}
<Card className="bg-gradient-to-r from-violet-900/50 to-pink-900/50 border-violet-500/30">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-white">
      <Flame className="text-orange-400" /> Défi du jour
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-slate-300 mb-4">
      Crée une carte de profil en HTML/CSS avec une image, un nom et une bio.
    </p>
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
        +150 XP
      </Badge>
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
        Badge spécial
      </Badge>
      <Link href="/learn/html" className="ml-auto">
        <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white">
          Relever le défi
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>


      </div>
    </main>
  )
}
