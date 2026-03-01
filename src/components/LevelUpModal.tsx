"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface LevelUpModalProps {
  levelUp: { from: number; to: number } | null
  onClose: () => void
}

export default function LevelUpModal({ levelUp, onClose }: LevelUpModalProps) {
  return (
    <AnimatePresence>
      {levelUp && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900 border border-violet-500/40 rounded-2xl px-8 py-6 max-w-sm w-full text-center shadow-2xl"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-4xl mb-2">🎉</p>
            <h2 className="text-2xl font-extrabold text-white mb-1">
              Niveau {levelUp.to} atteint !
            </h2>
            <p className="text-slate-300 text-sm mb-4">
              Tu passes du niveau {levelUp.from} au niveau {levelUp.to}. Continue ton aventure sur CodeQuest !
            </p>
            <Button
              onClick={onClose}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6"
            >
              Continuer
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
