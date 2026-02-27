"use client"

import { ALL_BADGES } from "@/lib/badges"
import { Badge } from "@/components/ui/badge"

interface BadgesGridProps {
  earnedIds: string[]
}

export default function BadgesGrid({ earnedIds }: BadgesGridProps) {
  return (
    <div>

      {/* ✅ Barre de progression */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div
            className="bg-violet-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(earnedIds.length / ALL_BADGES.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 shrink-0">
          {earnedIds.length}/{ALL_BADGES.length} badges
        </span>
      </div>

      {/* Grille des badges */}
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

    </div>
  )
}
