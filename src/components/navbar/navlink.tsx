import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      radius="large"
      size="3"
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
