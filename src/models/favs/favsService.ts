import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchFavs (): Promise<any> {
  return await axios.get(`${ip}api/v1/likes`)
    .then((response) => response)
    .catch((error) => {
      return error
    })
}

export async function setUnFav (input: string): Promise<any> {
  return await axios.delete(`${ip}api/v1/dislike?name=` + input)
    .then((response) => response)
    .catch((error) => {
      return error
    })
}

export async function setFav (input: string): Promise<any> {
  return await axios.post(`${ip}api/v1/like`, { name: input })
    .then((response) => response)
    .catch((error) => {
      return error
    })
}
