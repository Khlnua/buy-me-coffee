import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  // if (!isPublicRoute(req)) {
  //   await auth.protect();
  // }
  const { sessionClaims } = await auth();

  if (isProtectedRoute(req)) {
    const isProfileCompleted = (
      sessionClaims as { metadata?: { isProfileCompleted?: boolean } }
    )?.metadata?.isProfileCompleted;

    if (!isProfileCompleted) {
      const url = new URL("/profile", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
