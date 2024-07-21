"use client";

import { User } from "@prisma/client";
import { Avatar, Badge, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { SteamProfile } from "next-auth-steam";
import { useEffect, useState } from "react";

// Then use it in your useState hook

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
        <Flex align="center" gap="3">
          <Avatar
            fallback={user.name[0]}
            src={user.avatar}
            alt="avatar"
            size="4"
          />
          <Heading>{user.name}</Heading>
        </Flex>
      )}
    </Flex>
  );
}
