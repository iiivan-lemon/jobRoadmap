import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchFavs } from '../favs/favsService'
import { checkStatus } from '../utils/checkStatus'
import { checkUrl } from './urlCheckService'
import { type RootState } from '../../app/store'
import { fetchDataGraph } from '../dataGraph/dataGraphService'

export const sendUrl = createAsyncThunk(
  'sendUrl/checkUrl',
  async (input: string) => {
    const response = await checkUrl(input)

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
export const sendText = createAsyncThunk(
  'sendUrl/saveUrl',
  async (text: string) => {
    return { tips: text }
    // const data = { job_name: 'frontend developer', technology_number: 13, additional: [{ technology_name: 'JavaScript', distance: 1.0, professionalism: 0 }, { technology_name: 'Vue.jsVue.jsVue.js', distance: 0.6666666666666666, professionalism: 2 }, { technology_name: 'Git', distance: 0.6666666666666666, professionalism: 1 }, { technology_name: 'CSS', distance: 0.6555555555555556, professionalism: 0 }, { technology_name: 'TypeScript', distance: 0.55, professionalism: 3 }, { technology_name: 'HTML', distance: 0.4916666666666667, professionalism: 0 }, { technology_name: 'CSS3', distance: 0.45, professionalism: 0 }, { technology_name: 'HTML5', distance: 0.45, professionalism: 0 }, { technology_name: 'React', distance: 0.43333333333333335, professionalism: 0 }, { technology_name: 'React.js', distance: 0.4, professionalism: 0 }, { technology_name: 'ReactJS', distance: 0.3333333333333333, professionalism: 1 }, { technology_name: 'Node.js', distance: 0.3333333333333333, professionalism: 1 }, { technology_name: 'AngAngularAngularAngularAngularular', distance: 0.3333333333333333, professionalism: 1 }] }
    // return data.additional
    // eslint-disable-next-line no-debugger
    // return { errMessage: 'server error' }
    // return ((response && !checkStatus(response.status)) ? { position_data: response.data.position_data, in_base: +response.data.in_base } : { errMessage: checkStatus(response.status) })
    // if (response.position_data.detail) {
    //   return { technology_name: input, distance: 1, professionalism: 0 }
    // }

    // The value we return becomes the `fulfilled` action payload
    // return [{ technology_name: 'python', distance: 1.0, professionalism: 0.5416666666666666 }, { technology_name: 'backend', distance: 0.6666666666666666, professionalism: 0.75 }, { technology_name: 'django', distance: 0.6666666666666666, professionalism: 0.3333333333333333 }, { technology_name: 'white', distance: 0.6666666666666666, professionalism: 0.75 }, { technology_name: 'aiohttp', distance: 0.6666666666666666, professionalism: 0.75 }, { technology_name: 'api', distance: 0.6222222222222221, professionalism: 0.5535714285714286 }, { technology_name: 'frontend', distance: 0.5, professionalism: 0.611111111111111 }, { technology_name: 'rest', distance: 0.5, professionalism: 0.47222222222222215 }, { technology_name: 'docker', distance: 0.4666666666666666, professionalism: 0.6230158730158731 }, { technology_name: 'sql', distance: 0.43333333333333335, professionalism: 0.5961538461538461 }, { technology_name: 'mongodb', distance: 0.43333333333333335, professionalism: 0.27564102564102566 }, { technology_name: 'configuration', distance: 0.4, professionalism: 0.08333333333333333 }, { technology_name: 'https', distance: 0.4, professionalism: 0.08333333333333333 }, { technology_name: 'gitearadiumgroupradiumproject', distance: 0.4, professionalism: 0.08333333333333333 }, { technology_name: 'asyncio', distance: 0.39999999999999997, professionalism: 0.5231481481481481 }, { technology_name: 'fastapi', distance: 0.35555555555555557, professionalism: 0.6718750000000001 }, { technology_name: 'git', distance: 0.35, professionalism: 0.5912698412698414 }, { technology_name: 'cassandra', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'framework', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'angular', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'c', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'github', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'server', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'pydantic', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'microservice', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'elasticsearch', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'kafka', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'golang', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'ubuntu', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'clickhouse', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'scrum', distance: 0.3333333333333333, professionalism: 0.5416666666666666 }, { technology_name: 'offline', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'front', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'aiogram', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'ode', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'kubernetes', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'ci', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'agile', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'back', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'saas', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }, { technology_name: 'rabbitmq', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'codequot', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'imac', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'minikube', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'vagrant', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'nosql', distance: 0.3333333333333333, professionalism: 0.75 }, { technology_name: 'wildberries', distance: 0.3333333333333333, professionalism: 0.3333333333333333 }]
  }
)
const initialState: { tips: string } = { tips: '' }
export const chechUrlSlice = createSlice({
  name: 'sendUrl',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    get: (state, action) => {
      return ((action.payload) ? action.payload : state)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendText.fulfilled, (state, action) => {
        return ((action.payload) ? action.payload : state)
      })
  }
})

// Export const { incrementByAmount } = gradeSlice.actions

/*
 * The function below is called a selector and allows us to select a value from
 * the state. Selectors can also be defined inline where they're used instead of
 * in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
 */
export const selectSendUrl = (state: RootState): { tips: string } => state.sendUrl
