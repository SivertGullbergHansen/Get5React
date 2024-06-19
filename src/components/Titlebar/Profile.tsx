import { Avatar, Button, DropdownMenu, Skeleton } from "@radix-ui/themes";
import { SteamProfile } from "next-auth-steam";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export function NavbarProfile({ steam }: { steam: SteamProfile | null }) {
  return (
    <>
      <DropdownMenu.Root dir="rtl">
        <Skeleton loading={steam === null}>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              {steam?.personaname || "Susvert"}
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
        </Skeleton>
        <DropdownMenu.Content>
          <Link href="/settings">
            <DropdownMenu.Item>Site settings</DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => signOut()} color="red">
            Sign Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Skeleton loading={steam === null}>
        <Avatar
          src={steam?.avatarfull || ""}
          width={36}
          height={36}
          fallback="SN"
          radius="full"
          alt={steam?.personaname || "Susvert"}
        />
      </Skeleton>
    </>
  );
}
