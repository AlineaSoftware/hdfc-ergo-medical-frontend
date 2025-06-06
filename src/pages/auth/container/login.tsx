import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { Autocomplete, Button } from '@mui/material'
import PasswordInput from '@/components/PasswordInput'
import { theme } from '@/context/ThemeProvider'
import { SignInFormFields } from '@/types/authTypes'
import { AUTH_PATH } from '@/paths/index'
import { medicalTeam } from 'src/data/loginData'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
// import Logo from '/Alinea_logo.png'
import Logo from '/hdfc-ergo-logo.jpg'
import LifeConnectLogo from '/Life-connect.jpg'
import { HardLogOutUser, loginUser } from 'src/lib/auth'
import { useAuth } from 'src/context/AuthContext'
import { useState } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'
import CachedSharpIcon from '@mui/icons-material/CachedSharp'
import { v4 as uuidv4 } from 'uuid'
import CaptchaCanvas from '@/components/CaptchaCanvas'

interface Props {}

const generateCaptcha = () => Math.floor(100000 + Math.random() * 900000).toString()

const LogIn = ({}: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()

  // const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const [captcha, setCaptcha] = useState(generateCaptcha())
  const [captchaInput, setCaptchaInput] = useState('')

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmitHandle: SubmitHandler<SignInFormFields> = async (data) => {
    // if (!isCaptchaVerified) {
    //   showToast('error', 'Please verify the CAPTCHA before logging in.')
    //   return
    // }

    if (captchaInput !== captcha) {
      showToast('error', 'Incorrect CAPTCHA. Please try again.')
      setCaptcha(generateCaptcha()) // Reset CAPTCHA
      setCaptchaInput('') // Clear input field
      return
    }

    const token = uuidv4()
    const res = await loginUser(setLoading, showToast, data, token)

    if (res?.data?.isLoginValid) {
      showToast('success', res?.data?.loginMessage)
      localStorage.setItem('users', JSON.stringify(res?.data))
      localStorage.setItem('token', JSON.stringify(token))
      nav('/dashboard')
    } else {
      if (res?.data?.loginMessage === 'Your session is already running. Logout from all devices.') {
        const confirmLogout = window.confirm(res?.data?.loginMessage)

        if (confirmLogout) {
          const payload = {
            username: data?.username,
          }
          const hardLogout = await HardLogOutUser(setLoading, showToast, {
            payload,
          })
          if (hardLogout?.status) {
            showToast('success', 'Successfully logged out from other session. Please log in again.')
            nav('/login') // Redirect to login after successful logout
          }
        }
      } else {
        showToast('info', res?.data?.loginMessage)
      }
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
          <TxtInput
            control={control}
            name='username'
            handleChange={() => {}}
            placeholder='Enter username'
            sx={{ minWidth: 300, marginBottom: '10px' }}
            label='Username*'
            validation={txtFieldValidation(true, 'txtArea')}
            autoComplete={true}
          />
          <PasswordInput
            control={control}
            name='password'
            handleChange={() => {}}
            placeholder='Enter Your Password'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            validation={{ required: 'required' }}
            label='Password*'
            autoComplete={true}
          />
          {/* Numeric CAPTCHA */}
          <div className='captcha-container mb-3 flex items-center gap-4 bg-gray-200 p-3 rounded-lg'>
            <CaptchaCanvas captcha={captcha}></CaptchaCanvas>

            <CachedSharpIcon
              onClick={() => setCaptcha(generateCaptcha())}
              style={{ fontSize: '30px' }}
              className='cursor-pointer font-bold transition-transform duration-300 hover:rotate-180 hover:scale-110'
            />

            <input
              type='text'
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder='Enter CAPTCHA'
              className='px-3 py-2 border border-gray-300 rounded w-[150px] md:w-[200px] flex-1'
              required
            />
          </div>

          <div className='text-center flex flex-col gap-2 mb-5'>
            <Button
              color='mBlue'
              sx={{ minWidth: '100%', color: theme.palette.mWhite.main }}
              type='submit'
            >
              Login
            </Button>
          </div>
          <Button
            color='mLightBlack'
            sx={{ minWidth: '100%' }}
            variant='outlined'
            onClick={() => {
              nav(`${AUTH_PATH.FORGET_PASSWORD}`)
            }}
          >
            Forgot password?
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
