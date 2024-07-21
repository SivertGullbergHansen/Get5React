"use client";
import { Wizard } from "@/components/wizard/wizard";
import { useSteam } from "@/hooks/useSteam";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Flex } from "@radix-ui/themes";

// Checks if any users exist. If no, show wizard
export default function Template({ children }: { children: React.ReactNode }) {
  const [doesUsersExist, setDoesUsersExist] = useState<boolean>(true);
  const { profile } = useSteam();

  useEffect(() => {
    if (!localStorage.getItem("usersExist"))
      // Check if users exist
      axios.get("/api/users").then((res) => {
        if (res.data.usersCount === 0) {
          localStorage.setItem("usersExist", "false");
          setDoesUsersExist(false);
        } else {
          localStorage.setItem("usersExist", "true");
          setDoesUsersExist(true);
        }
      });

    if (localStorage.getItem("usersExist") === "false" && profile) {
      localStorage.setItem("usersExist", "true");
      setDoesUsersExist(true);
    }
  }, [profile]);

  return (
    <Flex align="center" justify="center" width="100dvw" height="100dvh">
      {doesUsersExist === true && (
        <Flex
          gap="24px"
          width="100%"
          style={{
            padding: "24px",
            maxHeight: "900px",
            height: "100%",
            minHeight: "auto",
            maxWidth: "1400px",
            width: "100%",
          }}
        >
          <div style={{ flexGrow: 1 }}>{children}</div>
          <Navbar />
        </Flex>
      )}
      {doesUsersExist === false && <Wizard />}
    </Flex>
  );
}
