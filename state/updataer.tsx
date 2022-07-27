import React from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from './index';
import { updateUserAction } from './user/index';

export function AppUpdater() {

  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    if (process.browser) {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        dispatch(updateUserAction({ user: user }))
      }
    }
  }, [])
  return null
}