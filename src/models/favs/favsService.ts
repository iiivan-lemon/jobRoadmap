import axios from 'axios'
// Const ip = 'http://109.120.182.94:1323/'
export async function fetchFavs (): Promise<any> {
  return await axios.get('api/v1/like')
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setUnFav (input: string): Promise<any> {
  return await axios.delete('/api/v1/dislike?name=' + input)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setFav (input: string): Promise<any> {
  return await axios.post('api/v1/like', { name: input })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
