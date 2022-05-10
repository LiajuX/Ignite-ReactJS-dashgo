import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      width="64"
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
    >
      dashgo
      <Text as="span" color="pink.500" ml="1">.</Text>
    </Text>
  );
}
