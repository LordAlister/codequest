"use client"

import { useState } from "react"
// ✅ Fix Bug 1 — imports manquants
import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"
import CodeEditor from "@/components/CodeEditor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    title: "Variables et console.log",
    xp: 50,
    instructions: "Déclare une variable 'name' avec ton prénom et une variable 'age' avec ton âge. Affiche-les avec console.log().",
    defaultCode: `// Déclare tes variables ici
const name = ""
const age = 0

// Affiche-les ici
`,
  },
  {
    id: 2,
    title: "Conditions",
    xp: 75,
    instructions: "Écris une condition if/else : si age >= 18, affiche 'Majeur', sinon affiche 'Mineur'. Utilise la variable age = 20.",
    defaultCode: `const age = 20

// Écris ta condition ici
`,
  },
  {
    id: 3,
    title: "Boucles",
    xp: 100,
    instructions: "Crée une boucle for qui affiche les nombres de 1 à 5 avec console.log().",
    defaultCode: `// Écris ta boucle ici
`,
  },
]

export default function JSLearnPage() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [justCompleted, setJustCompleted] = useState(false)
  const lesson = lessons[currentLesson]
  const { userId } = useAuth()
  const { completeLesson } = useProgress(userId ?? null)

  const goToLesson = (index: number) => {
    setCurrentLesson(index)
    setJustCompleted(false)
  }

  // ✅ Fix Bug 2 — ajout de async
  const handleSuccess = async () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id])
      // ✅ Fix Bug 3 — "javascript" au lieu de "html"
      await completeLesson("javascript", lesson.id, lesson.xp)
    }
    setJustCompleted(true)
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
          <span className="text-xl">⚡</span>
          <span className="font-bold text-white">JavaScript — Parcours débutant</span>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          {completedLessons.length}/{lessons.length} complétées
        </Badge>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => goToLesson(i)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  completedLessons.includes(l.id)
                    ? "bg-green-500 text-white"
                    : i === currentLesson
                    ? "bg-yellow-600 text-white"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {completedLessons.includes(l.id) ? "✓" : i + 1}
              </button>
            ))}
          </div>
          <Progress
            value={(completedLessons.length / lessons.length) * 100}
            className="flex-1 h-2 bg-slate-700"
          />
          <span className="text-sm text-slate-400">
            {Math.round((completedLessons.length / lessons.length) * 100)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            Leçon {lesson.id} — {lesson.title}
          </h1>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            +{lesson.xp} XP
          </Badge>
        </div>

        <CodeEditor
          key={lesson.id}
          defaultCode={lesson.defaultCode}
          language="javascript"
          instructions={lesson.instructions}
          xpReward={lesson.xp}
          onSuccess={handleSuccess}
        />

        {justCompleted && (
          <div className="flex flex-col items-center gap-3 py-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-xl px-6 text-center">
            {currentLesson < lessons.length - 1 ? (
              <>
                <p className="text-green-400 font-bold text-lg">
                  🎉 Leçon complétée ! +{lesson.xp} XP
                </p>
                <Button
                  onClick={() => goToLesson(currentLesson + 1)}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-8"
                >
                  Leçon suivante →
                </Button>
              </>
            ) : (
              <>
                <p className="text-yellow-400 font-bold text-lg">
                  🏆 Parcours JavaScript terminé ! Tu as tout complété !
                </p>
                <Button
                  onClick={() => window.location.href = "/dashboard"}
                  className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-8"
                >
                  Retour au Dashboard 🏠
                </Button>
              </>
            )}
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button
            onClick={() => goToLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
          </Button>
          <Button
            onClick={() => goToLesson(Math.min(lessons.length - 1, currentLesson + 1))}
            disabled={currentLesson === lessons.length - 1}
            className="bg-yellow-600 hover:bg-yellow-500 text-white"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  )
}
