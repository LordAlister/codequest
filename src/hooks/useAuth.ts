"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("Aventurier")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("⚔️")

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      setUsername(session.user.user_metadata?.username || session.user.email?.split("@")[0] || "Aventurier")
      setEmail(session.user.email || "")
      setAvatar(session.user.user_metadata?.avatar || "⚔️")
      setLoading(false)
    }

    checkSession()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  return { loading, username, email, avatar, logout }
}
