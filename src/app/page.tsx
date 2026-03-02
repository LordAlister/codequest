"use client"

import Link from "next/link"
import { motion ,Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Code2, ArrowRight, Users, BookOpen, Award } from "lucide-react"
import AnimatedCard from "@/components/AnimatedCard"
import Logo from "@/components/Logo"
import { useRedirectIfAuthed } from "@/hooks/useRedirectIfAuthed"
import StatsBar from "@/components/StatsBar"

const stats = [
  { label: "Apprenants actifs", value: "12 400+", icon: Users },
  { label: "Leçons disponibles", value: "200+", icon: BookOpen },
  { label: "Badges à gagner", value: "50+", icon: Award },
  { label: "Langages enseignés", value: "4", icon: Code2 },
]

const features = [
  { icon: "🎮", title: "Apprentissage Gamifié", desc: "Gagne des XP, monte de niveau et débloque des badges en apprenant à coder." },
  { icon: "👨‍👩‍👧", title: "Mode Famille", desc: "Crée des profils pour toute la famille et progressez ensemble." },
  { icon: "💻", title: "Éditeur Intégré", desc: "Code directement dans le navigateur, vois le résultat en temps réel." },
  { icon: "🏆", title: "Défis Quotidiens", desc: "Un nouveau défi chaque jour pour maintenir ta série et progresser vite." },
  { icon: "🤖", title: "Aide IA", desc: "Un assistant IA t'aide quand tu es bloqué, sans te donner la réponse." },
  { icon: "📊", title: "Progression Visuelle", desc: "Suis ta progression en HTML, CSS, JavaScript et Python." },
]

const languages = [
  { name: "HTML", color: "bg-orange-500", emoji: "🌐", level: "Débutant" },
  { name: "CSS", color: "bg-blue-500", emoji: "🎨", level: "Débutant" },
  { name: "JavaScript", color: "bg-yellow-500", emoji: "⚡", level: "Intermédiaire" },
  { name: "Python", color: "bg-green-500", emoji: "🐍", level: "Intermédiaire" },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}


export default function Home() {
  useRedirectIfAuthed("/dashboard")
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 text-white overflow-hidden">

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 py-4 max-w-6xl mx-auto"
      >
        
        <Logo size="md" href="/" />
        <div className="flex items-center gap-2">
          
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white hover:text-violet-300 text-sm px-3">
              Connexion
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-3">
              Commencer
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="text-center px-4 py-12 md:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-violet-800 text-violet-200 border-violet-600">
            🚀 Nouveau en 2026
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Apprends à coder{" "}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            en t'amusant
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto px-2"
        >
          HTML, CSS, JavaScript et Python — pour toute la famille. Gagne des XP,
          débloque des badges et deviens un vrai développeur, une leçon à la fois.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center px-4"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-8 py-6 text-lg">
              Jouer gratuitement <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/demo" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 hover:text-white bg-transparent px-8 py-6 text-lg">
              Voir une démo
            </Button>
          </Link>
        </motion.div>

        {/* XP BAR DÉCO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 bg-slate-800/60 rounded-2xl p-5 max-w-sm mx-auto border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-base shrink-0">⚔️</div>
            <div className="text-left min-w-0">
              <p className="font-bold text-sm truncate">Massi — Niveau 7</p>
              <p className="text-xs text-slate-400">1 240 / 2 000 XP</p>
            </div>
            <Badge className="ml-auto shrink-0 bg-yellow-500 text-black text-xs">🔥 14j</Badge>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
        <StatsBar />

      {/* LANGAGES */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          4 langages, 1 aventure 🚀
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, rotate: 1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 text-center cursor-pointer">
                <CardContent className="pt-6 pb-4">
                  <div className="text-3xl md:text-4xl mb-3">{lang.emoji}</div>
                  <div className={`w-3 h-3 rounded-full ${lang.color} mx-auto mb-2`} />
                  <p className="font-bold text-white text-base md:text-lg">{lang.name}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">{lang.level}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          Pourquoi CodeQuest ? 🏆
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedCard key={f.title} delay={i * 0.1}>
              <Card className="bg-slate-800/50 border-slate-700 hover:border-violet-500 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 py-16 md:py-20"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Prêt à commencer l aventure ? 🗺️
        </h2>
        <p className="text-slate-300 mb-8 text-base md:text-lg">
          Rejoins des milliers d'apprenants. C'est gratuit, c'est fun, c'est CodeQuest.
        </p>
        <Link href="/signup">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-10 py-6 text-lg">
              <Trophy className="mr-2" /> Commencer mon aventure
            </Button>
          </motion.div>
        </Link>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800">
        © 2026 CodeQuest — Fait avec ❤️ à Montréal
      </footer>

    </main>
  )
}
