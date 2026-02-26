import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeQuest — Apprends à coder en t'amusant",
  description: "Plateforme gamifiée pour apprendre HTML, CSS, JavaScript et Python. Gagne des XP, débloque des badges, progresse avec ta famille.",
  keywords: ["coding", "apprentissage", "gamifié", "HTML", "CSS", "JavaScript", "Python", "famille"],
  authors: [{ name: "CodeQuest", url: "https://codequest.vercel.app" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CodeQuest — Apprends à coder en t'amusant",
    description: "Plateforme gamifiée pour apprendre HTML, CSS, JavaScript et Python.",
    type: "website",
    locale: "fr_CA",
    siteName: "CodeQuest",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuest — Apprends à coder en t'amusant",
    description: "Plateforme gamifiée pour apprendre HTML, CSS, JavaScript et Python.",
  },
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
