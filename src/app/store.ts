import { type Action, type ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
// import dataGraphReducer from '../models/dataGraph/dataGraphSlice'
import gradeReducer from '../models/gradeFilter/gradeSlice'
// Import user from '../models/user/UserSlice'
import { UserReducer } from '../models/user/userReducer'
import { AuthReducer } from '../models/auth/authReducer'
import { TopsSlice, ListJobsSlice } from '../models/tops/topsSlice'
import recommendReducer from '../models/recommend/recommendSlice'
import recommendTechReducer from '../models/recommendTech/recommendTechSlice'
import jobsReducer from '../models/dataJobs/dataJobsSlice'
import { chechUrlSlice } from '../models/urlCheck/urlCheckSlice'
// import favsReducer from '../models/favs/favsSlice'
// import resumeReducer from '../models/resume/resumeFixSlice'
// Import { auth } from '../models/auth/authSlice'
export const store = configureStore({
  reducer: combineReducers({
    grade: gradeReducer,
    auth: AuthReducer,
    user: UserReducer,
    top: TopsSlice.reducer,
    // fav: favsReducer,
    recommend: recommendReducer,
    recommendTech: recommendTechReducer,
    jobs: jobsReducer,
    // resume: resumeReducer,
    listJob: ListJobsSlice.reducer,
    sendUrl: chechUrlSlice.reducer
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
export const apiUrl = 'https://job-roadmap.ru/api/v1'
