import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link";
import { api } from "../../../services/api"

import { Flex, Text, Divider, Button, Icon } from '@chakra-ui/react';

import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { FiArrowLeft } from 'react-icons/fi'
import { WorkingFranchise } from "../../../components/WorkingFranchise";

type ticket = {
  id: string;
  franchiseId: string;
  title: string;
  subject: string;
  workplace_url: string;
  status: string;
}

type Franchise = {
  id: string;
  name: string;
  owner: string;
  operational_status: string;
  open_tickets: number;
}

interface FranchiseProps {
  franchise: Franchise;
  tickets: ticket[];
}

export default function FranchiseDetail({ franchise, tickets }: FranchiseProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex w="100%" maxWidth={1480} mx="auto" px="6" flexDirection="column">

          <Flex w="100%" h="20" bg="gray.800" mb="4" align="center">
            <Link href="/franquias">
              <Button ml="4" colorScheme="yellow"><Icon as={FiArrowLeft} fontSize="20" /> Voltar</Button>
            </Link>

            <Flex align="center">
              <Text ml="8">{franchise.id} - {franchise.name}</Text>
              <Divider orientation="vertical" h="8" ml="4" />
              <Text ml="4">Franqueado - {franchise.owner}</Text>
            </Flex>

            <Flex flexDirection="column" mr="8" ml="auto">
              <Text>Situação: {franchise.operational_status}</Text>
              <Link href="/tickets/create?franchise_id=1050">
              <Button colorScheme="yellow">Novo Ticket</Button>
              </Link>
            </Flex>
          </Flex>
          <WorkingFranchise tickets={tickets}/>

        </Flex>

      </Flex>
    </Flex>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const { data } = await api.get(`franchise/${id}`)
  const response = await api.get(`franchise/${id}/tickets`)

  const franchise = data
  const tickets = response.data

  console.log(tickets)

  return {
    props: { franchise, tickets }
  }
}