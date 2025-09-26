import timer from "@/services/getTimer";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only check for /kitchen route
  if (request.nextUrl.pathname === "/kitchen") {
    try {
      // Check if timer route is accessible
      await timer();
    } catch {
      // Network error or other issues, redirect to dashboard
      const response = NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

      // Set a cookie to show toast message on dashboard
      response.cookies.set("timer-error", "Round not started yet!", {
        maxAge: 5, // 5 seconds
        path: "/",
      });

      return response;
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: "/kitchen",
};
