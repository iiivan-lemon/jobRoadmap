import axios from 'axios'
const ip = 'http://89.208.85.17:1323/'
export async function fetchDataJobs (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/professions`, { search_text: inputData })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
