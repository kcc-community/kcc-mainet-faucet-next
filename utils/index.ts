import { API_BASE_URL } from '~/constants'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { UserState } from '~/state/user'
import styledNotification from '~/components/StyledNotification'

interface ApiResponse<T> {
  code: number
  data: T
  msg: string
  signature: string
  success: true
}

type LoginType = UserState & { url: string }

const service = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

/**
 * @description INTERCEPTORS
 * @returns {}
 */
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    styledNotification.error({ message: 'Network Error!' })
  }
)

export async function login(token?: string, id?: string) {
  const response: AxiosResponse<ApiResponse<LoginType>> = await service({
    url: `/login`,
    method: 'POST',
    data: {
      token,
      id,
    },
  })
  const { data } = response
  return data
}

export async function loginCallback(oauth_token: string, oauth_verifier: string) {
  const response: AxiosResponse<ApiResponse<UserState>> = await service({
    url: `/login_callback`,
    method: 'POST',
    data: {
      oauth_token,
      oauth_verifier,
    },
  })
  const { data } = response
  return data
}

export async function faucet(token: string, id: string, captcha: string, address: string) {
  const response: AxiosResponse<ApiResponse<string>> = await service({
    url: `/faucet`,
    method: 'POST',
    data: {
      token,
      id,
      captcha,
      address,
    },
  })
  const { data } = response
  return data
}

const API = {
  login,
  loginCallback,
  faucet,
}

export default API
