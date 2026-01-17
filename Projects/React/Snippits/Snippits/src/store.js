import { configureStore } from '@reduxjs/toolkit'
import snippitsReducer from './redux/snippitsSlice'

export const store = configureStore({
  reducer: {
    snippit: snippitsReducer,
  },
})