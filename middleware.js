import { NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { protectedPaths } from "@/protectedPaths";

export default async function middleware(request) {
  const requestPath = request.nextUrl.pathname;
  const requestParams = request.nextUrl.search;
  const response = NextResponse.next();

  const userData = (await updateSession(request))?.data?.user;
  let user = { isLoggedin: false };
  
  if (!!userData?.id) {
    user = {
      isLoggedin: true,
      id: userData.id,
      email: userData.email,
    };
  }
  response.headers.set("x-user", encodeURIComponent(JSON.stringify(user)));

  if (!user.isLoggedin) {
    // Check for protected paths
    for (const protectedPath of protectedPaths) {
      if (requestPath.startsWith(protectedPath)) {
        return NextResponse.redirect(
          new URL(
            `/auth/sign-in/?redirect=${encodeURIComponent(
              requestPath + requestParams
            )}`,
            request.url
          )
        );
      }
    }
  }
  return response;
}
