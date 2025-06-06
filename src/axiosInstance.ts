import axios, { AxiosInstance, CancelTokenSource } from 'axios'
import {
  VITE_APP_API_URL,
  VITE_APP_FRONTEND_URL_LIVE,
  VITE_APP_SECRET_KEY,
} from './utils/envVariables'
import { AUTH_ENDPOINT } from './utils/endPoints'
import { encryptDetails, VITE_APP_FRONTEND_URL } from './utils/constants'

export const axiosUnAuth = axios.create({
  baseURL: VITE_APP_API_URL,
})

const _cancelTokenQueue = new Map<string, CancelTokenSource>()

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_APP_API_URL as string,
  timeoutErrorMessage: 'Timeout! something went wrong',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { cancelToken } = config
    if (cancelToken) {
      const cancelTokenKey = cancelToken?.toString()
      // Cancel previous request and delete from queue
      if (_cancelTokenQueue.has(cancelTokenKey as string)) {
        const source = _cancelTokenQueue.get(cancelTokenKey as string)
        source?.cancel('Request canceled by user')
        _cancelTokenQueue.delete(cancelTokenKey as string)
      }
      // Add current request to the queue
      const source = axios.CancelToken.source()
      config.cancelToken = source.token
      _cancelTokenQueue.set(cancelTokenKey, source)
    }
    const accessToken = localStorage.getItem('token')
    if (!accessToken) {
      // window.location.reload()
    } else {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error: any) => Promise.reject(error),
)

const logOut = async () => {
  const payload = {
    token: localStorage.getItem('token'),
    username: JSON.parse(localStorage.getItem('users'))?.loginName,
  }
  const requestBody = {
    encryptedData: encryptDetails(JSON.stringify({ payload }), VITE_APP_SECRET_KEY),
  }
  try {
    const response = await fetch(VITE_APP_API_URL + AUTH_ENDPOINT.Logout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody) as any,
    })

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      localStorage.clear()
      window.location.href = VITE_APP_FRONTEND_URL_LIVE + '/login'
      const result = await response.json()
      return result
    }
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

const redirectLogin = async () => {
  const res = await logOut()

  // if (res) localStorage.clear()
  // window.location.href = VITE_APP_FRONTEND_URL + '/login'
}

axiosInstance.interceptors.response.use(
  function (response) {
    const allowedApis = ['/auth/current-user']
    const url = response?.config?.url
    if (response?.data?.status === 401 && !allowedApis.includes(url)) redirectLogin()
    return response
  },
  function (error) {
    const allowedApis = ['/auth/current-user']
    const url = error?.response?.config?.url
    const status = error?.response?.data?.status
    if ((status === 401 && !allowedApis.includes(url)) || status === 500) {
      // redirectLogin()
    }
    return Promise.reject(error)
  },
)

axiosUnAuth.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axiosInstance
