"use server";
import { fetchTodos } from "./server";
import { Client } from "./Client";

export default async function Page() {
  return <Client fetchedTodos={await fetchTodos()} />;
}
