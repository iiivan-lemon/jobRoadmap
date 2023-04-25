import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function checkUrl (input): Promise<any> {
  return await axios.get(`${ip}api/v1/check`, { data: { link: input } })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
