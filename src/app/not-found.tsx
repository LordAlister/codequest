"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white flex flex-col items-center justify-center gap-8 px-6 text-center">

      {/* Logo */}
      <Logo />

      {/* Code d'erreur animé */}
      <div className="relative">
        <p className="text-[10rem] font-black text-violet-500/20 leading-none select-none">
          404
        </p>
        <p className="absolute inset-0 flex items-center justify-center text-5xl">
          🗺️
        </p>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">
          Page introuvable !
        </h1>
        <p className="text-slate-400 text-lg max-w-md">
          Cette page n&apos;existe pas dans l&apos;univers CodeQuest.
          Tu t&apos;es peut-être perdu dans le code ? 🐛
        </p>
      </div>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3"
        >
          🏠 Retour au Dashboard
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3"
        >
          🚀 Page d&apos;accueil
        </Button>
      </div>

      {/* Easter egg */}
      <p className="text-slate-600 text-sm font-mono">
        Erreur 404 : <span className="text-violet-400">quest</span> not found
      </p>

    </main>
  )
}
