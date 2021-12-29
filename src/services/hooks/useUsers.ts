import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { api } from "../api"
import { User } from "../types/User"

type GetUsersResponse = {
    users: User[],
    totalCount: number,
}

export async function getUsers(page: number): Promise<GetUsersResponse>{
    const { data, headers } = await api.get('users', {
        params: {
            page: page,
        }
    })

    const totalCount = Number(headers['x-total-count'])
    const users = data.users.map((user: User) => {
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
    return { users, totalCount }
}


export function useUsers(page: number, options: any) {
    return useQuery(['users', page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10, // 10 minutos
        ...options
    })
}