import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useFranchises } from "../../services/hooks/useFranchise";

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useFranchises();

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
            <Heading size="lg" fontWeight="normal">Franquias
            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Link href="/franquias/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="yellow" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar nova franquia
            </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados das franquias</Text>
            </ Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      Id
                    </Th>
                    <Th>Usúario</Th>
                    {isWideVersion &&
                      <>
                        <Th>Franqueado</Th>
                        <Th w="8"></Th>
                      </>
                    }
                  </Tr>
                </Thead>
                <Tbody>
                  {data.franchises.map(franchise => {
                    return (
                      <Tr key={franchise.id}>
                        <Td px={["4", "4", "6"]}>
                          <Text>{franchise.id}</Text>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{franchise.name}</Text>
                            <Text fontSize="small" color="gray.300">{franchise.address}</Text>
                          </Box>
                        </Td>
                        {isWideVersion &&
                          <>
                            <Td>
                              {franchise.owner}
                            </Td>
                            <Td>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="yellow"
                                onClick={() => alert('This action is not ready yet')}
                                leftIcon={<Icon
                                  as={RiPencilLine}
                                  fontSize="16"
                                />}
                              >
                                Acessar
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