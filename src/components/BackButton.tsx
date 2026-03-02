"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton({ label = "Retour" }: { label?: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  )
}
