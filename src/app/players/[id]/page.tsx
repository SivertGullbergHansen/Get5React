"use client";

import { Header } from "@/components/page/header";
import { RankCard } from "@/components/user/rank";
import { StatCard } from "@/components/user/statCard";
import { getUser } from "@/types/api";
import { UserType } from "@/types/user";
import { getPlayerColor } from "@/utils/color";
import { formatNumber } from "@/utils/numberFormat";
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useThemeContext,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStars, BsSteam } from "react-icons/bs";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<getUser | undefined>(undefined);
  const accentColor = useThemeContext().accentColor;

  useEffect(() => {
    axios.get(`/api/user?id=${params.id}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <Flex direction="column" gap="4">
      <Header>Player</Header>
      {user === null && <Text>User does not exist</Text>}
      {user && (
        <Card>
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <Avatar
                fallback={user.name[0]}
                src={user.avatar}
                alt="avatar"
                size="4"
              />
              <Heading
                color={
                  user.isAdmin ? accentColor : getPlayerColor(user.position)
                }
              >
                {user.name}
              </Heading>

              <Tooltip content="Leaderboard position">
                <Badge color={getPlayerColor(user.position) || "gray"} size="1">
                  <Flex align="center" gap="1">
                    <BsStars />
                    {user.position}
                  </Flex>
                </Badge>
              </Tooltip>

              <RankCard rating={user.rating} />

              {user.isAdmin && (
                <Tooltip content="This user manages the site">
                  <Badge color={accentColor} size="1">
                    Administrator
                  </Badge>
                </Tooltip>
              )}
              {user.isBanned && user.bannedReason && (
                <Tooltip content={user.bannedReason}>
                  <Badge color="red" size="1">
                    BANNED
                  </Badge>
                </Tooltip>
              )}
              {user.team && (
                <Link href={`/team/${user.teamId}`}>
                  <Badge size="1">{user.team.name}</Badge>
                </Link>
              )}
            </Flex>
            <Flex align="center" gap="5">
              <IconButton asChild size="3" variant="outline">
                <Link
                  target="_blank"
                  href={`https://steamcommunity.com/profiles/${params.id}`}
                >
                  <BsSteam />
                </Link>
              </IconButton>
            </Flex>
          </Flex>
        </Card>
      )}
      {user && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <StatCard label="ELO Rating" value={formatNumber(user.rating)} />
          <StatCard label="Matches played" value="54" />
          <StatCard label="Winrate" value="44 %" />
          <StatCard label="Kills" value="493" />
          <StatCard label="Deaths" value="318" />
          <StatCard label="Headshot %" value="64 %" />
          <StatCard label="Refrag attempt %" value="77 %" />
          <StatCard label="Refrag success %" value="48 %" />
        </div>
      )}
      {user && (
        <Flex direction="column" gap="2">
          <Heading>Map statistics</Heading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <StatCard label="Dust 2" value="64 %" />
            <StatCard label="Inferno" value="54 %" />
            <StatCard label="Mirage" value="44 %" />
            <StatCard label="Nuke" value="39 %" />
            <StatCard label="Overpass" value="N/A" />
            <StatCard label="Vertigo" value="N/A" />
            <StatCard label="Ancient" value="N/A" />
            <StatCard label="Anubis" value="N/A" />
          </div>
        </Flex>
      )}
    </Flex>
  );
}
