"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function useRedirectIfAuthed(to = "/dashboard") {
  const router = useRouter()

  useEffect(() => {
    let alive = true

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      if (data.session) router.replace(to)
    })

    return () => {
      alive = false
    }
  }, [router, to])
}
