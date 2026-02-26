import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Trophy,
  Zap,
  Code2,
  Star,
  ArrowRight,
  Users,
  BookOpen,
  Award,
} from "lucide-react"

const stats = [
  { label: "Apprenants actifs", value: "12 400+", icon: Users },
  { label: "Leçons disponibles", value: "200+", icon: BookOpen },
  { label: "Badges à gagner", value: "50+", icon: Award },
  { label: "Langages enseignés", value: "4", icon: Code2 },
]

const features = [
  {
    icon: "🎮",
    title: "Apprentissage Gamifié",
    desc: "Gagne des XP, monte de niveau et débloque des badges en apprenant à coder.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Mode Famille",
    desc: "Crée des profils pour toute la famille et progressez ensemble.",
  },
  {
    icon: "💻",
    title: "Éditeur Intégré",
    desc: "Code directement dans le navigateur, vois le résultat en temps réel.",
  },
  {
    icon: "🏆",
    title: "Défis Quotidiens",
    desc: "Un nouveau défi chaque jour pour maintenir ta série et progresser vite.",
  },
  {
    icon: "🤖",
    title: "Aide IA",
    desc: "Un assistant IA t'aide quand tu es bloqué, sans te donner la réponse directement.",
  },
  {
    icon: "📊",
    title: "Progression Visuelle",
    desc: "Suis ta progression en HTML, CSS, JavaScript et Python sur un tableau de bord.",
  },
]

const languages = [
  { name: "HTML", color: "bg-orange-500", level: "Débutant", emoji: "🌐" },
  { name: "CSS", color: "bg-blue-500", level: "Débutant", emoji: "🎨" },
  { name: "JavaScript", color: "bg-yellow-500", level: "Intermédiaire", emoji: "⚡" },
  { name: "Python", color: "bg-green-500", level: "Intermédiaire", emoji: "🐍" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-violet-300">
              Connexion
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-violet-600 hover:bg-violet-500 text-white">
              Commencer gratuitement
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <Badge className="mb-4 bg-violet-800 text-violet-200 border-violet-600">
          🚀 Nouveau en 2026
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Apprends à coder{" "}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            en t amusant
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          HTML, CSS, JavaScript et Python — pour toute la famille. Gagne des XP,
          débloque des badges et deviens un vrai développeur, une leçon à la fois.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-6 text-lg">
              Jouer gratuitement <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
              Voir une démo
            </Button>
          </Link>
        </div>

        {/* XP BAR DÉCO */}
        <div className="mt-12 bg-slate-800/60 rounded-2xl p-6 max-w-md mx-auto border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-lg">⚔️</div>
            <div className="text-left">
              <p className="font-bold text-sm">Massi — Niveau 7</p>
              <p className="text-xs text-slate-400">1 240 / 2 000 XP</p>
            </div>
            <Badge className="ml-auto bg-yellow-500 text-black">🔥 14 jours</Badge>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full" style={{ width: "62%" }} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <s.icon className="mx-auto mb-2 text-violet-400" size={28} />
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* LANGAGES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          4 langages, 1 aventure 🚀
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <Card key={lang.name} className="bg-slate-800/50 border-slate-700 text-center hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6 pb-4">
                <div className="text-4xl mb-3">{lang.emoji}</div>
                <div className={`w-3 h-3 rounded-full ${lang.color} mx-auto mb-2`} />
                <p className="font-bold text-white text-lg">{lang.name}</p>
                <Badge variant="secondary" className="mt-2 text-xs">{lang.level}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pourquoi CodeQuest ? 🏆
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="bg-slate-800/50 border-slate-700 hover:border-violet-500 transition-colors">
              <CardContent className="pt-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center px-6 py-20">
        <h2 className="text-4xl font-extrabold mb-4">
          Prêt à commencer l aventure ? 🗺️
        </h2>
        <p className="text-slate-300 mb-8 text-lg">
          Rejoins des milliers d apprenants. C est gratuit, c est fun, c est CodeQuest.
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-10 py-6 text-lg">
            <Trophy className="mr-2" /> Commencer mon aventure
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800">
        © 2026 CodeQuest — Fait avec ❤️ à Montréal
      </footer>

    </main>
  )
}
