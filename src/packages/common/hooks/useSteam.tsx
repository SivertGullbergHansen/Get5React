"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect, useMemo } from "react";

function useSteam() {
  const session = useSession();
  const steam = useMemo(
    () => (session.data ? (session.data.user as any).steam : null),
    [session.data]
  );

  return {
    profile: steam,
    signIn: () => {
      signIn("steam");
    },
    signOut: () => {
      signOut({
        callbackUrl: "/",
      });
      localStorage.removeItem("usersExist");
    },
    isLoading: session.status === "loading",
    status: session.status,
  };
}

export { useSteam };
