import FaqSection from "@/components/FaqSection"
import BackButton from "@/components/BackButton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ — CodeQuest",
  description: "Toutes les réponses aux questions fréquentes sur CodeQuest.",
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <BackButton label="Retour" />
      </div>
      <FaqSection />
    </main>
  )
}
