"use client";
import { useSearchParams } from "next/navigation";
export default async function Page({ searchParams }) {
  const searchParamsFromHook = Object.fromEntries(useSearchParams()?.entries());
  return (
    <>
      <h3>searchParams</h3>
      <p>from server: {JSON.stringify(await searchParams, null, 2)}</p>
      <p>from client: {JSON.stringify(searchParamsFromHook, null, 2)}</p>
    </>
  );
}
