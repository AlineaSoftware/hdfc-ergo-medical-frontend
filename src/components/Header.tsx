import { Dispatch, SetStateAction, useState, useEffect, useReducer, useRef } from 'react'
import { CustomAppBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import {
  Button,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
  Popover,
  Theme,
  styled,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomDialog from './Dialog-custom'
import { useAuth } from '@/context/AuthContext'
import { AUTH_PATH, MAIN_PATH } from '@/paths/index'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CameraIcon from '@mui/icons-material/Camera'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import { encryptDetails, EUserRole, EUserRoleHDFcErgo, VITE_APP_IMAGE_GET } from '@/utils/constants'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import LockIcon from '@mui/icons-material/Lock'
import Logo from '/hdfc-ergo-logo.jpg'
import LifeConnectLogo from '/Life-connect.jpg'
import { medicalTeamTypes } from 'src/data/loginData'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'
import { logoutUser } from 'src/lib/auth'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmPopUp = ({
  setOpenPopUp,
  openPopUp,
}: {
  setOpenPopUp: Dispatch<SetStateAction<boolean>>
  openPopUp: boolean
}) => {
  const { clearStorage } = useAuth()
  const nav = useNavigate()
  const handleYes = () => {
    clearStorage()
    nav(`${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGIN}`)
  }
  return (
    <CustomDialog
      action={{ component: null, isAction: false }}
      handleClose={() => {
        setOpenPopUp(false)
      }}
      open={openPopUp}
      header={{
        component: (
          <DialogTitle
            sx={{
              padding: '16px 24px 14px 24px',
            }}
          >
            <div className='flex justify-end items-baseline -mt-2 -mr-4'>
              <button
                onClick={() => {
                  setOpenPopUp(false)
                }}
              >
                <SettingsIcon sx={{ fill: theme.palette.mDarkGray?.main }} />
              </button>
            </div>
          </DialogTitle>
        ),
        isHeader: true,
      }}
      maxWidth='xl'
      dialogStyleProps={{
        minWidth: 700,
      }}
      type={undefined}
    >
      <div className=' flex flex-col gap-4 items-center justify-center'>
        <p className='p-2 rounded-md  text-2xl font-bold'>Are you sure want to sign out ?</p>
        <div className='flex justify-between gap-3 px-5'>
          <Button color='mBlue' sx={{ minWidth: '150px' }} onClick={handleYes}>
            Confirm
          </Button>
          <Button
            color='mBlue'
            sx={{ minWidth: '150px' }}
            onClick={() => {
              setOpenPopUp(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </CustomDialog>
  )
}

export const CustomMenuItem = styled(MenuItem)<MenuItemProps & { theme: Theme }>(({ theme }) => ({
  color: theme.palette.mDarkBlue?.main,
  marginRight: '10px',
  marginLeft: '10px',
  gap: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
}))

const Header = ({ open, setOpen }: Props) => {
  const [username, setUsername] = useState<medicalTeamTypes | null>(null)
  const { pathname } = useLocation()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const nav = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopOver = Boolean(anchorEl)
  const id = openPopOver ? 'simple-popover' : undefined

  const { user, clearStorage } = useAuth()
  const users = JSON.parse(localStorage.getItem('users'))
  const sales = JSON.parse(localStorage.getItem('sales'))
  const salesRedirectRaw = localStorage.getItem('salesRedirect')
  const salesRedirect = salesRedirectRaw ? JSON.parse(salesRedirectRaw) : null

  const showName = users ? users?.loginName : 'Sales Portal'

  const roleWiseHeader = HeadingList?.filter((x) => x?.role?.includes(users?.designation))

  useEffect(() => {
    // Get the username and password from local storage
    const storedUsername = JSON.parse(localStorage.getItem('users'))
    // Set the state with the retrieved data
    setUsername(storedUsername)
  }, [])

  const logout = async () => {
    if (localStorage.getItem('salesRedirect')) {
      nav('/sales-login')
      clearStorage()
      showToast('info', 'Logged out successfully')
    } else {
      const payload = {
        token: localStorage.getItem('token'),
        username: JSON.parse(localStorage.getItem('users'))?.loginName,
      }
      const requestBody = {
        encryptedData: encryptDetails(JSON.stringify({ payload }), VITE_APP_SECRET_KEY),
      }
      const res = await logoutUser(setLoading, showToast)

      if (res?.status) {
        clearStorage()
        showToast('info', 'Logged out successfully')
      }
    }
  }
  return (
    <>
      <CustomAppBar
        open={open}
        theme={theme}
        sx={{
          '&.MuiPaper-root': {
            boxShadow: 'none',
            backgroundColor: theme.palette.mWhite.main,
          },
        }}
      >
        <div className='relative flex justify-between items-center px-4 text-white-main shadow-md'>
          <div
            className='flex gap-2 items-center'
            role='button'
            onClick={() => {
              setOpen(!open)
            }}
          >
            {/* <div className='flex'>
      <div className='border-l-4 border-logoBlue-main h-10'></div>
      <div className='border-l-4 border-logoHDFc-main h-10'></div>
    </div> */}

            <div className='text-center py-1'>
              <img src={Logo} alt='HDFC-ERGO-LOGO' width={40} />
            </div>
            <span
              className='text-lg text-black-main'
              role='button'
              onClick={() => {
                if (localStorage.getItem('salesRedirect')) {
                  // nav('/sales-login')
                  // clearStorage()
                } else {
                  nav('/login')
                  clearStorage()
                }
              }}
            >
              HDFC ERGO
            </span>
            {salesRedirect === null && (
              <div className='flex gap-5 ml-5'>
                {HeadingList?.map((x) => {
                  return (
                    <span
                      className={`text-md font-medium hover:underline hover:decoration-darkBlue-main ${x?.path?.split('/')[1] === lastSegment ? 'underline decoration-darkBlue-main' : ''} text-black-main `}
                      role='button'
                      onClick={() => {
                        nav(x?.path)
                      }}
                      key={Math.random()}
                    >
                      {x?.title}
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {/* Center the LifeConnect logo */}
          <div className='absolute left-1/2 transform -translate-x-1/2 text-center py-1'>
            <img src={LifeConnectLogo} alt='Life Connect Logo' width={200} />
          </div>

          <div className='min-h-14 flex items-center justify-end gap-3'>
            <div className='text-sm font-medium text-black-main'>{showName}</div>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <AccountCircleIcon sx={{ fontSize: 23, color: theme.palette.mBlack.main }} />
            </IconButton>

            {/* {!localStorage.getItem('salesRedirect') && ( */}
            <Popover
              id={id}
              open={openPopOver}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <List
                sx={{
                  width: '150px',
                  bgcolor: 'background.paper',
                  '&.MuiList-root': {
                    paddingTop: '0px',
                    paddingBottom: '0px',
                  },
                }}
                component='nav'
                aria-labelledby='nested-list-subheader'
              >
                <ListItemButton onClick={logout}>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </List>
            </Popover>
            {/* )} */}
          </div>
        </div>
      </CustomAppBar>
    </>
  )
}

export default Header

const MainHeading = () => {
  const [heading, setHeading] = useState<string | undefined>()

  const { pathname } = useLocation()
  useEffect(() => {
    const segments = pathname.split('/')
    const lastSegment = segments[segments.length - 1]
    // const formattedSegment = lastSegment
    //   .split('-')
    //   .map((x) => {
    //     const u = x.charAt(0).toUpperCase()
    //     return u + x.slice(1)
    //   })
    //   .join(' ')
    const h = HeadingNames.find((x) => x.path === lastSegment)
    setHeading(h?.title ?? '')
  }, [pathname])

  return <h1 className='text-sm font-medium text-black-main'>{heading}</h1>
}

const HeadingNames = [
  {
    path: '',
    title: 'Dashboard',
  },
  {
    path: '',
    title: 'MIS',
  },
  {
    path: '',
    title: 'Report',
  },
]

const HeadingList = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    role: [EUserRoleHDFcErgo.LinkingTeam, EUserRoleHDFcErgo.MailingTeam],
  },
  {
    path: '/bulk-report',
    title: 'Report',
    role: [EUserRoleHDFcErgo.LinkingTeam],
  },
  {
    path: '/Mis',
    title: 'MIS',
    role: [EUserRoleHDFcErgo.LinkingTeam, EUserRoleHDFcErgo.MailingTeam],
  },
]
