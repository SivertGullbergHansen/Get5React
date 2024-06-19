"use client";
import { useSteam } from "@/hooks/useSteam";
import { Flex, Text, Button, Heading, Card } from "@radix-ui/themes";

export default function Home() {
  const steam = useSteam();
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Heading size="6">
          Welcome{steam?.personaname ? `, ${steam.personaname}` : ""}!
        </Heading>
        <Text>Seems like you are missing some settings.</Text>
        <Button>Edit settings</Button>
      </Flex>
    </Card>
  );
}
