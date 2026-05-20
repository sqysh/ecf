'use client'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { uiReducer } from './slices/uiSlice'
import { formReducer } from './slices/formSlice'
import { toastReducer } from './slices/toastSlice'

const rootReducer = combineReducers({
  ui: uiReducer,
  form: formReducer,
  toast: toastReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useUiSelector = () => useAppSelector((state) => state.ui)
export const useFormSelector = () => useAppSelector((state) => state.form)
export const useToastReducer = () => useAppSelector((state) => state.toast)
