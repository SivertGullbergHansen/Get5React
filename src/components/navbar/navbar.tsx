import { useSteam } from "@/hooks/useSteam";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Popover,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BsCaretDownFill,
  BsHouseFill,
  BsPeople,
  BsPeopleFill,
  BsPersonFill,
  BsServer,
  BsShieldFill,
  BsSteam,
  BsTrophyFill,
} from "react-icons/bs";
import { NavLink } from "./navlink";

export function Navbar() {
  const { profile, signIn, signOut, isLoading } = useSteam();
  return (
    <div
      style={{
        display: "grid",
        width: "300px",
      }}
    >
      <Card>
        <Flex direction="column" height="100%" gap="4">
          <Flex justify="center" align="center" gap="1">
            <Image alt="" aria-hidden src="/logo.svg" width={36} height={36} />
            <Heading size="7" as="h1">
              Get5React
            </Heading>
          </Flex>

          <Separator
            style={{
              width: "100%",
            }}
          />

          {/* Profile */}
          <Flex height="48px" align="center" justify="center" gap="3">
            {profile ? (
              <Popover.Root>
                <Popover.Trigger>
                  <Box width={"100%"}>
                    <Card asChild style={{ padding: "12px 0" }}>
                      <button style={{ width: "100%" }}>
                        <Flex
                          align="center"
                          gap="2"
                          width="100%"
                          style={{ padding: "0 12px" }}
                        >
                          <Avatar
                            fallback={profile.personaname[0]}
                            src={profile.avatar}
                            alt="Profile picture"
                            size="2"
                          />
                          <Text
                            wrap="nowrap"
                            size="2"
                            style={{ flexGrow: 1 }}
                            truncate
                          >
                            {profile.personaname}
                          </Text>
                          <BsCaretDownFill />
                        </Flex>
                      </button>
                    </Card>
                  </Box>
                </Popover.Trigger>
                <Popover.Content
                  width="100%"
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  <Flex gap="4" direction="column" style={{ padding: "0 4px" }}>
                    <Button
                      style={{ justifyContent: "start" }}
                      asChild
                      variant="ghost"
                      radius="large"
                      highContrast
                      size="3"
                    >
                      <Link href={`/user/${profile.steamid}`}>My profile</Link>
                    </Button>
                    <Button
                      style={{ justifyContent: "start" }}
                      onClick={signOut}
                      variant="ghost"
                      color="red"
                      radius="large"
                      size="3"
                    >
                      Sign out
                    </Button>
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            ) : (
              <Skeleton loading={isLoading}>
                <Button onClick={signIn}>
                  <Flex align="center" gap="1">
                    Sign in with Steam
                    <BsSteam size={16} />
                  </Flex>
                </Button>
              </Skeleton>
            )}
          </Flex>

          <Separator
            style={{
              width: "100%",
            }}
          />

          {/* Nav */}
          <Flex
            direction="column"
            gap="4"
            style={{
              padding: "0 12px",
            }}
          >
            <Heading size="3">Community</Heading>
            <NavLink href="/">
              <BsHouseFill />
              Home
            </NavLink>
            <NavLink href="/teams">
              <BsPeopleFill />
              Teams
            </NavLink>
            <NavLink href="/matches">
              <BsShieldFill />
              Matches
            </NavLink>
            <NavLink href="/leaderboards">
              <BsTrophyFill />
              Leaderboards
            </NavLink>
            <NavLink href="/players">
              <BsPersonFill />
              Players
            </NavLink>
            <NavLink href="/servers">
              <BsServer />
              Servers
            </NavLink>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
