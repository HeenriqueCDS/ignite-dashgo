import { Flex, Button, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '../components/Form/Input'

const SignIn: NextPage = () => {
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
            >
                <Stack spacing='4'>
                    <Input
                        name='email'
                        type='email'
                        label='E-mail'
                    />
                    <Input
                        name='password'
                        type='password'
                        label='Senha'
                    />
                </Stack>
                <Button type='submit' mt='6' colorScheme='pink' size='lg'>Entrar</Button>
            </Flex>
        </Flex>

    )
}

export default SignIn