import axios from 'axios'
const ip = 'http://89.208.85.17:1323/'
export async function fetchTop (): Promise<any> {
  return await axios.get(`${ip}api/v1/top`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
