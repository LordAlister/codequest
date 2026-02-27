"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Logo from "@/components/Logo"
import { useRedirectIfAuthed } from "@/hooks/useRedirectIfAuthed"

export default function SignupPage() {
    useRedirectIfAuthed("/dashboard")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: { data: { username, avatar: "⚔️" } },
    })

    if (error) {
      setError(`Erreur: ${error.message}`)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-slate-800/60 border-slate-700 text-center">
          <CardContent className="pt-10 pb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Compte créé !</h2>
            <p className="text-slate-400 mb-2">Vérifie ton email pour confirmer ton compte.</p>
            <p className="text-slate-500 text-sm mb-6">
              (Si tu as désactivé la confirmation sur Supabase, connecte-toi directement)
            </p>
            <Link href="/login">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white w-full">
                Aller au Login 🚀
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800/60 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Logo size="lg" href="/" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-white mt-2">
            Crée ton aventurier !
          </CardTitle>
          <p className="text-slate-400 text-sm mt-1">Rejoins des milliers d&apos;apprenants</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Pseudo</label>
              <Input
                type="text"
                placeholder="TonPseudo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="toi@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Mot de passe</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white py-5 text-base"
            >
              {loading ? "Création..." : "Commencer l&apos;aventure 🗺️"}
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-violet-400 hover:underline font-semibold">
              Se connecter
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
