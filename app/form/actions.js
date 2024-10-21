"use server";

import { setTimeout } from "timers/promises";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function saySomethingAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  try {
    // do something with the formData here
    if (!!formData.simulateDelay) await setTimeout(1000);
    if (!!formData.simulateError) throw new Error("Test");

    // you may want to
    // revalidatePath('/...')
    // redirect(`/...`)

    return {
      message: `You said: ${formData.message}`,
    };
  } catch (e) {
    return { error: e.message };
  }
}
