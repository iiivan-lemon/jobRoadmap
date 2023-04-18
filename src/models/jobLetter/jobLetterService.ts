import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchJobLetter (data): Promise<any> {
  // eslint-disable-next-line no-debugger
  return await axios.post(`${ip}api/v1/letter`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => response)
    .catch((error) =>
      error.response
    )
}
