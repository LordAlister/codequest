import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "CodeQuest — Apprends à coder en t'amusant",
    template: "%s | CodeQuest",
  },
  description: "Plateforme gamifiée pour apprendre HTML, CSS, JavaScript et Python. Gagne des XP, débloque des badges et progresse niveau par niveau.",
  keywords: ["apprendre coder", "HTML", "CSS", "JavaScript", "Python", "gamification", "plateforme éducative"],
  authors: [{ name: "CodeQuest" }],
  openGraph: {
    title: "CodeQuest — Apprends à coder en t'amusant",
    description: "Gagne des XP, débloque des badges, progresse niveau par niveau.",
    url: "https://codequest-tan.vercel.app",
    siteName: "CodeQuest",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuest — Apprends à coder en t'amusant",
    description: "Gagne des XP, débloque des badges, progresse niveau par niveau.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg", // ou "/favicon.ico" selon le fichier que tu utilises
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
