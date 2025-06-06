import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import PasswordInput from '@/components/PasswordInput'
import { useCallback, useEffect, useState } from 'react'
import { theme } from '@/context/ThemeProvider'
import Logo from '/hdfc-ergo-logo.jpg'
import { txtFieldValidation } from '@/utils/form.validation'
import { ResetPasswordFields } from '@/types/authTypes'
import { resetPassword } from '@/lib/auth'
import LifeConnectLogo from '/Life-connect.jpg'

const ResetPassword = () => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const user = JSON.parse(localStorage.getItem('users'))
  const { control, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmitHandle: SubmitHandler<ResetPasswordFields> = async (data) => {
    const loginId = user?.loginId
    const res = await resetPassword(setLoading, showToast, { ...data, loginId })

    if (res?.changePasswordData?.passwordChanged) {
      nav('/login')
      showToast('success', res?.changePasswordData?.statusMessage)
    } else {
      showToast('info', res?.changePasswordData?.statusMessage)
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
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <PasswordInput
            control={control}
            name='newPassword'
            handleChange={() => {}}
            placeholder='Enter New Password'
            sx={{ minWidth: 300, marginBottom: '10px' }}
            validation={txtFieldValidation(true)}
            label='New Password*'
            // isDisabled={!isVerified}
          />

          <PasswordInput
            control={control}
            name='confirmPassword'
            handleChange={() => {}}
            placeholder='Enter Confirm Password'
            sx={{ minWidth: 300, marginBottom: '10px' }}
            validation={txtFieldValidation(true)}
            label='Confirm Password*'
            // isDisabled={!isVerified}
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
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
