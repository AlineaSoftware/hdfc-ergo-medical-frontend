import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import {
  acDefaultValue,
  numberFieldValidation,
  searchSelectValidation,
  txtFieldValidation,
} from '@/utils/form.validation'
import { Button, Divider } from '@mui/material'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { AUTH_PATH } from '@/paths/index'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { theme } from '@/context/ThemeProvider'
import NumInput from '@/components/NumInput'
import SelectInput from '@/components/SelectInput'
import { SignUpFormFields } from '@/types/authTypes'
import Image from '/loginFrame.png'
import CheckInput from '@/components/CheckInput'

interface Props {}

const SignUp = ({}: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { control, handleSubmit, setValue, watch, getValues, setError, clearErrors } = useForm({
    defaultValues: {
      name: '',
      person_name: '',
      contact_no: '',
      type: acDefaultValue,
      email: '',
      permission: false,
    },
  })

  const onSubmitHandle: SubmitHandler<SignUpFormFields> = async (data) => {
    // if (data?.permission) {
    //   const res = await signUpUser(setLoading, showToast, data)
    //   if (res) {
    //     nav('/login')
    //   }
    // } else {
    //   showToast('info', 'You must agree to the terms and conditions')
    // }
  }

  return (
    <div className='min-h-screen flex flex-col justify-start flex-wrap gap-2 pb-8'>
      <div className='w-full'>
        <img src={Image} alt='Image' className='flex items-center w-full h-[150px]' />
      </div>
      <div className='flex flex-col justify-center px-5'>
        <div className='text-center'>
          <PersonAddAlt1Icon sx={{ color: theme.palette.mGreen.main, fontSize: 50 }} />
          <h3 className='font-bold text-2xl my-5'>Sign up</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <TxtInput
            control={control}
            name='name'
            handleChange={() => {}}
            placeholder='Enter society name'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Society name*'
            validation={txtFieldValidation(true)}
          />
          <TxtInput
            control={control}
            name='person_name'
            handleChange={() => {}}
            placeholder='Enter your name'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Your name*'
            validation={txtFieldValidation(true)}
          />
          <NumInput
            control={control}
            name='contact_no'
            handleChange={() => {}}
            placeholder='Enter contact number'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Contact number*'
            validation={numberFieldValidation(true, 10, 'Phone')}
          />
          <TxtInput
            control={control}
            name='email'
            handleChange={() => {}}
            placeholder='Enter email address'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Email address'
            validation={txtFieldValidation(true, 'Email')}
          />
          <div className='flex items-center gap-2 justify-start max-w-[300px] min-w-[300px] mb-5'>
            <CheckInput control={control} label={''} name='permission' />
            <p className='text-[12px]'>
              By proceeding, you agree with company’s{' '}
              <span className='underline'>Terms & Conditions & Privacy Policy</span>
            </p>
          </div>
          <div className='text-center flex flex-col gap-2 mb-10'>
            <Button
              color='mBlue'
              sx={{ minWidth: '100%', color: theme.palette.mWhite.main }}
              type='submit'
            >
              Sign up
            </Button>
          </div>
          <Divider sx={{ marginBottom: '8px', fontSize: '14px' }}>
            <div className='font-normal'>Already have an account?</div>
          </Divider>
          <div className='text-center flex flex-col gap-2'>
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
