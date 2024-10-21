// https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { protectedPaths } from "@/protectedPaths";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // start of custom logic

  const userData = (await supabase.auth.getUser())?.data?.user;
  const requestPath = request.nextUrl.pathname;
  const requestParams = request.nextUrl.search;
  // const response = NextResponse.next();
  let user = { isLoggedin: false };

  if (!!userData?.id) {
    user = {
      isLoggedin: true,
      id: userData.id,
      email: userData.email,
    };
  }

  // pass user data to response headers
  supabaseResponse.headers.set(
    "x-user",
    encodeURIComponent(JSON.stringify(user))
  );

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

  // end of custom logic

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
