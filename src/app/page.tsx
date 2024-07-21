"use client";

import { Header } from "@/components/page/header";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <Header>Home</Header>

      <Grid columns="2" gap="4" height="300px">
        <Card></Card>
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
