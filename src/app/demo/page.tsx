"use client"

import { useState } from "react"
import CodeEditor from "@/components/CodeEditor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Logo from "@/components/Logo"
import Link from "next/link"

const demoLesson = {
  id: 1,
  title: "Ma première page HTML",
  xp: 50,
  instructions: "Crée une page HTML avec un titre <h1> qui dit 'Bonjour CodeQuest !' et un paragraphe <p> qui dit 'Je fais ma première page web !'.",
  defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Ma première page</title>
  </head>
  <body>
    <!-- Écris ton HTML ici -->

  </body>
</html>`,
}

export default function DemoPage() {
  const [completed, setCompleted] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 max-w-7xl mx-auto">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Se connecter
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white font-bold">
              Commencer gratuitement 🚀
            </Button>
          </Link>
        </div>
      </nav>

      {/* Banner */}
      <div className="bg-violet-600/20 border-b border-violet-500/30 px-6 py-3 text-center">
        <p className="text-violet-300 text-sm">
          🎮 Mode démo — <span className="font-bold">1 leçon gratuite</span> sans compte.{" "}
          <Link href="/signup" className="text-white font-bold underline hover:text-violet-200">
            Crée ton compte pour débloquer tout le contenu →
          </Link>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Header leçon */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">🌐 HTML — Leçon démo</p>
            <h1 className="text-3xl font-extrabold">
              {demoLesson.title}
            </h1>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-lg px-4 py-1">
            +{demoLesson.xp} XP
          </Badge>
        </div>

        {/* Éditeur */}
        <CodeEditor
          key={demoLesson.id}
          defaultCode={demoLesson.defaultCode}
          language="html"
          instructions={demoLesson.instructions}
          xpReward={demoLesson.xp}
          onSuccess={() => setCompleted(true)}
        />

        {/* Message après succès */}
        {completed && (
          <div className="flex flex-col items-center gap-4 py-6 bg-gradient-to-r from-violet-900/60 to-pink-900/60 border border-violet-500/30 rounded-xl text-center px-6">
            <p className="text-2xl font-extrabold text-white">
              🎉 Bravo ! Tu viens de coder ta première page web !
            </p>
            <p className="text-slate-300 max-w-lg">
              Tu as gagné <span className="text-yellow-400 font-bold">+{demoLesson.xp} XP</span>.
              Crée ton compte gratuit pour sauvegarder ta progression et débloquer HTML, CSS, JavaScript et Python !
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <Button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3 text-lg">
                  🚀 Créer mon compte gratuit
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3">
                  J&apos;ai déjà un compte
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* CTA bas de page si pas encore complété */}
        {!completed && (
          <div className="text-center py-4 border-t border-slate-700/50">
            <p className="text-slate-500 text-sm">
              Déjà convaincu ?{" "}
              <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-bold">
                Crée ton compte gratuit →
              </Link>
            </p>
          </div>
        )}

      </div>
    </main>
  )
}
