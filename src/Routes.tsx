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

const AppRoutes = ({}: Props) => {
  const { authParams, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = !!JSON.parse(localStorage.getItem('users'))
  const userRole = JSON.parse(localStorage.getItem('users'))?.designation
  const sales = JSON.parse(localStorage.getItem('sales'))?.isValid

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

      {authParams?.isAuth && !sales ? (
        <Route
          path='/dashboard'
          element={
            <DashBoardLayout>
              <MedicalPage />
            </DashBoardLayout>
          }
        />
      ) : (
        <Route path='/dashboard' element={<Navigate to='/login' />} />
      )}

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
      )}

      {isAuthenticated && !sales ? (
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
      )}

      {userRole === 'Download' ? (
        <Route
          path='/bulk-report'
          element={
            <DashBoardLayout>
              <BulkReportDePage />
            </DashBoardLayout>
          }
        />
      ) : (
        <Route path='/bulk-report' element={<Navigate to='/login' />} />
      )}

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

      {isAuthenticated && !sales ? (
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
      )}

      {/* <Route
        path='/salesteamdashboard'
        element={
          <DashBoardLayout>
            <SalesTeamPage />
          </DashBoardLayout>
        }
      /> */}

      <Route
        path='/salesteamdashboard'
        element={
          localStorage.getItem('salesRedirect') ? (
            <DashBoardLayout>
              <SalesTeamPage />
            </DashBoardLayout>
          ) : (
            ''
          )
        }
      />
    </Routes>
  )
}

export default AppRoutes
