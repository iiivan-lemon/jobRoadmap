import axios from 'axios'
const ip = 'http://89.208.85.17:1323/'
export async function fetchRecommend (input): Promise<any> {
  // eslint-disable-next-line no-debugger
  debugger
  return await axios.get(`${ip}api/v1/recommend/search_text=${input}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
