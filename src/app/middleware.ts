import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const token = req.headers.get("Authorization");

  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Continue to the requested page
}

// Optional: Restrict middleware to certain routes
export const config = {
  matcher: ["/roommates/:path*", "/dashboard/:path*"], // Apply middleware to these paths
};
