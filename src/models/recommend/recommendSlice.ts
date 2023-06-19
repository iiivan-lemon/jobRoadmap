import {
  createAsyncThunk, createSlice
  // , type PayloadAction
} from '@reduxjs/toolkit'
// Import { type RootState, type AppThunk } from '../../app/store'

// import { fetchDataGraph } from './dataGraphService'
import { type RootState } from '../../app/store'
import { fetchRecommend } from './recommendService'

// export interface Recommend {
//   profession: string
// }

export interface Recommends {professions: string[], isResume: boolean }

const initialState: Recommends = { professions: [], isResume: false }

/*
 * The function below is called a thunk and allows us to perform async logic. It
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 */

export const getRecommends = createAsyncThunk(
  'recommends/fetchRecommend',
  async ({ input, isResume = false }: { input: string, isResume: boolean }) => {
    //
    // const string = { professions: [input] }
    // return string
    const response = await fetchRecommend(input)
    if (response.status === 200) {
      // eslint-disable-next-line no-debugger
      return { ...response.data, isResume }
    }
  }
)

export const clearRecommends = createAsyncThunk(
  'recommends/fetchRecommend',
  async () => {
    return { professions: [] }
  }
)

export const RecommendSlice = createSlice({
  name: 'recommends',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

    },
    decrement: (state) => {
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRecommends.pending, (state) => {
        return { professions: [], isResume: false }
      })
      .addCase(getRecommends.fulfilled, (state, action) => {
        return ((action.payload) ? action.payload : state)
      })
      .addCase(getRecommends.rejected, (state) => {
        return { professions: [], isResume: false }
      })
  }
})

// Export const { incrementByAmount } = gradeSlice.actions

/*
 * The function below is called a selector and allows us to select a value from
 * the state. Selectors can also be defined inline where they're used instead of
 * in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
 */
export const selectDataRecommends = (state: RootState): Recommends => state.recommend
//
// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// Export const incrementIfOdd =
//     (amount: number): AppThunk =>
//       (dispatch, getState) => {
//         Const currentValue = selectCount(getState())
//         If (currentValue % 2 === 1) {
//           Dispatch(incrementByAmount(amount))
//         }
//       }

export default RecommendSlice.reducer
