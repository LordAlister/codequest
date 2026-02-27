export type Badge = {
  id: string
  emoji: string
  name: string
  description: string
  xpRequired?: number
  lessonsRequired?: number
  language?: string
  streakRequired?: number
}

export const ALL_BADGES: Badge[] = [
  {
    id: "first_html",
    emoji: "🌐",
    name: "Premier HTML",
    description: "Complète ta première leçon HTML",
    language: "html",
    lessonsRequired: 1,
  },
  {
    id: "html_master",
    emoji: "🏗️",
    name: "Maître HTML",
    description: "Complète toutes les leçons HTML",
    language: "html",
    lessonsRequired: 3,
  },
  {
    id: "first_css",
    emoji: "🎨",
    name: "Styliste CSS",
    description: "Complète ta première leçon CSS",
    language: "css",
    lessonsRequired: 1,
  },
  {
    id: "first_js",
    emoji: "⚡",
    name: "JS Débutant",
    description: "Complète ta première leçon JavaScript",
    language: "javascript",
    lessonsRequired: 1,
  },
  {
    id: "first_python",
    emoji: "🐍",
    name: "Pythoniste",
    description: "Complète ta première leçon Python",
    language: "python",
    lessonsRequired: 1,
  },
  {
    id: "streak_7",
    emoji: "🔥",
    name: "7 jours de suite",
    description: "Connecte-toi 7 jours d'affilée",
    streakRequired: 7,
  },
  {
    id: "streak_30",
    emoji: "💥",
    name: "30 jours de suite",
    description: "Connecte-toi 30 jours d'affilée",
    streakRequired: 30,
  },
  {
    id: "xp_500",
    emoji: "⭐",
    name: "500 XP",
    description: "Atteins 500 XP total",
    xpRequired: 500,
  },
  {
    id: "xp_1000",
    emoji: "🌟",
    name: "1000 XP",
    description: "Atteins 1000 XP total",
    xpRequired: 1000,
  },
  {
    id: "xp_5000",
    emoji: "💎",
    name: "5000 XP",
    description: "Atteins 5000 XP total",
    xpRequired: 5000,
  },
  {
    id: "level_5",
    emoji: "🚀",
    name: "Niveau 5",
    description: "Atteins le niveau 5",
    xpRequired: 2000, // ✅ Fix Bug 1 — niveau 5 = 4 × 500 XP
  },
  {
    id: "top_player",
    emoji: "🏆",
    name: "Top 10%",
    description: "Atteins 3000 XP total",
    xpRequired: 3000, // ✅ Fix Bug 2 — condition concrète ajoutée
  },
]

export function getEarnedBadges(stats: {
  xp: number
  streak: number
  htmlLessons: number
  cssLessons: number
  jsLessons: number
  pythonLessons: number
}): string[] {
  const earned: string[] = []

  for (const badge of ALL_BADGES) {
    if (badge.xpRequired && stats.xp >= badge.xpRequired) earned.push(badge.id)
    if (badge.streakRequired && stats.streak >= badge.streakRequired) earned.push(badge.id)
    if (badge.language === "html" && badge.lessonsRequired && stats.htmlLessons >= badge.lessonsRequired) earned.push(badge.id)
    if (badge.language === "css" && badge.lessonsRequired && stats.cssLessons >= badge.lessonsRequired) earned.push(badge.id)
    if (badge.language === "javascript" && badge.lessonsRequired && stats.jsLessons >= badge.lessonsRequired) earned.push(badge.id)
    if (badge.language === "python" && badge.lessonsRequired && stats.pythonLessons >= badge.lessonsRequired) earned.push(badge.id)
  }

  return [...new Set(earned)]
}
