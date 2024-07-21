"use client";

import { StatCard } from "@/components/user/statCard";
import { User } from "@prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSteam } from "react-icons/bs";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios.get(`/api/user?id=${params.id}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <Flex direction="column" gap="4">
      {user === null && <Text>User does not exist</Text>}
      {user && (
        <Card>
          <Flex align="center" justify="between">
            <Flex align="center" gap="3">
              <Avatar
                fallback={user.name[0]}
                src={user.avatar}
                alt="avatar"
                size="4"
              />
              <Heading>{user.name}</Heading>
            </Flex>
            <IconButton asChild size="3" variant="outline">
              <Link
                target="_blank"
                href={`https://steamcommunity.com/profiles/${params.id}`}
              >
                <BsSteam />
              </Link>
            </IconButton>
          </Flex>
        </Card>
      )}
      {user && (
        <Flex gap="6" justify="start" align="start">
          <StatCard label="ELO Rating" value="1600" />
          <StatCard label="Matches played" value="54" />
          <StatCard label="Winrate" value="44%" />
          <StatCard label="Kills" value="493" />
          <StatCard label="Deaths" value="318" />
          <StatCard label="Headshot %" value="64%" />
          <StatCard label="Refrag attempt %" value="77%" />
          <StatCard label="Refrag success %" value="48%" />
        </Flex>
      )}
    </Flex>
  );
}
