"use client";

import { Header } from "@/common";
import { exampleTournaments } from "@/fakeData";
import { TournamentCard } from "@/tournament";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { BsArrowRight } from "react-icons/bs";

function TournamentCategory({
  data,
  label,
  href,
}: {
  href: string;
  label: string;
  data: typeof exampleTournaments;
}) {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" width="100%" align="end">
        <Heading size="5">{label}</Heading>

        <Button variant="ghost">
          View all
          <BsArrowRight />
        </Button>
      </Flex>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
          gap: "16px",
          flexGrow: 1,
          alignItems: "start",
        }}
      >
        {data.map((tournament) => (
          <TournamentCard key={tournament.id} {...tournament} />
        ))}
      </div>
    </Flex>
  );
}

export default function Tournaments() {
  return (
    <Flex direction="column" gap="4" height="100%" pb="8">
      <Header>Tournaments</Header>

      <Flex direction="column" gap="64px">
        <TournamentCategory
          data={exampleTournaments}
          href="hot"
          label="Hot Right Now"
        />

        <TournamentCategory
          data={exampleTournaments}
          href="beginners"
          label="Great For Beginners"
        />
      </Flex>
    </Flex>
  );
}
