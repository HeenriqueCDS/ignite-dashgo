import Link from "next/link";
import { Box, Button, Divider, Flex, FormErrorMessage, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas não coincidem')
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const handleCreateUser: SubmitHandler<CreateUserData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(values);
    }
    return (
        <Box>
            <Header />
            <Flex w='100%' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />
                <Box
                    as='form'
                    flex='1'
                    borderRadius={8}
                    bg='gray.800'
                    p={['6', '8']}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>

                    <Divider my='6' borderColor='gray.700' />

                    <VStack spacing='8'>
                        <SimpleGrid minChildWidth={240} spacing={['6', '8']} w='100%'>
                            <Input
                                label='Nome completo'
                                {...register('name')}
                                error={formState.errors.name}
                            />
                            <Input
                                label='E-mail'
                                type='email'
                                {...register('email')}
                                error={formState.errors.email}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth={240} spacing={['6', '8']} w='100%'>
                            <Input
                                label='Senha'
                                type='password'
                                {...register('password')}
                                error={formState.errors.password}
                            />
                            <Input
                                label='Confirmação da senha'
                                type='password'
                                {...register('password_confirmation')}
                                error={formState.errors.password_confirmation}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href='/users' passHref>
                                <Button as='a' colorScheme='whiteAlpha' >Cancelar</Button>
                            </Link>
                            <Button
                                colorScheme='pink'
                                type='submit'
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}