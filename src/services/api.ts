import axios from 'axios'

export const api = axios.create({
  baseURL: "https://60802726a5be5d00176dd379.mockapi.io/api/atw/"
})