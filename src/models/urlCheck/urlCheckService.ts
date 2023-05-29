import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function checkUrl (input): Promise<any> {
  return await axios.post(`${ip}api/v1/check`, { link: input })
    .then((response) => response)
    .catch(() => {
    })
}
