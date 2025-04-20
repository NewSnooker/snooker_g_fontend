// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("auth")?.value;

  const publicPaths = ["/", "/sign-in", "/sign-up"];
  const isPublic = publicPaths.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (!authToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
