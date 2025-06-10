import { Routes, Route, useNavigate, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LogIn from './pages/auth/container/login'
import ForgetPassword from './pages/auth/container/forgetPassword'
import DashBoardLayout from './pages/dashboard/layout'
import ResetPassword from './pages/auth/container/resetPassword'
import MedicalPage from './pages/medicalhomePage/page'
import MedicalDePage from './pages/medicalhomePage/MedicalDePage'
import PPHCCaseDePage from './pages/medicalhomePage/PPHCCaseDePage'
import SalesTeamPage from './pages/salesTeam/Page'
import SalesLogIn from './pages/auth/container/salesLogin'
import BulkReport from './pages/BulkReportTab/Page'
import BulkReportDePage from './pages/BulkReportTab/BulkReportDePage'
import Msi from './pages/MSI/Page'
import EncryptionDecryptionApp from './pages/Sample/EncryptionDecryptionApp'
import MSIPage from './pages/MSI/MIS'
type Props = {}

const NF = ({}: Props) => {
  const { authParams, user } = useAuth()

  const getRedirectPath = () => {
    if (!authParams.isAuth) {
      localStorage.clear()
      return '/login'
    }

    const salesRedirectRaw = localStorage.getItem('salesRedirect')
    const salesRedirect = salesRedirectRaw ? JSON.parse(salesRedirectRaw) : null
    return salesRedirect === null ? '/dashboard' : '/salesteamdashboard'
  }

  return <Navigate to={getRedirectPath()} replace />
}

const AppRoutes = ({}: Props) => {
  const { authParams, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = !!JSON.parse(localStorage.getItem('users'))
  const userRole = JSON.parse(localStorage.getItem('users'))?.designation
  const sales = JSON.parse(localStorage.getItem('sales'))?.isValid
  const salesRedirectRaw = localStorage.getItem('salesRedirect')
  const salesRedirect = salesRedirectRaw ? JSON.parse(salesRedirectRaw) : null

  console.log({ salesRedirect })

  return (
    <Routes>
      {/* Redirect root path to /login */}
      <Route path='/' element={<Navigate to='/login' replace />} />

      {!authParams?.isAuth && (
        <>
          <Route path='/login' element={<LogIn />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/sales-login' element={<SalesLogIn />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/encryption' element={<EncryptionDecryptionApp />} />
        </>
      )}

      {authParams?.isAuth && salesRedirect === null ? (
        <>
          <Route
            path='/dashboard'
            element={
              <DashBoardLayout>
                <MedicalPage />
              </DashBoardLayout>
            }
          />
          <Route
            path='/dashboard/medicalDetailsPage'
            element={
              <DashBoardLayout>
                <MedicalDePage />
              </DashBoardLayout>
            }
          />
          <Route
            path='/dashboard/pphccasehistory'
            element={
              <DashBoardLayout>
                <PPHCCaseDePage />
              </DashBoardLayout>
            }
          />
          <Route
            path='/bulk-report'
            element={
              <DashBoardLayout>
                <BulkReportDePage />
              </DashBoardLayout>
            }
          />
          <Route
            path='/Mis'
            element={
              <DashBoardLayout>
                <MSIPage />
              </DashBoardLayout>
            }
          />
        </>
      ) : (
        ''
      )}
      {/* 
      {isAuthenticated && !sales ? (
        <Route
          path='/dashboard/medicalDetailsPage'
          element={
            <DashBoardLayout>
              <MedicalDePage />
            </DashBoardLayout>
          }
        />
      ) : (
        ''
      )} */}

      {/* {isAuthenticated && !sales ? (
        <Route
          path='/dashboard/pphccasehistory'
          element={
            <DashBoardLayout>
              <PPHCCaseDePage />
            </DashBoardLayout>
          }
        />
      ) : (
        ''
      )} */}

      {/* {userRole === 'Download' ? ( */}
      {/* <Route
        path='/bulk-report'
        element={
          <DashBoardLayout>
            <BulkReportDePage />
          </DashBoardLayout>
        }
      /> */}
      {/* ) : (
        <Route path='/bulk-report' element={<Navigate to='/login' />} />
      )} */}

      {/* {userRole === 'Download' ? (
        <Route
          path='/bulk-report'
          element={
            <DashBoardLayout>
              <BulkReportDePage />
            </DashBoardLayout>
          }
        />
      ) : (
        <Route path='/bulk-report' element={<Navigate to='/dashboard' />} />
      )} */}

      {/* {authParams?.isAuth && !sales ? (
        <Route
          path='/Mis'
          element={
            <DashBoardLayout>
              <MSIPage />
            </DashBoardLayout>
          }
        />
      ) : (
        <Route path='/Mis' element={<Navigate to='/login' />} />
      )} */}

      {/* <Route
        path='/salesteamdashboard'
        element={
          <DashBoardLayout>
            <SalesTeamPage />
          </DashBoardLayout>
        }
      /> */}

      {authParams?.isAuth && salesRedirect && (
        <Route
          path='/salesteamdashboard'
          element={
            <DashBoardLayout>
              <SalesTeamPage />
            </DashBoardLayout>
          }
        />
      )}

      <Route path={'*'} element={<NF />} />
    </Routes>
  )
}

export default AppRoutes
