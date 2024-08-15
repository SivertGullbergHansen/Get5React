"use client";

import { Prisma } from "@prisma/client";
import {
  Badge,
  Card,
  Flex,
  FlexProps,
  Heading,
  Inset,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { formatDistance } from "date-fns";
import { getTypeName } from "../utils/name";
import { RankIcon, getPlayerColor } from "@/common";
import { useTournamentPreview } from "@/tournamentPreview";

type Tournament = Prisma.TournamentGetPayload<{
  include: { teams: true };
}>;

export function TournamentCard({
  data,
  props,
}: {
  data: Tournament;
  props?: FlexProps & React.RefAttributes<HTMLDivElement>;
}) {
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
    <Flex
      width="100%"
      height="100%"
      minWidth="330px"
      maxWidth="330px"
      {...props}
    >
      <Card
        asChild
        style={{
          userSelect: "none",
          padding: 0,
        }}
      >
        <button
          onClick={() => {
            setTournamentData(data);
            showTournamentPreview();
          }}
        >
          <Flex direction="column" gap="2" height="100%" width="100%">
            {/* Banner */}
            <Image
              draggable={false}
              src={banner}
              alt="Tournament Banner Display"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "120px",
              }}
              width={350}
              height={120}
            />

            {/* Main Content */}
            <Flex
              gap="4"
              direction="column"
              justify="between"
              flexGrow="1"
              p="4"
            >
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
          </Flex>
        </button>
      </Card>
    </Flex>
  );
}
