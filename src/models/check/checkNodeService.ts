import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchChecked (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/finished`, { name: inputData })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setChecked (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/finish`, { name: inputData })
    .then((response) => response)
    .catch((error) =>
      error
    )
}

export async function unSetChecked (inputData: string): Promise<any> {
  return await axios.delete(`${ip}api/v1/cancel?name=` + inputData)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
