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
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { touchedFields },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  })
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const passwordValue = watch('password')
  const confirmPasswordValue = watch('confirm_password')

  const onSubmitHandle: SubmitHandler<ResetPasswordFields> = async (data) => {
    const response = await resetPassword(setLoading, showToast, { token: token }, data)
    if (response?.status) {
      nav('/login')
      showToast('success', response?.message)
    } else {
      showToast('info', response?.message)
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
            name='password'
            handleChange={() => {}}
            placeholder='Enter New Password'
            sx={{ minWidth: 300, marginBottom: '10px' }}
            validation={txtFieldValidation(true, 'Password')}
            label='New Password*'
            // isDisabled={!isVerified}
            touchedFields={touchedFields}
          />

          <PasswordInput
            control={control}
            name='confirm_password'
            handleChange={() => {}}
            placeholder='Enter Confirm Password'
            sx={{ minWidth: 300, marginBottom: '10px' }}
            validation={{
              ...txtFieldValidation(true),
              validate: (value) => value === passwordValue || 'Passwords do not match',
            }}
            label='Confirm Password*'
            // isDisabled={!isVerified}
            touchedFields={touchedFields}
          />
          <div className='text-center flex flex-col gap-2 mb-5'>
            <Button
              color='mBlue'
              sx={{ minWidth: '100%', color: theme.palette.mWhite.main }}
              type='submit'
              disabled={
                !passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue
              }
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
