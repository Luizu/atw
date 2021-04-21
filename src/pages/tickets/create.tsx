import { useCallback, useState } from "react";
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type CreateTicketFormData = {
  title: string;
  subject: string;
  workplace_url: string;
  franchise: string;
}

type FranchiseProps = {
  id: string;
  name: string;
  open_tickets: number;
}


const createTicketFormSchema = yup.object().shape({
  title: yup.string().required('Nome obrigatório'),
  subject: yup.string().required('Assunto obrigatório'),
  workplace_url: yup.string().required('Link do workplace obrigatório').url(),
})

export default function CreateUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [franchise, setFranchise] = useState<FranchiseProps>()

  const createTicket = useMutation(async (ticket: CreateTicketFormData) => {
    const newTicket = {
      title: ticket.title,
      subject: ticket.subject,
      workplace_url: ticket.workplace_url,
      status: 'Chamdado aberto'
    }

    const updatedFranchise = {
      ...franchise,
      open_tickets: franchise.open_tickets + 1
    }

    await api.post(`franchise/${franchise.id}/tickets`, newTicket)

    await api.put(`franchise/${franchise.id}`, updatedFranchise)



    router.push('/tickets')
    return;

  })


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createTicketFormSchema)
  })

  const errors = formState.errors


  const handleFranchiseSearch = useCallback(async (value) => {
    try {
      setLoading(true)

      const response = await api.get(`franchise/${value}`)

      setFranchise(response.data)
      setLoading(false)
      return;
    } catch (err) {
      console.log(err)
    }

  }, [])

  const handleCreateTicket: SubmitHandler<CreateTicketFormData> = async (values) => {
    console.log(values)
    await createTicket.mutateAsync(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6",
            "8"]}
          onSubmit={handleSubmit(handleCreateTicket)}
        >
          <Heading size="lg" fontWeight="normal">Criar cadastro de franqueado</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="title" error={errors.title} label="Titulo" {...register('title')} />
              <Input name="subject" error={errors.subject} label="Assunto" {...register('subject')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="workplace_url" error={errors.workplace_url} type="url" label="Link do workplace" {...register('workplace_url')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="franchise"
                error={errors.franchise}
                label="Codigo da franquia"
                {...register('franchise')}
                onChange={e => handleFranchiseSearch(e.currentTarget.value)}
              />

              <Input name="franchise_location"
                error={errors.franchise_location}
                content={loading ? 'Carregando informações' : franchise.name}
                label="Localização da franquia"
                {...register('franchise_location')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/tickets" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="yellow" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>

          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}