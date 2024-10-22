"use server";
import { cookies } from "next/headers";
import { setTimeout } from "timers/promises";
import { revalidatePath } from "next/cache";

async function getTodosFromCookies() {
  const cookieStore = await cookies();
  return JSON.parse(cookieStore.get("todos")?.value || null) || [];
}

export async function fetchTodosAction() {
  console.log("fetchTodosAction");
  await setTimeout(1000);
  const todos = await getTodosFromCookies();
  console.log("todos", todos);
  return todos;
}

export async function addTodoAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const cookieStore = await cookies();
  try {
    await setTimeout(1000);
    if (!!formData.simulateError) throw new Error("Test");
    const newTodo = { text: formData.text };
    const newTodos = [...(await getTodosFromCookies()), newTodo];
    cookieStore.set("todos", JSON.stringify(newTodos));
    revalidatePath("/form-optimistic");
    return newTodo;
  } catch (e) {
    return { error: e.message };
  }
}
