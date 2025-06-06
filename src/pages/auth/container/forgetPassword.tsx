import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { Button } from '@mui/material'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { theme } from '@/context/ThemeProvider'
import { useEffect, useState } from 'react'
import { forgotPassword } from '@/lib/auth'
import { AUTH_ENDPOINT } from '@/utils/endPoints'
import { ForgetPassFields } from '@/types/authTypes'
import { AUTH_PATH } from '../../../paths'
import Logo from '/hdfc-ergo-logo.jpg'
import LifeConnectLogo from '/Life-connect.jpg'

interface Props {}

const ForgetPassword = ({}: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      emailId: '',
    },
  })
  const onSubmitHandle: SubmitHandler<ForgetPassFields> = async (data) => {
    const res = await forgotPassword(setLoading, showToast, data)
    if (res?.validEmailData?.isValid) {
      showToast('success', 'Reset link sent to your email and mobile.')
      nav(AUTH_PATH.LOGIN)
    } else {
      showToast('error', 'Invalid email address, please try again')
      nav(AUTH_PATH.FORGET_PASSWORD)
    }
  }

  return (
    <div className='min-h-screen h-screen w-screen diagonal-split py-5 flex items-center justify-center'>
      <div className='flex flex-col justify-center bg-white-main w-[450px] py-5 rounded-xl items-center px-5'>
        <div className='text-center py-2'>
          <img src={Logo} alt='Alinea Health' className='pb-1' width={60} />
        </div>
        <div className='text-center py-2'>
          <img src={LifeConnectLogo} alt='Life connect Logo Health' className='pb-3' width={200} />
        </div>
        {/* <span className='text-sm'>Get a link to reset your password</span> */}
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <TxtInput
            control={control}
            name='emailId'
            handleChange={() => {}}
            placeholder='Enter Email'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Email*'
            validation={txtFieldValidation(true, 'Email')}
          />
          <div className='text-center flex flex-col gap-2 mb-5'>
            <Button
              color='mBlue'
              sx={{ minWidth: '100%', color: theme.palette.mWhite.main }}
              type='submit'
            >
              Submit
            </Button>
          </div>
          <Button
            color='mLightBlack'
            sx={{ minWidth: '100%' }}
            variant='outlined'
            onClick={() => {
              nav(`${AUTH_PATH.LOGIN}`)
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
