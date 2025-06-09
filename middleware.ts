import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId, redirectToSignIn } = await auth();

  const url = new URL(req.url);
  const pathname = url.pathname;

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: url });
  }

  const metadata = (sessionClaims as any)?.metadata;

  if (userId && !metadata?.isProfileCompleted && pathname === "/") {
    return NextResponse.redirect(new URL("/profile", req.url));
  } else if (userId && !metadata?.isBankCardCompleted && pathname === "/") {
    return NextResponse.redirect(new URL("/bankcard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:js|ts|css|jpg|jpeg|png|svg|woff2?|ttf|ico|json|csv|txt|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
