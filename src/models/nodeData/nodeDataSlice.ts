import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchJobLetter } from '../jobLetter/jobLetterService'
import { fetchNodeTips } from './nodeDataService'

export const getNodeData = createAsyncThunk(
  'nodeTips/fetchNodeTips',
  async (input: any) => {
    // eslint-disable-next-line no-debugger

    // const string = { professions: [input] }
    // return string
    const mockText = 'ссылка 1 wikipedia.ru\nссылка 2 movie-space.ru ' + input
    return mockText
    // const response = await fetchNodeTips(input).then().catch(() => null)
    // return (response && (response.status) === 200 ? response.data.recommend : null)
  }
)
