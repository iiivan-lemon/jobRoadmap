import { type Action, type ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import dataGraphReducer from '../models/dataGraph/dataGraphSlice'
import gradeReducer from '../models/gradeFilter/gradeSlice'
// Import user from '../models/user/UserSlice'
import { UserReducer } from '../models/user/userReducer'
import { AuthReducer } from '../models/auth/authReducer'
// Import { auth } from '../models/auth/authSlice'
export const store = configureStore({
  reducer: combineReducers({
    dataGraph: dataGraphReducer,
    grade: gradeReducer,
    auth: AuthReducer,
    user: UserReducer
  })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
export const apiUrl = 'http://37.139.41.200:1323/api/v1'
