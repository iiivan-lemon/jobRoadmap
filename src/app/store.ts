import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import dataGraphReducer from '../models/dataGraph/dataGraphSlice'
export const store = configureStore({
  reducer: {
    dataGraph: dataGraphReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
