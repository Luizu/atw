import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[];
}

export async function getUsers(): Promise<GetUsersResponse> {
  const { data } = await api.get('franchisee');

  console.log(data)

  const users = data.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })

  return {
    users
  }
}

export function useUsers() {
  return useQuery(['franchisee'], () => getUsers(), {
    staleTime: 6 // 1 minute
  })
}