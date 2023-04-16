import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchNodeTips (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/professions`, { search_text: inputData })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
