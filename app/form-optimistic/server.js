"use server";
import { cookies } from "next/headers";
import { setTimeout } from "timers/promises";
import { revalidatePath } from "next/cache";

export async function fetchTodos() {
  await setTimeout(1000);
  const cookieStore = await cookies();
  return JSON.parse(cookieStore.get("todos")?.value || null) || [];
}

export async function addTodoAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const cookieStore = await cookies();
  try {
    if (!!formData.simulateError) {
      revalidatePath("/form-optimistic");
      throw new Error(`Something went wrong.`);
    }
    const newTodo = { text: formData.text };
    const newTodos = [...(await fetchTodos()), newTodo];
    revalidatePath("/form-optimistic");
    cookieStore.set("todos", JSON.stringify(newTodos));
    return newTodo;
  } catch (e) {
    return { error: e.message };
  }
}
