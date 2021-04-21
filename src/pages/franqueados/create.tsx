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

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  cpf: string;
  cnpj: string;
  franchise: string;
  franchise_location: string;
}

interface FranchiseProps {
  name: 'string';
  address: 'string';
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [franchise, setFranchise] = useState<FranchiseProps>();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const newUser = {
      name: user.name,
      cpf: user.cpf,
      cnpj: user.cnpj,
      email: user.email,
      password: user.password,
    }

    const updatedFranchise = {
      ...franchise,
      owner: newUser.name,
      operational_status: 'Adquirida'
    }

    await api.post('franchisee', newUser)

    await api.put(`franchise/${user.franchise}`, updatedFranchise)

   

    router.push('/franqueados')
    return;

  })


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
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
      alert(err)
    }

  }, [])

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    console.log(values)
    await createUser.mutateAsync(values)
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
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar cadastro de franqueado</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" error={errors.name} label="Nome Completo" {...register('name')} />
              <Input name="email" error={errors.email} type="email" label="E-mail" {...register('email')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="cpf" error={errors.cpf} label="CPF" {...register('cpf')} />
              <Input name="cnpj" error={errors.cnpj} label="CNPJ" {...register('cnpj')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" type="password" error={errors.password} label="Senha" {...register('password')} />
              <Input name="password_confirmation" error={errors.password_confirmation} type="password" label="Confirmação da senha" {...register('password_confirmation')} />
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
              <Link href="/users" passHref>
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