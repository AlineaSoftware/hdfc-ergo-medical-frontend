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
import CustomDialog from 'src/components/Dialog-custom'
import CustomAudioPlayer from 'src/components/AudioPlayer'
import audioTesting from '/audio/file_example_MP3_700KB.mp3'
import { getMedicalUserDetails } from 'src/lib/medicalDetails'
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
  state?: any
}
const MedicalDetailsPage = ({
  handleOpen,
  setType,
  open,
  type,
  handleClose,
  setSelectedId,
  selectedId,
  state,
}: Props) => {
  //default controls
  const defaultControls = {
    search: '',
    page: 1,
    per_page: 10,
  }

  // Record and Control States
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const { setNotFound, notFound } = useNotFound()
  const navigate = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()

  const getUserData = async () => {
    const loginValue = state?.proposalNo
    const token = localStorage.getItem('token')
    if (loginValue) {
      const response = await getMedicalUserDetails(setLoading, showToast, state?._id, {})

      if (response) {
        const { data } = response

        if (data?.length === 0) {
          setNotFound([TABLES.SALES_CHECK])
        } else {
          // Logic to auto-copy audio value if some audio is empty then
          // for (let i = 0; i < data?.length; i++) {
          //   for (let j = i + 1; j < data.length; j++) {
          //     if (data[i].proposalNo === data[j].proposalNo) {
          //       if (data[i].audio && !data[j].audio) {
          //         data[j].audio = data[i].audio
          //       } else if (!data[i].audio && data[j].audio) {
          //         data[i].audio = data[j].audio
          //       }
          //     }
          //   }
          // }

          setNotFound([])
          setData(data)
          setSelectedId(data[0]?._id)
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
      id: 'createdAt',
      label: 'Request Date/Time',
      isSort: false,
      width: 150,
      type: 'formatDateDDMMYYYYTIMEFunction',
    },

    {
      id: 'requestId',
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
      id: 'proposerName',
      label: 'Proposer Name',
      isSort: false,
      width: 150,
    },
    {
      id: 'insuredName',
      label: 'Insured',
      isSort: false,
      width: 150,
    },

    {
      id: 'tpaName',
      label: 'Division',
      isSort: false,
      width: 50,
    },

    {
      id: 'testCategory',
      label: 'Tests',
      isSort: false,
      width: 50,
    },
    {
      id: 'status',
      label: 'Current Status',
      isSort: false,
      width: 130,
    },
    {
      id: 'apptDateTime',
      label: 'Appt Date',
      isSort: false,
      width: 50,
      type: 'date12hour',
    },
  ]
  const user = JSON.parse(localStorage.getItem('users'))
  const handleRowClick = (row: any) => {
    setSelectedId(row?._id)
  }

  const handleDownLoadAudio = async (item) => {
    // console.log('item,,,,', item)
    const requestDetailsAudio = {
      RequestID: String(item.requestId),
      AudioUrl: item?.audio,
      InsurerDivisionName: item?.insurerDivisionName,
      ProposalNo: item?.proposalNo,
      Insured: item?.insured,
    }
    const intoArray = [requestDetailsAudio]
    const requestBody = {
      encryptedData: encryptDetails(JSON.stringify(intoArray), VITE_APP_SECRET_KEY),
    }
    const a = await axiosInstance.post(MEDICAL_DETAILS.getMedicalAudioDownload, requestBody)
    if (a.data !== '') {
      const content = a?.data.match(/https?:\/\/[^\s]+/)[0]
      window.open(content, '_blank')
    }
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
        <h1 className='font-medium text-2xl pt-5 pb-5'>{state?.tpaName} Case History</h1>
        {/* <h1 className='font-medium text-2xl pt-5 pb-5'>Tele MER Case History</h1> */}
        {/* <form onSubmit={handleSubmit(onSubmitHandle */}
        <div className='text-center flex justify-center p-3'>
          <Button
            color='mBlue'
            sx={{ color: theme.palette.mWhite.main }}
            onClick={() => {
              navigate('/dashboard')
            }}
          >
            Back
          </Button>
        </div>
        {/* </form> */}
      </div>

      <div className='col-span-5'>
        <div className='pt-4'>
          <Table
            handleOpen={handleOpen}
            setType={setType}
            setEntity={setEntity}
            rows={data}
            headCells={headCells}
            controls={controls as Controls}
            handleControls={handleControls}
            setHandleControls={setHandleControls}
            actions={[]}
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName: 'Tele MER Case',
            }}
            notFound={notFound.includes(TABLES.NEW_REQUEST)}
            btnTxtArray={[]}
            isTableWithOutAction={true}
            redirectPath={'/dashboard/medicalDetailsPage'}
            onRowClick={handleRowClick}
            selectedId={selectedId}
            showSelectedRowBg={true}
            DownLoadAudio={(item) => handleDownLoadAudio(item)}
            DownLoadReport={(item) => handleDownLoadReport(item)}
          />

          {type === TABLE_STATES.PLAY && (
            <>
              <CustomDialog
                action={{ component: null, isAction: false }}
                handleClose={handleClose}
                open={open}
                header={{
                  isHeader: true,
                  component: <></>,
                }}
                maxWidth='xl'
                dialogStyleProps={{
                  minWidth: 450,
                }}
                type={undefined}
              >
                <CustomAudioPlayer
                  audioSource={`${data?.find((x) => x.requestID === selectedId)?.audio}`}
                />
              </CustomDialog>
            </>
          )}
        </div>
      </div>
    </Box>
  )
}

export default MedicalDetailsPage
