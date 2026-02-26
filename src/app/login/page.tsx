"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Email ou mot de passe incorrect.")
    } else {
      router.push("/dashboard")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800/60 border-slate-700">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <CardTitle className="text-2xl font-extrabold text-white">
            Bon retour sur CodeQuest !
          </CardTitle>
          <p className="text-slate-400 text-sm mt-1">Connecte-toi pour continuer ton aventure</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white py-5"
            >
              {loading ? "Connexion..." : "Se connecter 🚀"}
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-violet-400 hover:underline font-semibold">
              Créer un compte
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
