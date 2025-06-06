import HomeDataOfCase from 'src/data/homeDataDetails'
import { Box, Button, DialogTitle } from '@mui/material'
import Table from '@/components/Table'
import {
  ACTIONS_TABLE,
  Controls,
  HandleControls,
  HeadCell,
  TABLE_STATES,
  TableStates,
} from '@/types/common'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { encryptDetails, EUserRoleHDFcErgo, limitOfPage, TABLES } from 'src/utils/constants'
import { useNotFound } from '@/context/NotFound'
import MedicalDetails2Page from './MedicalDetails2.page'
import { theme } from 'src/context/ThemeProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HomeDataOfCasePPhc from 'src/data/PPHCData'
import DcDetailsPPHC from 'src/data/DcDetailsPPHC'
import { X } from '@mui/icons-material'
import { DCDetailsForMedicalDetails, getMedicalUserDetails } from 'src/lib/medicalDetails'
import { useLoading } from 'src/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'
import axiosInstance from 'src/axiosInstance'
import { MEDICAL_DETAILS } from 'src/utils/endPoints'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
  setSelectedId: Dispatch<SetStateAction<number>>
  selectedId: number
}
const PPHCCasePage = ({
  handleOpen,
  setType,
  open,
  type,
  handleClose,
  setSelectedId,
  selectedId,
}: Props) => {
  //default controls
  const defaultControls = {
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sortParam: 'createdAt',
    sortOrder: -1,
  }

  // Record and Control States
  const [data, setData] = useState<any[]>([])
  const [dcDetailsMedical, setDCDetailsMedical] = useState<any[]>([])
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const { setNotFound, notFound } = useNotFound()
  const [insured, setInsuredName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { setLoading } = useLoading()
  const showToast = useToast()

  const { control, handleSubmit, setValue, clearErrors, setError, watch, getValues } = useForm({
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  })

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    navigate('/dashboard')
  }

  const getUserData = async () => {
    const loginValue = location?.state?.proposalNo
    const token = localStorage.getItem('token')
    if (loginValue) {
      const response = await getMedicalUserDetails(setLoading, showToast, {
        loginDetails: loginValue,
        token: token,
      })
      //  console.log(response, 'response')

      if (response) {
        const { getUserMedicalList, ...rest } = response
        if (getUserMedicalList?.length === 0) {
          setNotFound([TABLES.SALES_CHECK])
        } else {
          setNotFound([])
          setData(getUserMedicalList)
          setSelectedId(getUserMedicalList[0]?.requestID)
          setControls(rest)
        }
      } else {
        setData([])
      }
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const headCells: HeadCell[] = [
    {
      id: 'requestDate',
      label: 'Request Date/Time',
      isSort: false,
      width: 150,
      type: 'date12hour',
    },

    {
      id: 'requestID',
      label: 'Request Id',
      isSort: false,
      width: 90,
    },
    {
      id: 'proposalNo',
      label: 'Proposal No',
      isSort: false,
      width: 80,
    },
    {
      id: 'uniqueId',
      label: 'Unique Id',
      isSort: false,
      width: 80,
    },
    {
      id: 'proposalName',
      label: 'Proposer Name',
      isSort: false,
      width: 150,
    },
    {
      id: 'insured',
      label: 'Insured',
      isSort: false,
      width: 150,
    },

    {
      id: 'insurerDivisionName',
      label: 'Division',
      isSort: false,
      width: 50,
    },

    {
      id: 'medicalTests',
      label: 'Tests',
      isSort: false,
      width: 50,
    },
    {
      id: 'currentstatus',
      label: 'Current Status',
      isSort: false,
      width: 130,
    },
  ]
  const DCDetailsHeadCells: HeadCell[] = [
    {
      id: 'dcName',
      label: 'DC Name',
      isSort: false,
    },

    {
      id: 'apptDateTime',
      label: 'Appt Date',
      isSort: false,
      type: 'date12hour',
    },
    {
      id: 'visitType',
      label: 'Visit Type',
      isSort: false,
    },
    {
      id: 'address',
      label: 'DC Address',
      isSort: false,
    },
  ]

  const getDCDetailsForMedical = async () => {
    const token = localStorage.getItem('token')
    const response = await DCDetailsForMedicalDetails(
      setLoading,
      showToast,
      setNotFound,
      notFound,
      {
        dcValue: String(selectedId),
        token: token,
      },
    )

    if (response) {
      const { getDCList, ...rest } = response

      // Check if getDCList is not null or undefined before accessing .length
      if (getDCList && getDCList.length === 0) {
        setNotFound([TABLES.SALES_CHECK])
      } else if (getDCList) {
        setNotFound([])
        setDCDetailsMedical(getDCList)
      } else {
        // If getDCList is null or undefined, set to an empty array
        setDCDetailsMedical([])
      }
    } else {
      setDCDetailsMedical([])
    }
  }

  useEffect(() => {
    if (selectedId !== 0) {
      getDCDetailsForMedical()
    }
  }, [selectedId])

  const user = JSON.parse(localStorage.getItem('users'))

  const handleRowClick = (row: any) => {
    // console.log("Row clicked:", row);
    setSelectedId(row?.requestID)
    // Perform actions like navigation, updating state, etc.
    // For example, navigate to another route:
    // navigate('/someDetailPage', { state: row });
  }

  const handleDownLoadReport = async (item) => {
    const requestDetailsAudio = {
      RequestID: String(item.requestId),
      PdfUrl: item?.pdf,
      InsurerDivisionName: item?.insurerDivisionName,
      ProposalNo: item?.proposalNo,
      Insured: item?.insured,
    }
    const intoArray = [requestDetailsAudio]
    // console.log('intoArrayPPHC', intoArray)
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(intoArray), VITE_APP_SECRET_KEY),
    }
    const a = await axiosInstance.post(MEDICAL_DETAILS.getMedicalBulkReportZip, requestBody)
    if (a.data !== '') {
      const content = a?.data.match(/https?:\/\/[^\s]+/)[0]
      const link = document.createElement('a')
      link.href = content
      link.download = `${new Date()} bulk_download.zip`
      link.click()
    }
  }
  return (
    <Box>
      <div className='flex justify-between items-center'>
        {/* <h1 className='font-medium text-2xl pt-5 pb-5'>PPHC Case History</h1>
         */}
        <h1 className='font-medium text-2xl pt-5 pb-5'>{location?.state?.division} Case History</h1>
        {/* <form onSubmit={handleSubmit(onSubmitHandle)}>
          <div className='text-center flex justify-center p-3'>
            <Button color='mBlue' sx={{ color: theme.palette.mWhite.main }} type='submit'>
              Back
            </Button>
          </div>
        </form> */}
        <div className='text-center flex justify-center p-3'>
          <Button
            color='mBlue'
            sx={{ color: theme.palette.mWhite.main }}
            onClick={() => {
              window.history.go(-1)
            }}
          >
            Back
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-6 row-span-6 col-start-1 row-start-2'>
          <Table
            handleOpen={handleOpen}
            setType={setType}
            setEntity={setEntity}
            rows={data}
            headCells={headCells}
            controls={controls as Controls}
            handleControls={handleControls}
            setHandleControls={setHandleControls}
            actions={
              user.designation === EUserRoleHDFcErgo.LinkingTeam
                ? [ACTIONS_TABLE.DOWNLOAD_REPORT]
                : []
            }
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName: 'PPHC Case',
            }}
            notFound={notFound.includes(TABLES.NEW_REQUEST)}
            btnTxtArray={[]}
            onRowClick={handleRowClick}
            isTableWithOutAction={user.designation === EUserRoleHDFcErgo.LinkingTeam ? false : true}
            selectedId={selectedId}
            showSelectedRowBg={true}
            DownLoadReport={(item) => handleDownLoadReport(item)}
          />
        </div>
      </div>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-6 row-span-6 col-start-1 row-start-2'>
          <Table
            handleOpen={handleOpen}
            setType={setType}
            setEntity={setEntity}
            rows={dcDetailsMedical.filter((x) => x.requestID === selectedId)}
            headCells={DCDetailsHeadCells}
            controls={controls as Controls}
            handleControls={handleControls}
            setHandleControls={setHandleControls}
            actions={[]}
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName: `DC Details `,
            }}
            headingInsured={`${data?.find((x) => x.requestID === selectedId)?.insured}`}
            notFound={notFound.includes(TABLES.NEW_REQUEST)}
            btnTxtArray={[]}
            onRowClick={handleRowClick}
            isTableWithOutAction={true}
          />
        </div>
      </div>
    </Box>
  )
}

export default PPHCCasePage
