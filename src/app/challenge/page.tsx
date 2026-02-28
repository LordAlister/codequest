"use client"

import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"
import { useHearts } from "@/hooks/useHearts"
import { getTodayChallenge } from "@/lib/challenges"
import CodeEditor from "@/components/CodeEditor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Flame } from "lucide-react"
import Link from "next/link"

export default function ChallengePage() {
  const challenge = getTodayChallenge()
  const { userId } = useAuth()
  const { completeLesson } = useProgress(userId ?? null)
  const { hearts, maxHearts, nextRefill, loseHeart } = useHearts(userId ?? null)

  const handleSuccess = async () => {
    if (userId) {
      await completeLesson("challenge", challenge.id, challenge.xp)
    }
  }

  const langEmoji: Record<string, string> = {
    html: "🌐",
    css: "🎨",
    javascript: "⚡",
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 max-w-7xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Home className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Flame className="text-orange-400 w-5 h-5" />
          <span className="font-bold text-white">Défi du jour</span>
        </div>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
          +{challenge.xp} XP
        </Badge>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            {langEmoji[challenge.language]} {challenge.title}
          </h1>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            🏅 Badge spécial disponible
          </Badge>
        </div>

        <CodeEditor
          defaultCode={challenge.defaultCode}
          language={challenge.language}
          instructions={challenge.description}
          expectedOutput={challenge.expectedOutput}
          hint={challenge.hint}
          xpReward={challenge.xp}
          onSuccess={handleSuccess}
          hearts={hearts}
          maxHearts={maxHearts}
          nextRefill={nextRefill}
          onError={loseHeart}
        />
      </div>
    </main>
  )
}
