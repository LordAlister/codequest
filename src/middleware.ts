import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ✅ Middleware actif — décommente quand tu veux protéger des routes
export function middleware(request: NextRequest) {
  return NextResponse.next()

  // 🔒 Protection des routes privées (décommente pour activer)
  // const { pathname } = request.nextUrl
  // const isPrivate = pathname.startsWith("/dashboard") ||
  //                   pathname.startsWith("/learn") ||
  //                   pathname.startsWith("/profile")
  // const token = [...request.cookies.getAll()]
  //   .find((c) => c.name.includes("auth-token"))?.value
  // if (isPrivate && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }
  // return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/learn/:path*", "/profile/:path*"],
}
