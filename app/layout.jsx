import { signOutAction } from "@/app/auth/sign-in/actions";
import "./globals.css";
import Link from "next/link";
import { getUser } from "@/utils/getUser";

export const metadata = {
  title: "Testing Next 15",
};

export default async function Page({ children }) {
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-xl m-8 grid gap-4">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            {!!user?.isLoggedin ? (
              <>
                <p>Hey, {user.email}!</p>
                <div className="flex-1"></div>
                <form action={signOutAction}>
                  <button type="submit">Sign out</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">Sign in</Link>
                <Link href="/auth/sign-up">Sign up</Link>
              </>
            )}
          </div>
          <hr />
          {children}
          <hr />
          <pre className="text-xs break-all opacity-50">
            user: {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </body>
    </html>
  );
}
