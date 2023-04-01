import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import dataGraphReducer from '../models/dataGraph/dataGraphSlice'
import gradeReducer from '../models/gradeFilter/gradeSlice'
export const store = configureStore({
  reducer: {
    dataGraph: dataGraphReducer,
    grade: gradeReducer
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
