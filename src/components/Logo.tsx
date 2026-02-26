import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  href?: string
}

export default function Logo({ size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: { emoji: "text-xl", text: "text-lg" },
    md: { emoji: "text-2xl", text: "text-xl" },
    lg: { emoji: "text-4xl", text: "text-3xl" },
  }

  const content = (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className={`${sizes[size].emoji} relative`}>
        <span>🗺️</span>
        <span className="absolute -top-1 -right-1 text-xs bg-violet-600 rounded-full w-4 h-4 flex items-center justify-center text-white font-bold">
          ✦
        </span>
      </div>
      <span className={`${sizes[size].text} font-extrabold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent`}>
        CodeQuest
      </span>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
