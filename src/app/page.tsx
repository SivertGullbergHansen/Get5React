"use client";

import { Header } from "@/common";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <Header>Home</Header>

      <Grid columns="2" gap="4" height="300px">
        <Card
          style={{
            position: "relative",
          }}
        >
          <Image
            src=""
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
          <Flex direction="column" width="80%" gap="4">
            <Flex direction="column" gap="1">
              <Heading>Tournament name</Heading>
              <Heading size="4" color="gray">
                Start date
              </Heading>
            </Flex>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada, purus nec tincidunt lacinia, tortor velit gravida nunc,
              eget fermentum felis nisl nec justo. Nullam auctor, justo
            </Text>

            <Flex align="center" gap="2">
              <Badge>Counter-Strike</Badge>
              <Badge>8 Teams</Badge>
              <Badge>Knockout</Badge>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
}
