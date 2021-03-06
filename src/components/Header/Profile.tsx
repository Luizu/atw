import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Eduardo Castilho</Text>
          <Text color="gray.300" fontSize="small">eduardo@atw.delivery</Text>
        </Box>
      )}

      <Avatar size="md" name="Luiz Castilho" src="https://github.com/luizu.png" />
    </Flex>
  )
}