
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                     req.nextUrl.pathname.startsWith("/signup");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  
  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
