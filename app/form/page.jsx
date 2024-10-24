"use client";

import Form from "next/form";
import { useActionState } from "react";
import { saySomething } from "./server";
import {} from "react";

export default function Page() {
  const [result, _action, isPending] = useActionState(saySomething, null);
  return (
    <>
      <Form action={_action} className="grid gap-4">
        <p>Say something:</p>
        <input name="message" />
        <p>
          <input type="checkbox" name="simulateError" value="1" /> Simulate
          error
        </p>
        <p>
          <input type="checkbox" name="simulateDelay" value="1" /> Simulate slow
          network
        </p>
        <button type="submit" disabled={isPending}>
          {isPending ? "○  ..." : "Submit"}
        </button>
      </Form>
      <hr />
      <p>result: {JSON.stringify(result, null, 2)}</p>
    </>
  );
}
