import { Flex, Box } from "@chakra-ui/react";
import { ChartComponent } from "./Chart";
import { SupportInfo } from "./SuportInfo";

export function WorkingFranchise() {
  return (
    <Flex w="100%" flexDirection="column">
      <ChartComponent />

      <Box mt="4">
      <SupportInfo />
      </Box>
    </Flex>
  )
}