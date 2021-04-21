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

type CreateFranchiseFormData = {
  unit_name: string;
  address: string;
}


const createFranchiseFormSchema = yup.object().shape({
  unit_name: yup.string().required('Nome obrigatório'),
  address: yup.string().required('Estado obrigatório')
})

export default function CreateUser() {
  const router = useRouter();

  const createFranchise = useMutation(async (franchise: CreateFranchiseFormData) => {
    const newFranchise = {
      name: franchise.unit_name,
      address: franchise.address,
      owner: 'Não adquirida',
      operational_status: 'Não iniciado'
    }

    const franchiseResponse = await api.post('franchise', newFranchise)

    router.push('/franquias')
    return franchiseResponse;

  })


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createFranchiseFormSchema)
  })

  const errors = formState.errors


  const handleCreateFranchise: SubmitHandler<CreateFranchiseFormData> = async (values) => {
    console.log(values)
    await createFranchise.mutateAsync(values)

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
          onSubmit={handleSubmit(handleCreateFranchise)}
        >
          <Heading size="lg" fontWeight="normal">Criar cadastro de franqueado</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="unit_name" error={errors.unit_name} placeholder="Unidade Vitória 1" label="Nome da unidade" {...register('unit_name')} />
              <Input name="address" error={errors.address} placeholder="Espirito Santo" label="Estado" {...register('address')} />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/franquias" passHref>
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