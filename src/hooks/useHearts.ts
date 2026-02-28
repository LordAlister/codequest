"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

const MAX_HEARTS = 5
const REFILL_INTERVAL_MS = 4 * 60 * 60 * 1000 // 4h

export function useHearts(userId: string | null) {
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [nextRefill, setNextRefill] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchHearts = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const { data } = await supabase
      .from("profiles")
      .select("hearts, max_hearts, next_refill")
      .eq("id", userId)
      .single()

    if (data) {
      const now = new Date()
      const max = data.max_hearts ?? MAX_HEARTS
      let currentHearts = data.hearts ?? max

      // Recharge auto si next_refill est passé
      if (data.next_refill) {
        const next = new Date(data.next_refill)
        if (now >= next && currentHearts < max) {
          currentHearts = max
          await supabase
            .from("profiles")
            .update({
              hearts: currentHearts,
              next_refill: null,
            })
            .eq("id", userId)
        }
        setNextRefill(currentHearts < max ? next : null)
      } else {
        setNextRefill(null)
      }

      setHearts(currentHearts)
    }

    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchHearts()
  }, [fetchHearts])

  const loseHeart = useCallback(async () => {
    if (!userId || hearts <= 0) return

    const newHearts = hearts - 1
    const now = new Date()

    await supabase
      .from("profiles")
      .update({
        hearts: newHearts,
        next_refill:
          newHearts < MAX_HEARTS
            ? new Date(now.getTime() + REFILL_INTERVAL_MS).toISOString()
            : null,
      })
      .eq("id", userId)

    setHearts(newHearts)
    if (newHearts < MAX_HEARTS) {
      setNextRefill(new Date(now.getTime() + REFILL_INTERVAL_MS))
    }
  }, [userId, hearts])

  return {
    hearts,
    maxHearts: MAX_HEARTS,
    nextRefill,
    loading,
    loseHeart,
    refetch: fetchHearts,
  }
}
