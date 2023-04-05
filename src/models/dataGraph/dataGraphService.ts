import axios from 'axios'
// Const ip = 'http://109.120.182.94:1323/'
export async function fetchDataGraph (inputData: string): Promise<any> {
  return await axios.get(`api/v1/technologies?search_text=${inputData}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
