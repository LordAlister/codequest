"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
  emoji: string
}

const faqItems: FaqItem[] = [
  {
    emoji: "🎮",
    question: "À partir de quel âge CodeQuest est recommandé ?",
    answer:
      "CodeQuest est pensé pour les débutants à partir de 10–11 ans, mais les adultes peuvent aussi l'utiliser pour apprendre les bases du code à leur rythme.",
  },
  {
    emoji: "🧠",
    question: "Est-ce que mon enfant doit déjà savoir coder ?",
    answer:
      "Non, zéro prérequis. Les parcours commencent par les bases absolues de HTML, CSS et JavaScript avec des explications simples et des exercices guidés.",
  },
  {
    emoji: "⭐",
    question: "Comment fonctionnent les XP et les niveaux ?",
    answer:
      "Chaque leçon réussie donne des points XP. En accumulant des XP, tu montes de niveau et tu débloques des badges exclusifs.",
  },
  {
    emoji: "💔",
    question: "Que se passe-t-il quand je n'ai plus de cœurs ?",
    answer:
      "Les cœurs représentent tes essais sur chaque leçon. Quand tu n'en as plus, tu attends la recharge automatique avant de pouvoir continuer — comme Duolingo !",
  },
  {
    emoji: "🔥",
    question: "Comment fonctionne la série (streak) ?",
    answer:
      "Ta série représente le nombre de jours consécutifs où tu as complété au moins une leçon. Essaie de ne pas casser ta série pour garder la motivation !",
  },
  {
    emoji: "🔒",
    question: "Est-ce que CodeQuest est sécurisé pour les enfants ?",
    answer:
      "Oui. Les données sont stockées de manière sécurisée via Supabase. Il n'y a ni chat public, ni contenu externe non contrôlé sur la plateforme.",
  },
  {
    emoji: "💰",
    question: "Est-ce que CodeQuest est gratuit ?",
    answer:
      "CodeQuest est actuellement en version bêta et entièrement gratuit. À terme, une version premium avec des fonctionnalités avancées sera proposée.",
  },
  {
    emoji: "🐛",
    question: "J'ai trouvé un bug, que faire ?",
    answer:
      "Écris-nous via la page Contact avec une description du problème. On fera de notre mieux pour corriger ça rapidement !",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-3xl mb-3 block">❓</span>
        <h2 className="text-3xl font-bold text-white mb-2">Questions fréquentes</h2>
        <p className="text-slate-400 text-sm">
          Tu ne trouves pas ta réponse ?{" "}
          <a href="/contact" className="text-violet-400 underline hover:text-violet-300 transition">
            Contacte-nous
          </a>
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={item.question}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "border-violet-500/50 bg-violet-900/10"
                  : "border-slate-700 bg-slate-900/60"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.emoji}</span>
                  <span className="text-sm font-semibold text-slate-100">{item.question}</span>
                </div>
                <span className="text-slate-400 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-slate-300 leading-relaxed pl-7">{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
