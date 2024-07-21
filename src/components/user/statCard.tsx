import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Flex direction="column" gap="2" justify="start" align="end">
      <Heading size="3">{label}</Heading>
      <Heading size="6">{value}</Heading>
    </Flex>
  );
}
