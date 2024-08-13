"use client";

import { Prisma } from "@prisma/client";
import { Badge, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { formatDistance } from "date-fns";
import { getTypeName } from "../utils/name";
import { RankIcon, getPlayerColor } from "@/common";
import { useTournamentPreview } from "@/tournamentPreview";

type Tournament = Prisma.TournamentGetPayload<{
  include: { teams: true };
}>;

export function TournamentCard({ data }: { data: Tournament }) {
  const { showTournamentPreview, setTournamentData } = useTournamentPreview();

  const {
    banner,
    description,
    isActive,
    isOpen,
    maxRating,
    maxTeams,
    name,
    startDate,
    teams,
    type,
  } = data;

  return (
    <Card
      asChild
      style={{
        userSelect: "none",
      }}
    >
      <button
        onClick={() => {
          setTournamentData(data);
          showTournamentPreview();
        }}
      >
        {/* Banner */}
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={banner}
            alt="Tournament Banner Display"
            style={{
              display: "block",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={350}
            height={120}
          />
        </Inset>

        {/* Open/Closed */}
        <Flex position="absolute" top="2" right="2">
          {!isActive ? (
            <Badge variant="solid" color="red">
              Ended
            </Badge>
          ) : (
            <Badge variant="solid" color={isOpen ? "green" : "red"}>
              {isOpen ? "Open" : "Closed"}
            </Badge>
          )}
        </Flex>

        {/* Main Content */}
        <Flex gap="4" direction="column" justify="between">
          <Flex gap="2" direction="column">
            {/* Title + date */}
            <Flex direction="column" gap="1">
              <Heading size="4">{name}</Heading>
              <Text color="gray" size="1">
                {formatDistance(startDate, new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Text>
            </Flex>

            {/* Description */}
            <Text size="1">{description}</Text>
          </Flex>

          {/* Tags */}
          <Flex align="center" gap="2">
            <Badge color="gray">{getTypeName(type)}</Badge>
            <Badge color="gray">{`${teams.length} / ${maxTeams} Teams`}</Badge>
            {maxRating !== 0 && (
              <Badge color={getPlayerColor(maxRating * 1000)}>
                <Flex align="center" gap="1">
                  <RankIcon />
                  {`${maxRating}K`}
                </Flex>
              </Badge>
            )}
          </Flex>
        </Flex>
      </button>
    </Card>
  );
}
