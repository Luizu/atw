import { useQuery } from "react-query";
import { api } from "../api";

type Franchise = {
  id: string;
  name: string;
  address: string;
  owner: string;
  operational_status: string;
}

type GetFranchisesResponse = {
  franchises: Franchise[];
}

export async function getFranchises(): Promise<GetFranchisesResponse> {
  const { data } = await api.get('franchise');


  const franchises = data.map(franchise => {
    return {
      id: franchise.id,
      name: franchise.name,
      owner: franchise.owner,
    }
  })

  return {
    franchises
  }
}

export function useFranchises() {
  return useQuery(['franchise'], () => getFranchises(), {
    staleTime: 6 // 1 minute
  })
}