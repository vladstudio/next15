"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Client() {
  const router = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log('RevalidateOnFocus')
        router.refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  return null;
}

export default function RevalidateOnFocus() {
  return <Client />;
}
