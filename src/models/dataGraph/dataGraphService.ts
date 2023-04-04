import axios from 'axios'
// const ip = 'http://37.139.41.200:1323/'
export async function fetchDataGraph (inputData: string): Promise<any> {
  return await axios.get('api/v1/technologies?search_text=' + inputData)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}
