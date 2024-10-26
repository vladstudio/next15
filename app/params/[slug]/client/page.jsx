"use client";
import { use } from "react";

export default function Page({ params }) {
  const { slug } = use(params); // client-only hook
  return <>slug from client page: {JSON.stringify(slug, null, 2)}</>;
}
