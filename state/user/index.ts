import { createAction, createReducer } from '@reduxjs/toolkit'

export interface UserState {
  token: string
  userId: string
  screenName: string
}

const initialState: UserState = {
  token: '',
  userId: '',
  screenName: '',
}

export const updateUserAction = createAction<{ user: UserState }>('user/updateUser')

export const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(updateUserAction, (state, actions) => {
    const {
      payload: { user },
    } = actions
    state.screenName = user.screenName
    state.token = user.token
    state.userId = user.userId
  })
)

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default userReducer
