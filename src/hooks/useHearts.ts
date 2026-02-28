"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

const MAX_HEARTS = 5
const REFILL_INTERVAL_MS = 4 * 60 * 60 * 1000 // 4h en ms

export function useHearts(userId: string | null) {
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [nextRefill, setNextRefill] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchHearts = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const { data } = await supabase
      .from("profiles")
      .select("hearts, last_heart_refill")
      .eq("id", userId)
      .single()

    if (data) {
      const lastRefill = new Date(data.last_heart_refill ?? 0)
      const now = new Date()
      const elapsed = now.getTime() - lastRefill.getTime()
      const heartsToAdd = Math.floor(elapsed / REFILL_INTERVAL_MS)

      // Recharge automatique si des cœurs ont été regagnés
      if (heartsToAdd > 0 && data.hearts < MAX_HEARTS) {
        const newHearts = Math.min(data.hearts + heartsToAdd, MAX_HEARTS)
        await supabase.from("profiles").update({
          hearts: newHearts,
          last_heart_refill: now.toISOString(),
        }).eq("id", userId)
        setHearts(newHearts)
      } else {
        setHearts(data.hearts ?? MAX_HEARTS)
      }

      // Calcule le prochain refill
      if (data.hearts < MAX_HEARTS) {
        const next = new Date(lastRefill.getTime() + REFILL_INTERVAL_MS)
        setNextRefill(next)
      } else {
        setNextRefill(null)
      }
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchHearts()
  }, [fetchHearts])

  // ── Perd un cœur
  const loseHeart = useCallback(async () => {
    if (!userId || hearts <= 0) return

    const newHearts = hearts - 1
    const now = new Date().toISOString()

    await supabase.from("profiles").update({
      hearts: newHearts,
      last_heart_refill: now,
    }).eq("id", userId)

    setHearts(newHearts)
    if (newHearts < MAX_HEARTS) {
      setNextRefill(new Date(Date.now() + REFILL_INTERVAL_MS))
    }
  }, [userId, hearts])

  return { hearts, maxHearts: MAX_HEARTS, nextRefill, loading, loseHeart, refetch: fetchHearts }
}
