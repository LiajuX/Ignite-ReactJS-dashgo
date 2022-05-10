import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Box, 
  Button, 
  Divider, 
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack, 
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryCLient';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password'),
  ], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');

      router.push('/users');
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async(values) => {
    await createUser.mutateAsync(values);
  }

  return (
    <Box>
      <Header />

      <Flex
        width="100%"
        mx="auto"
        my="6"
        px="6"
        maxWidth={1480}
      >
        <Sidebar />

        <Box
          as="form"
          flex="1"
          p={["6", "8"]}
          bg="gray.800"
          borderRadius={8}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
              <Input
                name="name"
                label="Nome completo" 
                error={errors.name}
                {...register('name')}
              />

              <Input
                name="email"
                label="E-mail"
                type="email" 
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
              <Input
                name="password"
                label="Senha"
                type="password" 
                error={errors.password}
                {...register('password')}
              />

              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password" 
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex justify="flex-end" mt="8">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
