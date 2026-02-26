"use client"

import { ALL_BADGES } from "@/lib/badges"
import { Badge } from "@/components/ui/badge"

interface BadgesGridProps {
  earnedIds: string[]
}

export default function BadgesGrid({ earnedIds }: BadgesGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {ALL_BADGES.map((badge) => {
        const earned = earnedIds.includes(badge.id)
        return (
          <div
            key={badge.id}
            title={badge.description}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
              earned
                ? "bg-slate-700/60 border-violet-500/50 hover:scale-110 cursor-pointer"
                : "bg-slate-800/20 border-slate-700 opacity-40 grayscale"
            }`}
          >
            <span className="text-3xl">{badge.emoji}</span>
            <span className="text-xs text-slate-300 text-center leading-tight font-medium">
              {badge.name}
            </span>
            {earned && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-1">
                ✓
              </Badge>
            )}
          </div>
        )
      })}
    </div>
  )
}
