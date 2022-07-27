import { useSelector } from 'react-redux'
import { AppState } from '.'

export function useUser() {
  return useSelector((state: AppState) => state.user)
}
