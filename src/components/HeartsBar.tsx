"use client"

interface HeartsBarProps {
  hearts: number
  maxHearts: number
  nextRefill: Date | null
}

export default function HeartsBar({ hearts, maxHearts, nextRefill }: HeartsBarProps) {
  const getTimeLeft = () => {
    if (!nextRefill) return null
    const diff = nextRefill.getTime() - Date.now()
    if (diff <= 0) return null
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const timeLeft = getTimeLeft()

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <span
            key={i}
            className={`text-xl transition-all ${
              i < hearts ? "opacity-100 scale-100" : "opacity-25 grayscale scale-90"
            }`}
          >
            ❤️
          </span>
        ))}
      </div>
      {timeLeft && (
        <span className="text-xs text-slate-400">+1 dans {timeLeft}</span>
      )}
    </div>
  )
}
