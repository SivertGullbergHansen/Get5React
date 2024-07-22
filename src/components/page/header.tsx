import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <Flex align="center" height="36px">
      <Heading color="gray">{children}</Heading>
    </Flex>
  );
}
