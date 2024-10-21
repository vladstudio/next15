"use server";
import { cookies } from "next/headers";
import { setTimeout } from "timers/promises";
import { revalidatePath } from "next/cache";

export async function fetchTodos() {
  const cookieStore = await cookies();
  return JSON.parse(cookieStore.get("todos")?.value) || [
    { text: "do this" },
    { text: "do that" },
  ];
}

export async function addTodoAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  try {
    await setTimeout(1000);
    if (!!formData.simulateError) throw new Error("Test");
    return {
      text: formData.text,
    };
  } catch (e) {
    revalidatePath("/form-optimistic");
    return { error: e.message };
  }
}
