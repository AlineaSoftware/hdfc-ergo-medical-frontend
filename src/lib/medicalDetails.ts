import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import { MEDICAL_DETAILS } from '@/utils/endPoints'
import axiosInstance, { axiosUnAuth } from '../axiosInstance'

import {
  medicalAllUserDetails,
  medicalUserDetails,
  medicalUserRequestId,
} from 'src/types/medicalTypes'
import { encryptDetails, TABLES } from 'src/utils/constants'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'
import { COMMON_MESSAGE } from 'src/utils/commonMessages'

export const getAllMedicalUserDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const url = `${MEDICAL_DETAILS.getMedicalUserDetails}?${new URLSearchParams(params).toString()}`

    const res = await axiosInstance.get(url)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    } else {
      // toast('success', COMMON_MESSAGE.Submit)
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

// export const getMedicalUserDetails = async (
//   loading: LoadingState['setLoading'],
//   toast: ShowToastFunction,
//   formData: medicalAllUserDetails,
// ) => {
//   try {
//     loading({ isLoading: true, isPage: false })
//     const requestBody = {
//       encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
//     }
//     const res = await axiosInstance.post(MEDICAL_DETAILS.getMedicalUserAllDetails, requestBody)
//     if (res.data.status === 400) {
//       toast('error', res.data.message)
//     }
//     return res.data
//   } catch (error: any) {
//     console.log(error)
//     if (error.response.status === 400) {
//       toast('error', error.response.data.message)
//     } else {
//       toast('error', error.response.statusText)
//     }
//   } finally {
//     loading({ isLoading: false, isPage: false })
//   }
// }
export const getMedicalUserDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  proposalId: string,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const url = `${MEDICAL_DETAILS.getMedicalUserAllDetails}/${proposalId}?${new URLSearchParams(params).toString()}`

    const res = await axiosInstance.get(url)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    } else {
      // toast('success', COMMON_MESSAGE.Submit)
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
// ----------------------------decryption

export const getMedicalUserOtherDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  proposalId: string,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const url = `${MEDICAL_DETAILS.getMedicalUserOtherDetails}/${proposalId}?${new URLSearchParams(params).toString()}`

    const res = await axiosInstance.get(url)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    } else {
      // toast('success', COMMON_MESSAGE.Submit)
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

export const getMedicalUserInsuredDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: medicalUserRequestId,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    }

    const res = await axiosInstance.post(
      MEDICAL_DETAILS.getMedicalUserInsuredMedicalDetails,
      requestBody,
    )
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }

    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else {
      toast('error', error.response.statusText || 'An unexpected error occurred')
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const callForMedicalDetails = async (
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

    const res = await axiosInstance.post(MEDICAL_DETAILS.getMedicalCallDetails, requestBody)

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

export const callDispositionsForMedicalDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(handleControls), VITE_APP_SECRET_KEY),
    }

    const res = await axiosInstance.post(MEDICAL_DETAILS.getMedicalDispositionDetails, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    if (res?.data?.success) {
      if (res?.data?.length === 0) {
        notFound([...notFoundArray, TABLES.DISPOSITION_DURATION])
      } else {
        notFound([])
      }
      return res?.data
    } else {
      notFound([...notFoundArray, TABLES.DISPOSITION_DURATION])
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

export const DCDetailsForMedicalDetails = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(handleControls), VITE_APP_SECRET_KEY),
    }

    const res = await axiosInstance.post(MEDICAL_DETAILS.getMedicalDCDetails, requestBody)
    if (res.data.status === 400) {
      toast('error', res.data.message)
    }
    if (res?.data?.success) {
      if (res?.data?.length === 0) {
        notFound([...notFoundArray, TABLES.DISPOSITION_DURATION])
      } else {
        notFound([])
      }
      return res?.data
    } else {
      notFound([...notFoundArray, TABLES.DISPOSITION_DURATION])
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

export const MedicalBulkReport = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const url = `${MEDICAL_DETAILS.getMedicalBulkReport}?${new URLSearchParams(params).toString()}`

    const res = await axiosInstance.get(url)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    } else {
      toast('success', COMMON_MESSAGE.Submit)
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

export const getDetailsOfMsi = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(formData), VITE_APP_SECRET_KEY),
    }
    const res = await axiosInstance.post(MEDICAL_DETAILS.getMSIDetails, requestBody)
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
