import { SteamProfile } from "next-auth-steam";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function useSteam() {
  const session = useSession();
  const [steam, setSteam] = useState<
    (SteamProfile & { isAdmin: boolean }) | null
  >(null);

  useEffect(() => {
    if (steam === null && session.data) {
      const data = (session.data.user as any).steam;
      setSteam(data);
    }
  }, [session.data, steam]);

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
