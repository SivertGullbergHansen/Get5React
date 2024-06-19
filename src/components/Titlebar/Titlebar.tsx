"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useSteam } from "@/hooks/useSteam";
import { SignIn } from "../SignIn/SignIn";
import { NavbarProfile } from "./Profile";
import { Card, Flex, Skeleton } from "@radix-ui/themes";

export function Titlebar() {
  const session = useSession();
  const steam = useSteam();

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 flex justify-end items-center">
      <div className="flex gap-4 items-center justify-center">
        <Card>
          <Flex gap="3" align="center">
            {session.status === "unauthenticated" ? (
              <SignIn />
            ) : (
              <NavbarProfile steam={steam} />
            )}
          </Flex>
        </Card>
      </div>
    </nav>
  );
}
