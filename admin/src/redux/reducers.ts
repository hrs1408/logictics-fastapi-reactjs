import { combineReducers } from '@reduxjs/toolkit'
import UserSlice from './features/UserSlice'

export const reducers = combineReducers({
  user: UserSlice,
})
