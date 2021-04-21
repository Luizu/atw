import { Flex, Box, Text, Heading, Divider, Progress } from "@chakra-ui/react";

export function NotWorkingFranchise() {
  return (
    <Flex w="100%">

      <Flex w={370} h={400} bg="gray.800" borderRadius="20" flexDirection="column" align="center" ml="4">
        <Heading>Expansão</Heading>
        <Divider />

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Primeiro pedido</Text>
          <Progress value={99} hasStripe isAnimated w="40" h="2" />
        </Flex>

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Compra de maquinario</Text>
          <Progress value={50} hasStripe isAnimated w="40" h="2" />
        </Flex>

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Projeto tecnico</Text>
          <Progress value={100} hasStripe isAnimated w="40" h="2" />
        </Flex>
      </Flex>

      <Flex w={370} h={400} bg="gray.800" borderRadius="20" flexDirection="column" align="center" ml="4">
        <Heading>Implatação</Heading>
        <Divider />

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Envio de materiais</Text>
          <Progress value={28} hasStripe isAnimated w="40" h="2" />
        </Flex>


      </Flex>
      <Flex w={370} h={400} bg="gray.800" borderRadius="20" flexDirection="column" align="center" ml="4">
        <Heading>Marketing</Heading>
        <Divider />

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Marketing inaugural</Text>
          <Progress value={0} hasStripe isAnimated w="40" h="2" />
        </Flex>

        <Flex align="center" justify="center" mt="4">
          <Text mr="4">Campanhas</Text>
          <Progress value={10} hasStripe isAnimated w="40" h="2" />
        </Flex>

      </Flex>

    </Flex>
  )
}