"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Send, Mail, Twitter, X } from "lucide-react"

type Subject = "Support" | "Bug" | "Suggestion" | "Parent" | ""

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState<Subject>("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const subjects: Subject[] = ["Support", "Bug", "Suggestion", "Parent"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!res.ok) throw new Error("Erreur serveur")

      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="max-w-xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-3xl mb-3 block">✉️</span>
        <h2 className="text-3xl font-bold text-white mb-2">Contacte-nous</h2>
        <p className="text-slate-400 text-sm">
          Une question, un bug ou une idée ? On te répond dans les 24–48h.
        </p>
      </div>

      {/* Formulaire */}
      <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nom */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nom</label>
            <Input
              required
              placeholder="Ton prénom ou nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 text-sm focus:border-violet-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <Input
              type="email"
              required
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 text-sm focus:border-violet-500"
            />
          </div>

          {/* Sujet */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Sujet</label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    subject === s
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-300 hover:border-violet-500"
                  }`}
                >
                  {s === "Support" && "🆘 "}
                  {s === "Bug" && "🐛 "}
                  {s === "Suggestion" && "💡 "}
                  {s === "Parent" && "👪 "}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Message — textarea natif pour éviter les bugs */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Décris ta question ou ton problème..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 placeholder:text-slate-500 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>

          {/* Bouton */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              "Envoi en cours..."
            ) : (
              <>
                <Send className="w-4 h-4" /> Envoyer le message
              </>
            )}
          </Button>

          {/* Feedback success */}
          {status === "success" && (
            <div className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <p className="text-xs text-green-300">
                Message envoyé ! On te répond dans les 24–48h. Merci 🙌
              </p>
            </div>
          )}

          {/* Feedback error */}
          {status === "error" && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-300">
                Oups, une erreur est survenue. Réessaie ou écris directement à{" "}
                <a
                  href="mailto:support@codequest.app"
                  className="underline hover:text-red-200 transition"
                >
                  support@codequest.app
                </a>
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Infos contact direct */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
        <a
          href="mailto:support@codequest.app"
          className="flex items-center gap-1.5 hover:text-violet-400 transition"
        >
          <Mail className="w-3.5 h-3.5" />
          support@codequest.app
        </a>
        <span className="hidden sm:block text-slate-600">•</span>
        <a
          href="https://twitter.com/codequest"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-violet-400 transition"
        >
          <X className="w-3.5 h-3.5" />
          @codequest
        </a>
      </div>
    </section>
  )
}
