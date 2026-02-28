"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, CheckCircle2, XCircle } from "lucide-react"
import HeartsBar from "@/components/HeartsBar"

interface CodeEditorProps {
  defaultCode: string
  expectedOutput?: string
  language: "html" | "css" | "javascript" | "python"
  instructions: string
  xpReward: number
  onSuccess?: () => void
  // ✅ NOUVEAU — cœurs
  hearts?: number
  maxHearts?: number
  nextRefill?: Date | null
  onError?: () => void
}

export default function CodeEditor({
  defaultCode,
  expectedOutput,
  language,
  instructions,
  xpReward,
  onSuccess,
  hearts = 5,
  maxHearts = 5,
  nextRefill = null,
  onError,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [xpEarned, setXpEarned] = useState(false)

  const wrapCSS = (cssCode: string) => `<!DOCTYPE html>
<html>
  <head>
    <style>${cssCode}</style>
  </head>
  <body style="font-family: sans-serif; padding: 1.5rem; background: #0f0f0f; color: white;">
    <h1>Titre de test</h1>
    <p>Paragraphe de test</p>
    <div class="cards">
      <div class="card">🌐 HTML</div>
      <div class="card">🎨 CSS</div>
      <div class="card">⚡ JS</div>
    </div>
    <button class="btn">Bouton test</button>
  </body>
</html>`

  const handleSuccessState = () => {
    if (!xpEarned && onSuccess) {
      onSuccess()
      setXpEarned(true)
    }
  }

  // ✅ Appelé à chaque erreur → perd un cœur
  const handleErrorState = () => {
    if (onError) onError()
  }

  const runCode = () => {
    // ✅ Bloqué si 0 cœurs
    if (hearts <= 0) {
      setOutput("💔 Tu n'as plus de cœurs ! Attends la recharge pour continuer.")
      setStatus("error")
      return
    }

    setStatus("idle")
    setOutput("")

    // ── HTML ──────────────────────────────────────────────
    if (language === "html") {
      if (expectedOutput && !code.includes(expectedOutput)) {
        setOutput(`❌ Il manque quelque chose dans ton code.\nIndice : cherche "${expectedOutput}"`)
        setStatus("error")
        handleErrorState() // ✅ -1 cœur
        return
      }
      setOutput(code)
      setStatus("success")
      handleSuccessState()
      return
    }

    // ── CSS ───────────────────────────────────────────────
    if (language === "css") {
      if (expectedOutput && !code.includes(expectedOutput)) {
        setOutput(`❌ Il manque quelque chose dans ton code.\nIndice : cherche "${expectedOutput}"`)
        setStatus("error")
        handleErrorState() // ✅ -1 cœur
        return
      }
      setOutput(wrapCSS(code))
      setStatus("success")
      handleSuccessState()
      return
    }

    // ── JAVASCRIPT ────────────────────────────────────────
    if (language === "javascript") {
      try {
        const logs: string[] = []
        const fakeConsole = { log: (...args: unknown[]) => logs.push(args.join(" ")) }
        const fn = new Function("console", code)
        fn(fakeConsole)
        const result = logs.join("\n") || "✅ Code exécuté sans erreur"

        if (expectedOutput && !result.includes(expectedOutput)) {
          setOutput(`❌ Résultat incorrect\n\nObtenu :  ${result}\nAttendu : ${expectedOutput}`)
          setStatus("error")
          handleErrorState() // ✅ -1 cœur
          return
        }

        setOutput(result)
        setStatus("success")
        handleSuccessState()
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        setOutput(`❌ Erreur : ${message}`)
        setStatus("error")
        handleErrorState() // ✅ -1 cœur
      }
      return
    }

    // ── PYTHON ────────────────────────────────────────────
    setOutput("🐍 Python — bientôt disponible !")
    setStatus("success")
  }

  const resetCode = () => {
    setCode(defaultCode)
    setOutput("")
    setStatus("idle")
    setXpEarned(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 h-full">

      {/* PANNEAU GAUCHE — Éditeur */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-violet-600 text-white capitalize">{language}</Badge>
            {/* ✅ HEARTS BAR */}
            <HeartsBar hearts={hearts} maxHearts={maxHearts} nextRefill={nextRefill} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={resetCode}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
            <Button
              onClick={runCode}
              size="sm"
              disabled={hearts <= 0} // ✅ Bouton désactivé si 0 cœurs
              className="bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 mr-1" /> Exécuter
            </Button>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-700 flex-1 min-h-[300px]">
          <Editor
            height="300px"
            language={language}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              roundedSelection: true,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* PANNEAU DROIT — Instructions + Output */}
      <div className="flex flex-col gap-3">

        {/* Instructions */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            📋 Instructions
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-auto">
              +{xpReward} XP
            </Badge>
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{instructions}</p>
        </div>

        {/* Output */}
        <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800">
            <span className="text-sm text-slate-400 font-mono">Résultat</span>
            {status === "success" && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Succès !
              </Badge>
            )}
            {status === "error" && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Erreur
              </Badge>
            )}
          </div>

          <div className="p-4 h-[220px] overflow-auto">
            {(language === "html" || language === "css") && output && status === "success" ? (
              <iframe
                srcDoc={output}
                className="w-full h-full rounded bg-white"
                title="Preview"
                sandbox="allow-scripts"
              />
            ) : (
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                {output || "Clique sur ▶ Exécuter pour voir le résultat..."}
              </pre>
            )}
          </div>
        </div>

        {/* XP Gagné */}
        {xpEarned && (
          <div className="bg-gradient-to-r from-violet-900/60 to-pink-900/60 border border-violet-500/30 rounded-xl p-3 text-center animate-pulse">
            <p className="text-white font-bold">🎉 +{xpReward} XP gagnés !</p>
          </div>
        )}

        {/* ✅ Message 0 cœurs */}
        {hearts <= 0 && (
          <div className="bg-red-900/40 border border-red-500/30 rounded-xl p-3 text-center">
            <p className="text-red-400 font-bold">💔 Plus de cœurs !</p>
            <p className="text-slate-400 text-xs mt-1">
              {nextRefill
                ? `Prochain cœur dans ${Math.ceil((nextRefill.getTime() - Date.now()) / 60000)} min`
                : "Reviens plus tard..."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
