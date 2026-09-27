import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (!token || (token as any).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // A token must exist for the middleware above to run
      authorized: ({ token }) => Boolean(token),
    },
    pages: { signIn: "/login" },
  }
);

// Any route under /admin is protected by this rule
export const config = {
  matcher: ["/admin/:path*"],
};
