import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import dataGraphReducer from '../models/dataGraph/dataGraphSlice'
import gradeReducer from '../models/gradeFilter/gradeSlice'
// import userReducer from '../models/user/UserSlice'
import { authReducer, usersReducer } from '../authApp/_store'
// import { authReducer } from '../models/auth/authSlice'
export const store = configureStore({
  reducer: {
    dataGraph: dataGraphReducer,
    grade: gradeReducer,
    auth: authReducer,
    users: usersReducer
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
