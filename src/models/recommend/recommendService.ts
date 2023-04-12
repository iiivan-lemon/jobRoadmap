import axios from 'axios'
const ip = 'http://job-roadmap.ru/'
export async function fetchRecommend (input): Promise<any> {
  // eslint-disable-next-line no-debugger

  return await axios.get(`${ip}api/v1/recommend?search_text=${input}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
