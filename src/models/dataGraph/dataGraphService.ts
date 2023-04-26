import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchDataGraph (inputData: string): Promise<any> {
  return await axios.get(`${ip}api/v1/technologies?search_text=${inputData}`)
    .then((response) => response)
    .catch((error) => {
      return error.response
    })
}
