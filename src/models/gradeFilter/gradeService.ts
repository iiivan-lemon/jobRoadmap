import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchDataGraph (inputData: string): Promise<any> {
  return await axios.get(`${ip}api/v1/technologies?search_text=${inputData}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
