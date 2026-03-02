"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, CheckCircle2, XCircle, Lightbulb } from "lucide-react"
import HeartsBar from "@/components/HeartsBar"

interface CodeEditorProps {
  defaultCode: string
  expectedOutput?: string
  hint?: string
  language: "html" | "css" | "javascript" | "python"
  instructions: string
  xpReward: number
  onSuccess?: () => void
  hearts?: number
  maxHearts?: number
  nextRefill?: Date | null
  onError?: () => void
}

export default function CodeEditor({
  defaultCode,
  expectedOutput,
  hint,
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
  const [showHint, setShowHint] = useState(false)
  const mapToMonacoLanguage = (lang: CodeEditorProps["language"]) => {
  if (lang === "javascript") return "javascript"
  if (lang === "html") return "html"
  if (lang === "css") return "css"
  // en attendant un vrai support Python:
  if (lang === "python") return "python"
  return "javascript"
}


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

  const handleErrorState = () => {
    if (onError) onError()
  }

  const runCode = () => {
    if (hearts <= 0) {
      setOutput("💔 Tu n'as plus de cœurs ! Attends la recharge pour continuer.")
      setStatus("error")
      return
    }

    setStatus("idle")
    setOutput("")

    if (language === "html") {
      if (expectedOutput && !code.includes(expectedOutput)) {
        setOutput(`❌ Pas tout à fait ! Relis bien l'instruction et réessaie.`)
        setStatus("error")
        handleErrorState()
        return
      }
      setOutput(code)
      setStatus("success")
      handleSuccessState()
      return
    }

    if (language === "css") {
      if (expectedOutput && !code.includes(expectedOutput)) {
        setOutput(`❌ Pas tout à fait ! Relis bien l'instruction et réessaie.`)
        setStatus("error")
        handleErrorState()
        return
      }
      setOutput(wrapCSS(code))
      setStatus("success")
      handleSuccessState()
      return
    }

    if (language === "javascript") {
      try {
        const logs: string[] = []
        const fakeConsole = { log: (...args: unknown[]) => logs.push(args.join(" ")) }
        const fn = new Function("console", code)
        fn(fakeConsole)
        const result = logs.join("\n") || "✅ Code exécuté sans erreur"

        if (expectedOutput && !result.includes(expectedOutput)) {
          setOutput(`❌ Pas tout à fait !\n\nObtenu : ${result}`)
          setStatus("error")
          handleErrorState()
          return
        }

        setOutput(result)
        setStatus("success")
        handleSuccessState()
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        setOutput(`❌ Erreur JS : ${message}`)
        setStatus("error")
        handleErrorState()
      }
      return
    }

    setOutput("🐍 Python — bientôt disponible !")
    setStatus("success")
  }

  const resetCode = () => {
    setCode(defaultCode)
    setOutput("")
    setStatus("idle")
    setXpEarned(false)
    setShowHint(false)
  }

  const langColors: Record<string, string> = {
    html: "bg-orange-600",
    css: "bg-blue-600",
    javascript: "bg-yellow-600",
    python: "bg-green-600",
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── INSTRUCTIONS (top, full width) */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <span className="font-bold text-white text-sm">Objectif</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
              +{xpReward} XP
            </Badge>
            <HeartsBar hearts={hearts} maxHearts={maxHearts} nextRefill={nextRefill} />
          </div>
        </div>

        <div className="px-4 py-3 space-y-2">
          <p className="text-slate-200 text-sm leading-relaxed">{instructions}</p>

          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors mt-1"
          >
            <Lightbulb className="w-3 h-3" />
            {showHint ? "Masquer l'indice" : "Voir un indice"}
          </button>

          {showHint && (
            <div className="bg-violet-900/30 border border-violet-500/30 rounded-xl px-3 py-2 text-xs text-violet-300">
              💡 {hint ?? "Relis bien l'instruction et vérifie ta syntaxe !"}
            </div>
          )}
        </div>
      </div>

      {/* ── ÉDITEUR + OUTPUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* PANNEAU GAUCHE — Éditeur */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge className={`${langColors[language]} text-white capitalize text-xs`}>
              {language}
            </Badge>
            <div className="flex gap-2">
              <Button
                onClick={resetCode}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 h-7 text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
              <Button
                onClick={runCode}
                size="sm"
                disabled={hearts <= 0}
                className="bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed h-7 text-xs"
              >
                <Play className="w-3 h-3 mr-1" /> Exécuter
              </Button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700">
              <Editor
                height="320px"
                language={mapToMonacoLanguage(language)}
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
                  wordWrap: "on",
                  cursorBlinking: "smooth",
                  smoothScrolling: true,
                  
                }}
              />

          </div>
        </div>

        {/* PANNEAU DROIT — Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between h-7">
            <span className="text-xs text-slate-400 font-mono">Résultat</span>
            {status === "success" && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1 text-xs">
                <CheckCircle2 className="w-3 h-3" /> Succès !
              </Badge>
            )}
            {status === "error" && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1 text-xs">
                <XCircle className="w-3 h-3" /> Erreur
              </Badge>
            )}
          </div>

          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-3 h-[280px] overflow-auto">
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
        </div>
      </div>

      {/* ── FEEDBACK bas de page */}
      {xpEarned && (
        <div className="bg-gradient-to-r from-violet-900/60 to-pink-900/60 border border-violet-500/30 rounded-xl p-3 text-center">
          <p className="text-white font-bold text-sm">🎉 +{xpReward} XP gagnés !</p>
        </div>
      )}

      {hearts <= 0 && (
        <div className="bg-red-900/40 border border-red-500/30 rounded-xl p-3 text-center">
          <p className="text-red-400 font-bold text-sm">💔 Plus de cœurs !</p>
          <p className="text-slate-400 text-xs mt-1">
            {nextRefill
              ? `Prochain cœur dans ${Math.ceil((nextRefill.getTime() - Date.now()) / 60000)} min`
              : "Reviens plus tard..."}
          </p>
        </div>
      )}
    </div>
  )
}
