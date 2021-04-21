import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useTickets } from "../../services/hooks/useTickets";

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useTickets();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Lista de Tickets
            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Link href="/franqueados/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="yellow" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo ticket
            </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos tickets</Text>
            </ Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      Status
                    </Th>
                    <Th>Id do Ticket</Th>
                    {isWideVersion &&
                      <>
                        <Th>Titulo</Th>
                        <Th w="8"></Th>
                      </>
                    }
                  </Tr>
                </Thead>
                <Tbody>
                  {data.tickets.map(ticket => {
                    return (
                      <Tr key={ticket.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="green"/>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{ticket.id}</Text>
                          </Box>
                        </Td>
                        {isWideVersion &&
                          <>
                            <Td>
                              {ticket.title}
                            </Td>
                            <Td>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="whiteAlpha"
                                leftIcon={<Icon
                                  as={FiMessageSquare}
                                  fontSize="16"
                                />}
                              >
                                Iniciar atendimento
                          </Button>
                            </Td>
                          </>
                        }
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={1}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}