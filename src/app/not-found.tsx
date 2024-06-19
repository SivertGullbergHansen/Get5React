import { Flex, Text, Button, Link, Heading } from '@radix-ui/themes';

export default function NotFound() {
  return (
    <Flex direction="column" align='center' gap="2">
    <Heading size='6'>Page Not Found!</Heading>
    <Link href='/'>Go home</Link>
  </Flex>
  );
}
