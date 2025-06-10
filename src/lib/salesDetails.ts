import { LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import { MANUAL_EMPANELMENT, SALES_DETAILS } from '@/utils/endPoints'
import axiosInstance, { axiosUnAuth } from '../axiosInstance'
import { EmpanelmentAddFields } from '@/types/empanelmentAdd'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { GetAllDetails, GetPincode, SalesDetails } from 'src/types/salesTypes'
import { encryptDetails, TABLES } from 'src/utils/constants'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'

export const getDataFromId = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(MANUAL_EMPANELMENT.Get, { id: id })
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    }
    return res?.data
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

export const getSalesList = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    // const data = {
    //   loginValue: formData?.loginValue,
    // }
    // const requestBody = {
    //   encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    // }
    const res = await axiosInstance.get(SALES_DETAILS.getUserList)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else if (error.response.status === 401) {
      toast('error', 'Unauthorized access. Please log in again.')
      localStorage.clear()
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const getAllDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  assignedToId: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    // const requestBody = {
    //   encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    // }

    const URL = `${SALES_DETAILS.getAllDetails}/${assignedToId}`
    const res = await axiosInstance.get(URL)

    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    return res.data
  } catch (error: any) {
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else if (error.response.status === 401) {
      toast('error', 'Unauthorized access. Please log in again.')
      localStorage.clear()
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const insertDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  caseId: string,
  formData: {
    apptDateTime: string
    agentName: string
    agentNumber: string
    language: string
  },
) => {
  try {
    loading({ isLoading: true, isPage: false })

    // const params = {
    //   flag: 1,
    //   providerID: 0,
    //   apptState: 0,
    // }

    // const requestBody = {
    //   encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    // }
    const URL = `${SALES_DETAILS.insertAllDetails}/${caseId}`
    const res = await axiosInstance.put(URL, formData)

    if (res.data.status === 400) {
      toast('error', res.data.message)
    } else {
      toast('success', COMMON_MESSAGE.Submit)
    }

    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response && error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response ? error.response.statusText : 'An unexpected error occurred')
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const callDispositions = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  assignedToId: string,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const URL = `${SALES_DETAILS.callDisposition}/${assignedToId}?${new URLSearchParams(params).toString()}`
    const res = await axiosInstance.get(URL)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    }
    return res?.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else if (error.response.status === 401) {
      toast('error', 'Unauthorized access. Please log in again.')
      localStorage.clear()
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const proposerStatus = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  assignedToId: string,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const URL = `${SALES_DETAILS.proposerStatus}/${assignedToId}?${new URLSearchParams(params).toString()}`
    const res = await axiosInstance.get(URL)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    }
    return res?.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else if (error.response.status === 401) {
      toast('error', 'Unauthorized access. Please log in again.')
      localStorage.clear()
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const callDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  callHandle: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(callHandle), VITE_APP_SECRET_KEY),
    }

    const res = await axiosUnAuth.post(SALES_DETAILS.callDetails, requestBody)

    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    if (res?.data?.success) {
      if (res?.data?.length === 0) {
        notFound([...notFoundArray, TABLES.CALL_HISTORY])
      } else {
        notFound([])
      }
      return res?.data
    } else {
      notFound([...notFoundArray, TABLES.CALL_HISTORY])
    }
    return res.data
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response ? error.response.statusText : 'An unexpected error occurred')
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const pinCodeAPI = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  pincode: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    // const data = {
    //   pinCode: pincode,
    // }
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(pincode), VITE_APP_SECRET_KEY),
    }
    const res = await axiosUnAuth.post(SALES_DETAILS.pinCodeAPI, requestBody)
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
