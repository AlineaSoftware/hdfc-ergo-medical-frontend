import { LoadingState, ShowToastFunction } from '@/types/common'
import { AUTH_ENDPOINT } from '@/utils/endPoints'

import {
  ForgetPassFields,
  ResetPasswordFields,
  SalesLogin,
  SignInFormFields,
} from '@/types/authTypes'
import axiosInstance, { axiosUnAuth } from '../axiosInstance'
import { encryptDetails } from 'src/utils/constants'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'

export const loginUser = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: SignInFormFields,
  token: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify({ ...formData, token }), VITE_APP_SECRET_KEY),
    }

    const res = await axiosUnAuth.post(AUTH_ENDPOINT.Login, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const forgotPassword = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: ForgetPassFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    }

    const res = await axiosUnAuth.post(AUTH_ENDPOINT.ForgotPassword, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const resetPassword = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: ResetPasswordFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    // const data = {
    //   loginId: formData?.loginId,
    //   newPassword: formData?.newPassword,
    //   confirmPassword: formData?.confirmPassword,
    // }
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    }
    const res = await axiosUnAuth.post(AUTH_ENDPOINT.ResetPassword, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const getCurrentUserDetails = async () => {
  try {
    const res = await axiosInstance.post(`${AUTH_ENDPOINT.CurrentUser}`, {})
    return res.data
  } catch (error: any) {
    console.log(error)
    return null
  }
}

export const salesLogin = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: SalesLogin,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    }
    const res = await axiosUnAuth.post(AUTH_ENDPOINT.salesLogin, formData)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const logOutUser = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  data: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    // const requestBody = {
    //   encryptedData: encryptDetails(JSON.stringify({ ...formData, token }), VITE_APP_SECRET_KEY),
    // }

    const res = await axiosUnAuth.post(AUTH_ENDPOINT.logOut, data)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const HardLogOutUser = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  data: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(data), VITE_APP_SECRET_KEY),
    }
    const res = await axiosUnAuth.post(AUTH_ENDPOINT.HardLogOut, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
