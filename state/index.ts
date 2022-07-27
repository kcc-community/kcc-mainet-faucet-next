import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import userReducer from '~/state/user'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
