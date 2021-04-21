import { Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";

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

export function SupportInfo({ tickets }: TicketsProps) {
  return (
    <Flex w={370} h={400} bg="gray.800" borderRadius="20" flexDirection="column" align="center">
      <Heading fontSize="25" mt="4">Ultimos Tickets de suporte</Heading>
      <Divider mb="6" />

      {tickets.map(ticket => {
        return (
          <>
            <Flex mt="2" align="center" justify="center" key={ticket.id}>
              <Text>{ticket.id}</Text>
              <Divider orientation="vertical" h="6" mx="4" />
              <Text>{ticket.title}</Text>
              <Divider orientation="vertical" h="6" mx="4" />
              <Text>{ticket.status}</Text>
            </Flex>
            <Divider key={ticket.id} />
          </>
        )
      })}

    </Flex>
  )
}