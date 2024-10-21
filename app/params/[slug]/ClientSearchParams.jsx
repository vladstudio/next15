"use client";
import { useSearchParams } from "next/navigation";

export function ClientSearchParams() {
  const searchParams = useSearchParams(); // client-only hook
  return <>{JSON.stringify(Object.fromEntries(searchParams), null, 2)}</>;
}
