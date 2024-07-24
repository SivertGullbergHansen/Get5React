import { UserType, getPlayerColor } from "@/common";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export function PlayerCard({ user }: { user: UserType }) {
  return (
    <Card asChild>
      <Link href={`/players/${user.steamID}`}>
        <Flex minHeight="52px" gap="2" align="center">
          <Avatar
            size="4"
            fallback={user.name[0]}
            src={user.avatar}
            alt={user.name}
          />
          <Text
            weight="medium"
            color={getPlayerColor(user.position)}
            truncate
            wrap="nowrap"
          >
            {user.name}
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
