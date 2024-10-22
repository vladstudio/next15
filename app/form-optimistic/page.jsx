"use server";
import { fetchTodosAction } from "./actions";
import { Client } from "./Client";

export default async function Page() {
  return <Client fetchedTodos={await fetchTodosAction()} />;
}
