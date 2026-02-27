"use client"

import { useState } from "react"
import CodeEditor from "@/components/CodeEditor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    title: "Couleurs et Fonds",
    xp: 50,
    instructions: "Style la page : donne au body un fond noir (#0f0f0f), au h1 une couleur violette (#7c3aed) et une taille de 2rem, au paragraphe une couleur grise (#94a3b8).",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { }
      h1 { }
      p { }
    </style>
  </head>
  <body>
    <h1>Bienvenue sur CodeQuest</h1>
    <p>Apprends le CSS pas à pas !</p>
  </body>
</html>`,
  },
  {
    id: 2,
    title: "Flexbox",
    xp: 75,
    instructions: "Centre les 3 cartes horizontalement avec flexbox. Utilise display:flex, justify-content:center et gap:1rem sur le conteneur .cards.",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { background: #0f0f0f; color: white; font-family: sans-serif; padding: 2rem; }
      .cards { /* Ajoute flexbox ici */ }
      .card { background: #1e1b4b; padding: 1.5rem; border-radius: 1rem; width: 150px; text-align: center; border: 1px solid #4c1d95; }
    </style>
  </head>
  <body>
    <div class="cards">
      <div class="card">🌐 HTML</div>
      <div class="card">🎨 CSS</div>
      <div class="card">⚡ JS</div>
    </div>
  </body>
</html>`,
  },
  {
    id: 3,
    title: "Animations CSS",
    xp: 100,
    instructions: "Crée une animation 'pulse' avec @keyframes qui fait passer l'opacité de 1 à 0.4 et retour. Applique-la au titre avec animation: pulse 2s infinite.",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { background: #0f0f0f; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
      @keyframes pulse { /* Définis ici */ }
      h1 { color: #7c3aed; font-size: 3rem; font-family: sans-serif; /* Applique ici */ }
    </style>
  </head>
  <body>
    <h1>CodeQuest ✨</h1>
  </body>
</html>`,
  },
]

export default function CSSLearnPage() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [justCompleted, setJustCompleted] = useState(false)
  const lesson = lessons[currentLesson]

  const goToLesson = (index: number) => {
    setCurrentLesson(index)
    setJustCompleted(false)
  }

  const handleSuccess = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id])
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
          <span className="text-xl">🎨</span>
          <span className="font-bold text-white">CSS — Parcours débutant</span>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
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
                    ? "bg-blue-600 text-white"
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
          language="html"
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
                  🏆 Parcours CSS terminé ! Tu as tout complété !
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
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  )
}
