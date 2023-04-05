import axios from 'axios'
// Const ip = 'http://109.120.182.94:1323/'
export async function fetchTop (): Promise<any> {
  return await axios.get('api/v1/top')
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
