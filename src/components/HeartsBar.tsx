"use client"

import { useEffect, useState } from "react"

interface HeartsBarProps {
  hearts: number
  maxHearts: number
  nextRefill: Date | null
}

export default function HeartsBar({ hearts, maxHearts, nextRefill }: HeartsBarProps) {
  const [shake, setShake] = useState(false)
  const [prevHearts, setPrevHearts] = useState(hearts)

  // ✅ Déclenche l'animation shake quand on perd un cœur
  useEffect(() => {
    if (hearts < prevHearts) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    setPrevHearts(hearts)
  }, [hearts, prevHearts])

  const getTimeLeft = () => {
    if (!nextRefill) return null
    const diff = nextRefill.getTime() - Date.now()
    if (diff <= 0) return null
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const timeLeft = getTimeLeft()

  // ✅ Couleur + emoji selon les vies restantes
  const getHeartEmoji = () => {
    if (hearts <= 0) return "🖤"
    if (hearts === 1) return "💔"
    if (hearts === 2) return "🧡"
    if (hearts === 3) return "💛"
    if (hearts === 4) return "💜"
    return "❤️"
  }

  const getHeartColor = () => {
    if (hearts <= 0) return "text-slate-500"
    if (hearts === 1) return "text-red-400"
    if (hearts === 2) return "text-orange-400"
    if (hearts === 3) return "text-yellow-400"
    if (hearts === 4) return "text-violet-400"
    return "text-red-500"
  }

  const pct = (hearts / maxHearts) * 100

  const getBarColor = () => {
    if (pct <= 20) return "bg-slate-500"
    if (pct <= 40) return "bg-red-500"
    if (pct <= 60) return "bg-orange-500"
    if (pct <= 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      {/* Grand cœur animé */}
      <span
        className={`text-3xl transition-all duration-300 ${getHeartColor()} ${
          shake ? "animate-bounce scale-125" : "scale-100"
        } ${hearts <= 0 ? "grayscale" : ""}`}
      >
        {getHeartEmoji()}
      </span>

      {/* Barre de vie + compteur */}
      <div className="flex flex-col gap-1 min-w-[80px]">
        <div className="flex justify-between items-center">
          <span className={`text-xs font-bold ${getHeartColor()}`}>
            {hearts}/{maxHearts}
          </span>
          {timeLeft && (
            <span className="text-xs text-slate-500">+1 {timeLeft}</span>
          )}
        </div>
        {/* Barre de vie */}
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
