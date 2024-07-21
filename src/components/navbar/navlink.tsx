import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Button
      color={(href !== "/" ? isActive : href === pathname) ? undefined : "gray"}
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
