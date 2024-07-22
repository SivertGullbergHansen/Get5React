import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";

export function StatCard({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <Card>
      <Flex direction="column" gap="2" justify="between" align="end">
        <Heading weight="regular" size="3">
          {label}
        </Heading>
        <Heading weight="medium" color="gray" size="6">
          {value}
        </Heading>
      </Flex>
    </Card>
  );
}
