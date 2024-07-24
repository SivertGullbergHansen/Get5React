import React from "react";
import { useSteam } from "@/common";
import { Flex, Text, Button, Heading, Card } from "@radix-ui/themes";
import { BsSteam } from "react-icons/bs";
import Image from "next/image";

export function Wizard() {
  const { signIn } = useSteam();
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Card>
        <Flex
          direction="column"
          gap="4"
          minWidth="320px"
          minHeight="320px"
          align="center"
          justify="center"
        >
          <Flex direction="column" align="center" gap="1">
            <Image alt="" aria-hidden src="/logo.svg" width={36} height={36} />
            <Heading size="7" as="h1">
              Get5React
            </Heading>
          </Flex>
          <Flex direction="column" gap="2" align="center">
            <Text>Sign in to get started</Text>
            <Button onClick={signIn}>
              <Flex align="center" gap="1">
                Sign in with Steam
                <BsSteam size={16} />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
