"use server";
import { setTimeout } from "timers/promises";
import { revalidatePath } from "next/cache";
import axios from "redaxios";

const url = "https://jsonplaceholder.typicode.com/todos";

export const fetchSampleData = ({ simulateError, simulateDelay }) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(async (json) => {
      if (simulateDelay) await setTimeout(1000);
      if (simulateError) reject(new Error("Test"));
      // shuffle and slice
      let data = json.data.sort(() => 0.5 - Math.random()).slice(0, 3);
      resolve(data);
    });
  });
};

export const revalidateSampleData = () => {
  revalidatePath("/fetch-data");
};
