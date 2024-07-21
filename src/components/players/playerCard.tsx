import { User } from "@/app/players/page";
import { Avatar, Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export function PlayerCard({ user }: { user: User }) {
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
          <Flex
            align="start"
            justify="center"
            flexGrow="1"
            direction="column"
            gap="2"
          >
            <Text truncate wrap="nowrap">
              {user.name}
            </Text>
            {user.teamId && <Badge size="1">Team name</Badge>}
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
}
