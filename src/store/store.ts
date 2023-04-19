import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userSlice } from './features/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
