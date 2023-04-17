import {
  createAsyncThunk, createSlice
  // , type PayloadAction
} from '@reduxjs/toolkit'
// Import { type RootState, type AppThunk } from '../../app/store'

// import { fetchDataGraph } from './dataGraphService'
import { type RootState } from '../../app/store'
import { fetchFavs, setFav, setUnFav } from './favsService'

export interface Favs {
  name: string
  countAll: number
  countFinished: number
}

const initialState: Favs[] = []

/*
 * The function below is called a thunk and allows us to perform async logic. It
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
 * will call the thunk with the `dispatch` function as the first argument. Async
 * code can then be executed and other actions can be dispatched. Thunks are
 * typically used to make async requests.
 */

export const getFavs = createAsyncThunk(
  'favs/fetchFavs',
  async () => {
    const response = await fetchFavs()
    const tags = ['python developer']
    return tags
    // if (response.status === 200) {
    //   return response.data
    // }
  }
)

export const setFavs = createAsyncThunk(
  'favs/setFavs',
  async (input: string) => {
    const response = await setFav(input)
    if (response.status === 200) {
      return response.data
    }
  }
)

export const setUnFavs = createAsyncThunk(
  'favs/setUnFavs',
  async (input: string) => {
    const response = await setUnFav(input)
    if (response.status === 200) {
      return response.data
    }
  }
)
//
// export const FavsSlice = createSlice({
//   name: 'favs',
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {
//     increment: (state) => {
//       /*
//                    * Redux Toolkit allows us to write "mutating" logic in reducers. It
//                    * doesn't actually mutate the state because it uses the Immer library,
//                    * which detects changes to a "draft state" and produces a brand new
//                    * immutable state based off those changes
//                    */
//
//     },
//     decrement: (state) => {
//     }
//   },
//
//   /*
//        * The `extraReducers` field lets the slice handle actions defined elsewhere,
//        * including actions generated by createAsyncThunk or in other slices.
//        */
//   extraReducers: (builder) => {
//     builder
//       .addCase(getFavs.pending, (state) => {
//       })
//       .addCase(getFavs.fulfilled, (state, action) => {
//         return ((action.payload) ? action.payload : state)
//       })
//       .addCase(getFavs.rejected, (state) => {
//         return []
//       })
//   }
// })

// Export const { incrementByAmount } = gradeSlice.actions

/*
 * The function below is called a selector and allows us to select a value from
 * the state. Selectors can also be defined inline where they're used instead of
 * in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
 */
// export const selectDataFavs = (state: RootState): Favs[] => state.fav
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

// export default FavsSlice.reducer
