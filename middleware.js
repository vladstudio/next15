// https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app
import { updateSession } from "@/utils/supabase/middleware";

export default async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
