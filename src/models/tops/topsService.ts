import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchTop (): Promise<any> {
  return await axios.get(`${ip}api/v1/top`)
    .then((response) => response)
    .catch(() => {

    })
}

export async function fetchNodeProf (input): Promise<any> {
  return await axios.post(`${ip}api/v1/list`, { technology_name: input })
    .then((response) => response)
    .catch(() => {

    })
}
