import axios from 'axios'
import { type UserState } from './UserSlice'
// const ip = 'http://37.139.41.200:1323/'
export async function register (data: UserState): Promise<any> {
  return await axios.post('api/v1/signup', data)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function login (data: UserState): Promise<any> {
  return await axios.post('api/v1/login', data)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function logout (): Promise<any> {
  return await axios.delete('api/v1/logout')
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function profile (): Promise<any> {
  return await axios.get('api/v1/profile')
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
      return error.response
    })
}
