import { getUser } from "@/utils/getUser";
import { signOutAction } from "@/app/auth/sign-in/actions";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Testing Next 15",
};

export default async function Layout({ children }) {
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-xl m-8 grid gap-4">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <div className="flex-1"></div>
            {!!user?.isLoggedin ? (
              <>
                <p>Hey, {user.email}!</p>
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
