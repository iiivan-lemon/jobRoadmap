import axios from 'axios'

export async function fetchDataGraph (inputData: string): Promise<any> {
  return await axios.get('api/v1/technologies?search_text=' + inputData)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}
