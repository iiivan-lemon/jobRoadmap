import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchRecommend (input): Promise<any> {
  // eslint-disable-next-line no-debugger

  return await axios.get(`${ip}api/v1/recommend?search_text=${encodeURIComponent(input)}`)
    .then((response) => response)
    .catch(() => {

    })
}
