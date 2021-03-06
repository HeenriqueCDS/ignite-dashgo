import NextLink from "next/link";
import { useEffect, useState } from "react";

import { Box, Button, Checkbox, Flex, Heading, Icon, Text, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { queryClient } from "../../services/queryClient";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { User } from "../../services/types/User";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";


interface UsersListProps {
    users: User[]
}

export default function UserList({ users }: UsersListProps) {
    const [page, setPage] = useState(1)
    const { data, isLoading, error, isRefetching } = useUsers(page, {
        initialData: users,
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    }) as boolean


    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)
            return response.data
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutos
        })

    }

    return (
        <Box>
            <Header />
            <Flex w='100%' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />
                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>
                            Usuários
                            {isRefetching && <Spinner ml='4' size='sm' color='gray.500' />}
                        </Heading>

                        <NextLink href='/users/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
                            >
                                Criar novo usuário
                            </Button>
                        </NextLink>
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
                                    {data && data.users.map((user: User) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={['4', '4', '6']}>
                                                    <Checkbox colorScheme='pink' />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight='bold'>{user.name}</Text>
                                                        </Link>
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
                            {data &&
                                <Pagination
                                    totalCountOfRegisters={data.totalCount}
                                    currentPage={page}
                                    onPageChange={setPage}
                                />
                            }
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

// export const getServerSideProps: GetServerSideProps =  async () => {
    
//     const {users} = await getUsers(1)

//     return {
//         props:
//         {
//             users,
//         }
//     }
// }