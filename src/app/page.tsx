"use client";

import { Header, RankIcon, getPlayerColor } from "@/common";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { fakeTournaments } from "@/fakeData";
import { formatDistance } from "date-fns";
import { getTypeName } from "@/tournament";
import Link from "next/link";

const fakeTourney = fakeTournaments[0];

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <Header>Home</Header>
      <Card asChild>
        <Link href={`/tournaments/${fakeTourney.id}`}>
          <Grid columns="2" gap="4" height="300px">
            <Card
              style={{
                position: "relative",
              }}
            >
              <Image
                src={fakeTourney.banner}
                alt=""
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  inset: 0,
                }}
                width={534}
                height={300}
              />
            </Card>
            <Flex direction="column" justify="between">
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="1">
                  <Heading>{fakeTourney.name}</Heading>
                  <Heading size="4" color="gray">
                    {formatDistance(fakeTourney.startDate, new Date(), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </Heading>
                </Flex>
                <Text>{fakeTourney.description}</Text>

                <Flex align="center" gap="2">
                  <Badge color="gray">{getTypeName(fakeTourney.type)}</Badge>
                  <Badge color="gray">{`${fakeTourney.teams.length} / ${fakeTourney.maxTeams} Teams`}</Badge>
                  {fakeTourney.maxRating !== 0 && (
                    <Badge color={getPlayerColor(fakeTourney.maxRating * 1000)}>
                      <Flex align="center" gap="1">
                        <RankIcon />
                        {`${fakeTourney.maxRating}K`}
                      </Flex>
                    </Badge>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        </Link>
      </Card>
    </Flex>
  );
}
