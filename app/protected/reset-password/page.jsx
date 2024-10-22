"use client";

import Form from "next/form";
import { useActionState } from "react";
import { resetPassword } from "./server";

export default function Page() {
  const [result, _action, isPending] = useActionState(resetPassword, null);
  return (
    <Form action={_action} className="grid gap-4">
      <h1>Reset password</h1>
      <label>New password</label>
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <label>Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "○  ..." : "Reset password"}
      </button>
      {!!result && <p>{JSON.stringify(result, null, 2)}</p>}
    </Form>
  );
}
