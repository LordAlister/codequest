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
    title: "Variables et console.log",
    xp: 50,
    instructions: "Crée une variable 'nom' avec ton prénom et une variable 'age' avec ton âge. Affiche-les avec console.log() dans une phrase : 'Je m'appelle X et j'ai Y ans.'",
    defaultCode: `// Déclare tes variables ici
const nom = ""
const age = 0

// Affiche-les avec console.log
`,
  },
  {
    id: 2,
    title: "Fonctions",
    xp: 75,
    instructions: "Crée une fonction 'saluer(prenom)' qui retourne 'Bonjour [prenom], bienvenue sur CodeQuest !'. Appelle-la avec ton prénom et affiche le résultat.",
    defaultCode: `// Crée la fonction saluer
function saluer(prenom) {
  // Retourne le message ici
  
}

// Appelle la fonction et affiche le résultat
console.log(saluer("Massi"))
`,
  },
  {
    id: 3,
    title: "Boucles",
    xp: 100,
    instructions: "Crée un tableau 'langages' avec ['HTML', 'CSS', 'JavaScript', 'Python']. Utilise une boucle forEach pour afficher chaque langage avec son emoji correspondant.",
    defaultCode: `const langages = ['HTML', 'CSS', 'JavaScript', 'Python']
const emojis = ['🌐', '🎨', '⚡', '🐍']

// Boucle forEach pour afficher chaque langage
langages.forEach((lang, index) => {
  // Affiche emoji + langage ici
  
})
`,
  },
  {
    id: 4,
    title: "Conditions",
    xp: 100,
    instructions: "Crée une fonction 'getNiveau(xp)' qui retourne 'Débutant' si xp < 500, 'Intermédiaire' si xp < 2000, et 'Expert' sinon. Teste avec 3 valeurs différentes.",
    defaultCode: `function getNiveau(xp) {
  // Écris les conditions if/else ici
  
}

// Teste la fonction
console.log(getNiveau(200))
console.log(getNiveau(1000))
console.log(getNiveau(5000))
`,
  },
]

export default function JSLearnPage() {
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
                onClick={() => setCurrentLesson(i)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  completedLessons.includes(l.id)
                    ? "bg-green-500 text-white"
                    : i === currentLesson
                    ? "bg-yellow-500 text-black"
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
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
          >
            Suivant <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  )
}
