import { headers } from "next/headers";
export async function getUser() {
  const h = (await headers())?.get("x-user");
  const user = JSON.parse(decodeURIComponent(h) || null);
  return user;
}
