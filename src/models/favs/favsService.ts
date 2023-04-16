import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchFavs (): Promise<any> {
  return await axios.get(`${ip}api/v1/likes`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setUnFav (input: string): Promise<any> {
  return await axios.delete(`${ip}api/v1/dislike?name=` + input)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setFav (input: string): Promise<any> {
  return await axios.post(`${ip}api/v1/like`, { name: input })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
