"use client";

import { Prisma } from "@prisma/client";
import { Badge, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { getTypeName } from "../utils/name";
import { RankIcon, getPlayerColor } from "@/common";

type Tournament = Prisma.TournamentGetPayload<{
  include: { teams: true };
}>;

export function TournamentCard({
  id,
  name,
  banner,
  isActive,
  isOpen,
  startDate,
  teams,
  description,
  type,
  maxTeams,
  minRating,
  maxRating,
}: Tournament) {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  return (
    <Card asChild>
      <Link href={`/tournaments/${id}`}>
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={banner}
            alt="Bold typography"
            style={{
              display: "block",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={400}
            height={120}
          />
        </Inset>
        <Flex gap="4" direction="column">
          <Flex direction="column">
            <Flex gap="1" align="center">
              <Heading size="4">{name}</Heading>
              {!isActive ? (
                <Badge color="red">Ended</Badge>
              ) : (
                <Badge color={isOpen ? "green" : "red"}>
                  {isOpen ? "Open" : "Closed"}
                </Badge>
              )}
            </Flex>
            <Text color="gray" size="1">
              {formatDistance(startDate, new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </Text>
          </Flex>

          <Text size="1">{description}</Text>

          <Flex align="center" gap="2">
            <Badge color="gray">{getTypeName(type)}</Badge>
            <Badge color="gray">{`${teams.length} / ${maxTeams} Teams`}</Badge>
            {minRating !== 0 && maxRating !== 0 && (
              <Badge color={getPlayerColor(maxRating * 1000)}>
                <Flex align="center" gap="1">
                  <RankIcon />
                  {`${minRating}K - ${maxRating}K`}
                </Flex>
              </Badge>
            )}
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
}
