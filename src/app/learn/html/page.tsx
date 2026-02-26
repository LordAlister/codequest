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
    title: "Ta première page HTML",
    xp: 50,
    instructions: "Crée une page HTML avec un titre <h1> qui dit 'Bonjour CodeQuest !' et un paragraphe <p> avec ton prénom.",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Ma page</title>
  </head>
  <body>
    <!-- Écris ton code ici -->
    <h1>Bonjour CodeQuest !</h1>
    <p>Je m'appelle ...</p>
  </body>
</html>`,
  },
  {
    id: 2,
    title: "Les liens et images",
    xp: 75,
    instructions: "Ajoute un lien <a> vers https://google.com avec le texte 'Visiter Google' et une image <img> avec src='https://picsum.photos/200'.",
    defaultCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Ajoute un lien et une image -->
    
  </body>
</html>`,
  },
  {
    id: 3,
    title: "Les listes HTML",
    xp: 75,
    instructions: "Crée une liste non-ordonnée <ul> avec 3 de tes langages préférés, et une liste ordonnée <ol> avec les 3 étapes pour apprendre à coder.",
    defaultCode: `<!DOCTYPE html>
<html>
  <body>
    <h2>Mes langages préférés</h2>
    <ul>
      <!-- 3 items ici -->
    </ul>

    <h2>Comment apprendre à coder</h2>
    <ol>
      <!-- 3 étapes ici -->
    </ol>
  </body>
</html>`,
  },
]

export default function HTMLLearnPage() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const lesson = lessons[currentLesson]

  const handleSuccess = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id])
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 max-w-7xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Home className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌐</span>
          <span className="font-bold text-white">HTML — Parcours débutant</span>
        </div>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
          {completedLessons.length}/{lessons.length} complétées
        </Badge>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        {/* PROGRESSION */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setCurrentLesson(i)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  completedLessons.includes(l.id)
                    ? "bg-green-500 text-white"
                    : i === currentLesson
                    ? "bg-violet-600 text-white"
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

        {/* TITRE LEÇON */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            Leçon {lesson.id} — {lesson.title}
          </h1>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            +{lesson.xp} XP
          </Badge>
        </div>

        {/* ÉDITEUR */}
        <CodeEditor
          key={lesson.id}
          defaultCode={lesson.defaultCode}
          language="html"
          instructions={lesson.instructions}
          xpReward={lesson.xp}
          onSuccess={handleSuccess}
        />

        {/* NAVIGATION */}
        <div className="flex justify-between pt-2">
          <Button
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
          </Button>
          <Button
            onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
            disabled={currentLesson === lessons.length - 1}
            className="bg-violet-600 hover:bg-violet-500 text-white"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

      </div>
    </main>
  )
}
