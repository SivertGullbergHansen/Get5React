import { UserType } from "@/types/user";
import { getPlayerColor } from "@/utils/color";
import { Avatar, Badge, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BsStars } from "react-icons/bs";

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
