"use client"

import { useEffect, useState } from "react"
import { getTodayChallenge, getTimeUntilMidnight } from "@/lib/challenges"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Clock } from "lucide-react"
import Link from "next/link"

export default function DailyChallenge() {
  const challenge = getTodayChallenge()
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const langColors: Record<string, string> = {
    html: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    css: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  }

  return (
    <Card className="bg-gradient-to-r from-violet-900/50 to-pink-900/50 border-violet-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-400" />
            Défi du jour
          </div>
          <div className="flex items-center gap-1 text-sm font-normal text-slate-400">
            <Clock className="w-4 h-4" />
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white font-semibold mb-1">{challenge.title}</p>
        <p className="text-slate-300 text-sm mb-4">{challenge.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            +{challenge.xp} XP
          </Badge>
          <Badge className={langColors[challenge.language]}>
            {challenge.language.toUpperCase()}
          </Badge>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            🏅 Badge spécial
          </Badge>
          <Link href="/challenge" className="ml-auto">
            <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white">
              Relever le défi →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
