import {
  createAsyncThunk, createSlice
  // , type PayloadAction
} from '@reduxjs/toolkit'
// Import { type RootState, type AppThunk } from '../../app/store'

// import { fetchDataGraph } from './dataGraphService'
import { type RootState } from '../../app/store'
import { fetchJobLetter } from './jobLetterService'
import { fetchResResume } from '../resume/resumeFixService'
import { checkStatus } from '../utils/checkStatus'
// import {fetchJobLetter, fetchResResume} from './jobLetterService'

// export interface Recommend {
//   profession: string
// }

export interface Recommends {professions: string[] }

const initialState: Recommends | null = { professions: [] }

/*
 * The function below is called a thunk and allows us to perform async logic. It
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 */

export const getJobLetter = createAsyncThunk(
  'jobLetter/fetchJobLetter',
  async (input: any) => {
    //
    // const string = { professions: [input] }
    // return string
    // eslint-disable-next-line no-debugger
    const response = await fetchResResume(input).then().catch(() => null)
    return ((response && !checkStatus(response.status)) ? response.data.recommend : { errMessage: checkStatus(response.status) })

    // return (response && (response.status) === 200 ? response.data.recommend : null)
    // const mockText = 'Hello!\naselkfhnapoufhbfhsrduginhsdtugdnlgorinhsuioflhsefhusef'
    // return mockText
  }
)

// export const ResumeSlice = createSlice({
//   name: 'resume',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     increment: (state) => {
//       /*
//              * Redux Toolkit allows us to write "mutating" logic in reducers. It
//              * doesn't actually mutate the state because it uses the Immer library,
//              * which detects changes to a "draft state" and produces a brand new
//              * immutable state based off those changes
//              */
//
//     },
//     decrement: (state) => {
//     }
//   },
//
//   /*
//      * The `extraReducers` field lets the slice handle actions defined elsewhere,
//      * including actions generated by createAsyncThunk or in other slices.
//      */
//   extraReducers: (builder) => {
//     builder
//       .addCase(getResResume.pending, (state) => {
//         return { professions: [] }
//       })
//       .addCase(getResResume.fulfilled, (state, action) => {
//         return ((action.payload) ? action.payload : state)
//       })
//       .addCase(getResResume.rejected, (state) => {
//         return { professions: [] }
//       })
//   }
// })

// Export const { incrementByAmount } = gradeSlice.actions

/*
 * The function below is called a selector and allows us to select a value from
 * the state. Selectors can also be defined inline where they're used instead of
 * in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
 */
// export const selectResumeRes = (state: RootState): Recommends => state.jobLetter
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

// export default JobLetterSlice.reducer
