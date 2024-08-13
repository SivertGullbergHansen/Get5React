"use client";

import { Carousel, Header } from "@/common";
import { fakeCategories, fakeTournaments } from "@/fakeData";
import { TournamentCard } from "@/tournament";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { BsArrowRight } from "react-icons/bs";

function TournamentCategory({
  data,
  label,
  href,
  maxTournaments = 6,
}: {
  href: string;
  label: string;
  data: typeof fakeTournaments;
  maxTournaments?: number;
}) {
  return (
    <Flex direction="column" gap="2">
      <Flex justify="between" width="100%" align="end">
        <Heading size="5">{label}</Heading>
        {data.length > maxTournaments && (
          <Button variant="ghost">
            View all
            <BsArrowRight />
          </Button>
        )}
      </Flex>
      <Carousel showButtons>
        {data.slice(0, maxTournaments).map((tournament) => (
          <Flex key={tournament.id} minWidth="330px" maxWidth="330px">
            <TournamentCard data={tournament} />
          </Flex>
        ))}
      </Carousel>
    </Flex>
  );
}

export default function Tournaments() {
  return (
    <Flex direction="column" gap="4" height="100%" pb="8">
      <Header>Tournaments</Header>

      <Flex direction="column" gap="64px">
        {fakeCategories.map((category) => (
          <TournamentCategory
            key={category.slug}
            data={fakeTournaments.filter((tournament) =>
              category.tournamentIds.includes(tournament.id)
            )}
            href={category.slug}
            label={category.label}
          />
        ))}
      </Flex>
    </Flex>
  );
}
