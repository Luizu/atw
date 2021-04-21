import { Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";

export function SupportInfo() {
  return (
    <Flex w={370} h={400} bg="gray.800" borderRadius="20" flexDirection="column" align="center">
      <Heading fontSize="25" mt="4">Ultimos Tickets de suporte</Heading>
      <Divider mb="6"/>
      <Flex mt="2" align="center" justify="center">
        <Text>1</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Pedido de insumos</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Concluido</Text>
      </Flex>
      <Divider />
      <Flex mt="2" align="center" justify="center">
        <Text>1</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Pedido de insumos</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Concluido</Text>
      </Flex>
      <Divider />
      <Flex mt="2" align="center" justify="center">
        <Text>1</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Pedido de insumos</Text>
        <Divider orientation="vertical" h="6" mx="4"/>
        <Text>Concluido</Text>
      </Flex>
      <Divider />
    </Flex>
  )
}