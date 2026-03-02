import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Option A: stocker dans Supabase (recommandé pour toi)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
    }

    // Stocker le message dans Supabase dans une table "contact_messages"
    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        subject: subject || "Autre",
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
