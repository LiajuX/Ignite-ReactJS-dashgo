import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && ( 
        <Box mr="4" textAlign="right">
          <Text>Júlia Brito</Text>
          <Text color="gray.300" fontSize="small">julialbritto@gmail.com</Text>
        </Box>
      ) }

      <Avatar size="md" name="Júlia Brito" src="https:/github.com/liajux.png" />
    </Flex>
  );
}
