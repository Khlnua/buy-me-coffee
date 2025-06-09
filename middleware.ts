// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(["/profile", "/bankcard",]);

// const isPublicRoute = createRouteMatcher([
//   "/sign-in",
//   "/sign-up",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims, userId, } = await auth();

//   const url = new URL(req.url);
//   const pathname = url.pathname;
//   const metadata = (sessionClaims as any)?.metadata;

//   if (userId && !metadata?.isProfileCompleted && pathname === "/") {
//     return NextResponse.redirect(new URL("/profile", req.url));
//   } else if (userId && !metadata?.isBankCardCompleted && pathname === "/") {
//     return NextResponse.redirect(new URL("/bankcard", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\.(?:js|ts|css|jpg|jpeg|png|svg|woff2?|ttf|ico|json|csv|txt|docx?|xlsx?|zip|webmanifest)).*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth();

  const url = new URL(req.url);
  const pathname = url.pathname;

  const isPublicRoute = createRouteMatcher([
      "/sign-in",
      "/sign-up",
    ]);

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  

  const metadata = (sessionClaims as any)?.metadata;
  const isProfileCompleted = metadata?.isProfileCompleted;
  const isBankCardCompleted = metadata?.isBankCardCompleted;

  if (pathname === "/") {
    if (!isProfileCompleted) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (!isBankCardCompleted) {
      return NextResponse.redirect(new URL("/bankcard", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:js|ts|css|jpg|jpeg|png|svg|woff2?|ttf|ico|json|csv|txt|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
