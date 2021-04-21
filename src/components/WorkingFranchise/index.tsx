import { Flex, Box } from "@chakra-ui/react";
import { ChartComponent } from "./Chart";
import { SupportInfo } from "./SuportInfo";

type Ticket = {
  id: string;
  franchiseId: string;
  title: string;
  subject: string;
  workplace_url: string;
  status: string;
}

interface TicketsProps {
  tickets: Ticket[];
}

export function WorkingFranchise({ tickets }: TicketsProps) {
  return (
    <Flex w="100%" flexDirection="column">
      <ChartComponent />

      <Box mt="4">
        <SupportInfo tickets={tickets} />
      </Box>
    </Flex>
  )
}