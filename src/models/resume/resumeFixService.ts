import axios from 'axios'
const ip = 'http://job-roadmap.ru/'
export async function fetchResResume (data): Promise<any> {
  // eslint-disable-next-line no-debugger
  return await axios.post(`${ip}api/v1/resume`, { file: data, n_tech: 7, n_prof: 3 }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
