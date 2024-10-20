"use client";

import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "./actions";

export default function Page() {
  const [result, _action, isPending] = useActionState(signUpAction, null);
  return (
    <Form action={_action} className="grid gap-4">
      <h2>Sign up</h2>
      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Create password <input type="password" name="password" required />
      </label>

      <button type="submit" disabled={isPending}>
        {isPending ? "○  ..." : "Sign up"}
      </button>
      {!!result && <p>{JSON.stringify(result, null, 2)}</p>}
    </Form>
  );
}
