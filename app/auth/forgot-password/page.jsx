"use client";

import Form from "next/form";
import { useActionState } from "react";
import { forgotPasswordAction } from "./actions";

export default function Page() {
  const [result, _action, isPending] = useActionState(forgotPasswordAction, null);
  return (
    <Form action={_action} className="grid gap-4">
      <h3>Reset Password</h3>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <button type="submit" disabled={isPending}>
        {isPending ? "○  ..." : "Reset password"}
      </button>
            {!!result && <p>{JSON.stringify(result, null, 2)}</p>}
    </Form>
  );
}
