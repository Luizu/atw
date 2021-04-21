import { useQuery } from "react-query";
import { api } from "../api";

type Ticket = {
  id: string;
  title: string;
  status: string;
}

type GetTicketsResponse = {
  tickets: Ticket[];
}

export async function getTickets(): Promise<GetTicketsResponse> {
  const { data } = await api.get('franchise');

  const ticketsResponse = await api.get(`franchise/1050/tickets`)

  console.log(ticketsResponse)

  const tickets = ticketsResponse.data

  return {
    tickets
  }
}

export function useTickets() {
  return useQuery(['tickets'], () => getTickets(), {
    staleTime: 6000 // 1 minute
  })
}