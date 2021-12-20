import type { NextPage } from 'next'

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { Flex, Button, Stack } from '@chakra-ui/react'

import { Input } from '../components/Form/Input'


type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória'),
})

const SignIn: NextPage = () => {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
    }

    return (
        <Flex
            w='100vw'
            h='100vh'
            justify='center'
            align='center'
        >
            <Flex
                as='form'
                w='100%'
                maxW={360}
                bg='gray.800'
                p='8' // 2 rem // 32px
                borderRadius={8}
                flexDir='column'
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing='4'>
                    <Input
                        type='email'
                        label='E-mail'
                        error={formState.errors.email}
                        {...register('email')}
                    />
                    <Input
                        type='password'
                        label='Senha'
                        error={formState.errors.password}
                        {...register('password')}
                    />
                </Stack>
                <Button type='submit' mt='6' colorScheme='pink' size='lg' isLoading={formState.isSubmitting}>Entrar</Button>
            </Flex>
        </Flex>

    )
}

export default SignIn
