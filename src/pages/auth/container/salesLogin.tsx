import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import { Button } from '@mui/material'
import { theme } from '@/context/ThemeProvider'
import { SalesLogin } from '@/types/authTypes'
import { useToast } from '@/hooks/useToast'
import Logo from '/hdfc-ergo-logo.jpg'
import LifeConnectLogo from '/Life-connect.jpg'
import { salesLogin } from 'src/lib/auth'
import { useLoading } from '@/context/LoadingContext'
import { txtFieldValidation } from 'src/utils/form.validation'
import { useAuth } from 'src/context/AuthContext'
type Props = {}

const SalesLogIn = ({}: Props) => {
  const nav = useNavigate()
  const showToast = useToast()
  const { user, clearStorage, addStorage } = useAuth()
  const { setLoading } = useLoading()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      proposalNum: '',
    },
  })

  const onSubmitHandle: SubmitHandler<SalesLogin> = async (data: any) => {
    const res = await salesLogin(setLoading, showToast, {
      proposalNum: data?.proposalNum,
      deviceType: 'WEB',
      notificationToken: '',
    })
    console.log({ res })
    if (res) {
      clearStorage()
      const token = res?.accessToken
      addStorage(token)
      localStorage.setItem('sales', JSON.stringify(data?.proposalNum))
      nav('/salesteamdashboard')
      localStorage.setItem('salesRedirect', JSON.stringify(true))
    } else {
      showToast('error', res?.message)
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
            name='proposalNum'
            handleChange={() => {}}
            placeholder='Enter Proposal No, Proposer Name, Insurer Name'
            sx={{ minWidth: 300, marginBottom: '20px' }}
            label='Proposal Detail*'
            validation={txtFieldValidation(true, 'txtArea')}
          />
          <div className='text-center flex flex-col gap-2 mb-5'>
            <Button
              color='mBlue'
              sx={{ minWidth: '100%', color: theme.palette.mWhite.main }}
              type='submit'
            >
              Login
            </Button>
          </div>
          <div className='text-center text-sm text-blue-main cursor-pointer'>
            <p onClick={() => nav('/login')}>Move to Medical portal</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SalesLogIn
