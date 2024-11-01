"use server";
import { setTimeout } from "timers/promises";
import { revalidatePath } from "next/cache";
import axios from "redaxios";

const url = "https://jsonplaceholder.typicode.com/todos";

export async function fetchSampleData({ simulateError, simulateDelay }) {
  const json = await axios.get(url);
  if (simulateDelay) await setTimeout(1000);
  if (simulateError) reject(new Error("Test"));
  // shuffle and slice
  let data = json.data.sort(() => 0.5 - Math.random()).slice(0, 3);
  return data;
}

export async function revalidateSampleData() {
  revalidatePath("/fetch-data");
}
