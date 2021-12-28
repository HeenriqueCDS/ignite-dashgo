import Link from "next/link";
import { useEffect } from "react";

import { useQuery } from 'react-query'
import { Box, Button, Checkbox, Flex, Heading, Icon, Text, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";


import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function UserList() {

    const { data, isLoading, error } = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()

        const users  = data.users.map((user: User) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
            }
        }
        ) as User[]
        return users
    })


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    }) as boolean

    useEffect(() => {

    }, [])

    return (
        <Box>
            <Header />
            <Flex w='100%' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />
                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Usuários</Heading>

                        <Link href='/users/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Criar novo usuário
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify='center'>
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify='center' align='center'>
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme='whiteAlpha'>
                                <Thead>
                                    <Tr>
                                        <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                            <Checkbox colorScheme='pink' />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        {isWideVersion && <Th w='8'></Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data && data.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                            <Td px={['4', '4', '6']}>
                                                <Checkbox colorScheme='pink' />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Text fontWeight='bold'>{user.name}</Text>
                                                    <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && <Td>{user.createdAt}</Td>}
                                            {isWideVersion && <Td>
                                                <Button
                                                    as='a'
                                                    size='sm'
                                                    fontSize='sm'
                                                    colorScheme='pink'
                                                    leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                                                >
                                                    Editar
                                                </Button>
                                            </Td>}
                                        </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}