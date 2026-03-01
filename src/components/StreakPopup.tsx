"use client"

import { AnimatePresence, motion } from "framer-motion"

interface StreakPopupProps {
  streak: number | null
  onClose: () => void
}

export default function StreakPopup({ streak, onClose }: StreakPopupProps) {
  return (
    <AnimatePresence>
      {streak && streak >= 2 && (
        <motion.div
          className="fixed bottom-4 right-4 z-40"
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
        >
          <div
            onClick={onClose}
            className="cursor-pointer bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3"
          >
            <span className="text-2xl">🔥</span>
            <div className="text-sm">
              <p className="font-bold">Série préservée !</p>
              <p className="text-xs">
                Tu es à <span className="font-semibold">{streak} jours d’affilée</span>. Ne lâche rien !
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
