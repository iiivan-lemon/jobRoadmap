import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchRecommendTech (input): Promise<any> {
  // eslint-disable-next-line no-debugger

  return await axios.get(`${ip}api/v1/tech_search?search_text=${input}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
