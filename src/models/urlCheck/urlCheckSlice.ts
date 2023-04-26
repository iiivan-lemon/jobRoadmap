import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchFavs } from '../favs/favsService'
import { checkStatus } from '../utils/checkStatus'
import { checkUrl } from './urlCheckService'

export const sendUrl = createAsyncThunk(
  'sendUrl/checkUrl',
  async (input: string) => {
    const response = await checkUrl(input)
    console.log(response.data)
    // eslint-disable-next-line no-debugger
    debugger
    if (response.status === 200) {
      return response.data
    }
    // const response = { status: 200, favorites: [{ id: 27, name: 'Go Developer', count_all: 22, count_finished: 4 }, { id: 23, name: 'Java Developer', count_all: 41, count_finished: 4 }, { id: 27, name: 'Go Developer', count_all: 22, count_finished: 4 }, { id: 23, name: 'Java Developer', count_all: 41, count_finished: 4 }, { id: 27, name: 'Go Developer', count_all: 22, count_finished: 4 }, { id: 23, name: 'Java Developer', count_all: 41, count_finished: 4 }, { id: 27, name: 'Go Developer', count_all: 22, count_finished: 4 }, { id: 23, name: 'Java Developer', count_all: 41, count_finished: 4 }, { id: 27, name: 'Go Developer', count_all: 22, count_finished: 4 }, { id: 23, name: 'Java Developer', count_all: 41, count_finished: 4 }] }
    // return ((!checkStatus(response.status)) ? response.data : { errMessage: checkStatus(response.status) })
    // if (response.status === 200) {
    //   return response.data
    // }
  }
)
