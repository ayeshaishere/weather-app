import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./weatherSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    theme: themeReducer,
  },
})

export const { dispatch, getState } = store

export const RootState = store.getState
export const AppDispatch = store.dispatch
