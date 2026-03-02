import ContactForm from "@/components/ContactForm"
import BackButton from "@/components/BackButton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — CodeQuest",
  description: "Contacte l'équipe CodeQuest pour toute question ou suggestion.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-xl mx-auto px-4 pt-8">
        <BackButton label=" Retour" />
      </div>
      <ContactForm />
    </main>
  )
}
