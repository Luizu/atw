import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const errors = formState.errors

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    router.push('/dashboard')
    toast.success('Login efetuado com successo')
  }

  toast.warn('Login feature not implemented yet, please use a random email/password to enter the app', {
    closeOnClick: true,
    autoClose: false
  })

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        w='100%'
        maxWidth={360}
        bg="gray.800"
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">

          <Input
            name='email'
            type='email'
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            name='password'
            type='password'
            error={errors.password}
            label="Senha"
            {...register('password')}
          />

        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size='lg'
          isLoading={formState.isSubmitting}
        >Entrar</Button>
      </Flex>
    </Flex>
  )
}
