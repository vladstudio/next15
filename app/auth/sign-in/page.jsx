"use client";

import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import { signInAction } from "./actions";

export default function Page() {
  const [result, _action, isPending] = useActionState(signInAction, null);
  return (
    <Form action={_action} className="grid gap-4">
      <h2>Sign in</h2>
      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Password <input type="password" name="password" required />
      </label>

      <button type="submit" disabled={isPending}>
        {isPending ? "○  ..." : "Sign in"}
      </button>
      <hr />
      <Link href="/auth/forgot-password">Forgot Password?</Link>
      {!!result && <p>{JSON.stringify(result, null, 2)}</p>}
    </Form>
  );
}
