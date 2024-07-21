"use client";

import { PlayerCard } from "@/components/players/playerCard";
import { User } from "@prisma/client";
import {
  Card,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const usersPerPage = 24;
const emptyArray = new Array(usersPerPage).fill(null);

export default function Players() {
  const [players, setPlayers] = useState<User[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setPlayers(res.data.users);
    });
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      setDisplayedPlayers(
        players.slice((page - 1) * usersPerPage, page * usersPerPage)
      );
      setIsLoading(false);
    }
  }, [page, players]);

  return (
    <Flex direction="column" gap="2" height="100%">
      <Heading>Players</Heading>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
          gridTemplateRows: "repeat(auto-fit, 76px)",
          gap: "12px",
          flexGrow: 1,
          alignItems: "start",
        }}
      >
        {!isLoading
          ? displayedPlayers.map((player) => (
              <PlayerCard key={player.steamID} user={player} />
            ))
          : emptyArray.map((_, i) => (
              <Skeleton loading key={i}>
                <Card>
                  <Flex minHeight="52px" />
                </Card>
              </Skeleton>
            ))}
      </div>

      <Flex justify="center" align="center" gap="3">
        <IconButton
          onClick={() => {
            setPage((old) => old + 1);
          }}
          disabled={page === 1}
          variant="soft"
        >
          <BsCaretLeftFill />
        </IconButton>
        <Text>{page}</Text>
        <IconButton
          onClick={() => {
            setPage((old) => old - 1);
          }}
          disabled={displayedPlayers.length < usersPerPage}
          variant="soft"
        >
          <BsCaretRightFill />
        </IconButton>
      </Flex>
    </Flex>
  );
}
