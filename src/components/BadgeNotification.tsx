"use client"

import { useEffect, useState } from "react"


interface BadgeNotificationProps {
  badge: { emoji: string; name: string } | null
  onClose: () => void
}

export default function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!badge) return

    const showTimer = setTimeout(() => setVisible(true), 50)

    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    const closeTimer = setTimeout(() => {
      onClose()
    }, 3300)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(closeTimer)
    }
  }, [badge, onClose])

  if (!badge) return null

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-gradient-to-r from-violet-900 to-pink-900 border border-violet-500 rounded-2xl p-5 shadow-2xl flex items-center gap-4 min-w-[280px]">
        <div className="text-5xl animate-bounce">{badge.emoji}</div>
        <div>
          <p className="text-xs text-violet-300 font-semibold uppercase tracking-wider">
            🎉 Nouveau badge débloqué !
          </p>
          <p className="text-white font-extrabold text-lg">{badge.name}</p>
        </div>
      </div>
    </div>
  )
}
