"use client";

import { useSteam } from "@/common";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const { profile, status } = useSteam();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (status === "authenticated" && profile && !profile.isAdmin)
    )
      router.push("/");
  }, [profile, status, router]);

  return <div>{children}</div>;
}
