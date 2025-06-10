import { Box, Button, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import Table from '@/components/Table'
import {
  ACTIONS_TABLE,
  Controls,
  HandleControls,
  HeadCell,
  HEADER_BTN,
  TABLE_STATES,
  TableStates,
} from '@/types/common'
import { useNotFound } from '@/context/NotFound'
import { EApprovalStatus, encryptDetails, EUserRole, limitOfPage, TABLES } from '@/utils/constants'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Audio from '../../../public/audio/file_example_MP3_700KB.mp3'
import { getNewRequest } from '@/lib/empanelmentRequest'
import { useAuth } from '@/context/AuthContext'
import { theme } from '@/context/ThemeProvider'
import CustomDialog from '@/components/Dialog-custom'
import { delistProviderApproveRejectFromDashboardForNetwork } from '@/lib/manage'
import SelectInput from 'src/components/SelectInput'
import { DateInput } from 'src/components/DateInput'
import { dateSelectValidation } from 'src/utils/form.validation'
import Search from '@/components/Search'
import RadioInput from '@/components/RadioInput'
import { DateTimeInput } from 'src/components/DateTime'
import {
  differenceInDays,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns'
import { MedicalBulkReport } from 'src/lib/medicalDetails'
import CustomAudioPlayer from 'src/components/AudioPlayer'

import { MEDICAL_DETAILS } from 'src/utils/endPoints'
import axiosInstance from 'src/axiosInstance'
import { VITE_APP_SECRET_KEY } from 'src/utils/envVariables'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
  setSelectedId: Dispatch<SetStateAction<number>>
  selectedId: number
}

const BulkReport = ({
  handleOpen,
  setType,
  open,
  type,
  handleClose,
  setSelectedId,
  selectedId,
}: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()

  //default controls
  const defaultControls = {
    search: '',
    page: 1,
    per_page: 10,
  }

  // Record and Control States
  const [data, setData] = useState<any[]>(null)
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  // Set today's date with 12:00 AM
  const getTodayAtMidnight = () => startOfDay(new Date())

  // Set today's date with the current time
  const getTodayWithCurrentTime = () => new Date()

  const { control, handleSubmit, setValue, clearErrors, setError, watch, getValues } = useForm({
    defaultValues: {
      startDate: getTodayAtMidnight(),
      endDate: getTodayWithCurrentTime(),
      division: '',
    },
  })

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    const { startDate, endDate } = data

    // if (!startDate || !endDate) {
    //   showToast('error', 'Please select both From Date and To Date.')
    //   return
    // }

    const diffInDays = differenceInDays(new Date(endDate), new Date(startDate))

    // if (diffInDays < 0) {
    //   showToast('error', 'To Date cannot be earlier than From Date.')
    //   return
    // }

    // if (diffInDays > 2) {
    //   showToast('error', 'You can only search for a maximum of 2 days.')
    //   return
    // }

    await getData(data)
  }

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  // const getData = async (data) => {
  //   const response = await MedicalBulkReport(setLoading, showToast, setNotFound, notFound, {
  //     ...handleControls,
  //     startDate: data?.startDate ? formatDate(data.startDate) : '',
  //     endDate: data?.endDate ? formatDate(data.endDate) : '',
  //     division: data?.division ?? '',
  //   })

  //   if (response) {
  //     const { getClosedBulk, ...rest } = response
  //     if (getClosedBulk.length === 0) {
  //       setNotFound([TABLES.BULK_REPORT])
  //     } else {
  //       setNotFound([])
  //       setData(getClosedBulk)
  //       setSelectedId(getClosedBulk[0]?.requestID)
  //       setControls(rest)
  //     }
  //   } else {
  //     setData([])
  //   }
  // }

  const getData = async (data) => {
    // const token = localStorage.getItem('token')
    const response = await MedicalBulkReport(setLoading, showToast, {
      ...handleControls,
      ...(data?.startDate && { fromDate: data?.startDate }),
      ...(data?.endDate && { toDate: data?.endDate }),
      ...(data?.division && { tpaName: data?.division }),
    })

    // Handle the response data
    if (response) {
      const { data, pagination } = response
      const { total, per_page, current_page, last_page } = pagination
      if (data.length === 0) {
        setNotFound([TABLES.BULK_REPORT])
        setData([])
        setControls({
          total,
          per_page,
          current_page,
          last_page,
        })
      } else {
        setNotFound([])
        setData(data)
        setSelectedId(data[0]?.requestID)
        setControls({
          total,
          per_page,
          current_page,
          last_page,
        })
      }
    } else {
      setData([])
    }
  }

  const getModifiedData = () => {
    setData([])
    setHandleControls(defaultControls)
  }

  useEffect(() => {
    getModifiedData()
  }, [])

  useEffect(() => {
    const a = getValues('startDate')
    const b = getValues('endDate')
    const c = getValues('division')
    console.log({ a })
    getData({
      ...data,
      startDate: a,
      endDate: b,
      division: c,
    })
  }, [handleControls])

  const startDateWatch = watch('startDate')

  const headCells: HeadCell[] = [
    {
      id: 'requestID',
      label: 'Request Id',
      isSort: false,
      width: 60,
      type: 'checkBox',
      isCheck: true,
    },
    {
      id: 'uniqueId',
      label: 'Unique Id',
      isSort: false,
      width: 80,
    },
    {
      id: 'proposalNo',
      label: 'Proposal No',
      isSort: false,
      width: 80,
    },

    {
      id: 'insured',
      label: 'Insured',
      isSort: false,
      width: 80,
    },
    {
      id: 'insurerDivisionName',
      label: 'Division',
      isSort: false,
      width: 80,
    },
    {
      id: 'apptDateTime',
      label: 'Appointment Date',
      isSort: false,
      width: 80,
    },
    // {
    //   id: 'apptDateTime',
    //   label: 'Appointment Time',
    //   isSort: false,
    //   width: 80,
    //   render: (row: any) => console.log({ row }),
    // },
    {
      id: 'closedDate',
      label: 'Closer Date',
      isSort: false,
      width: 80,
      type: 'dateTime',
    },
  ]

  const radios = [
    {
      value: 'TUW',
      name: 'TUW',
    },
    {
      value: 'PPHC',
      name: 'PPHC',
    },
  ]

  const requestDetails = selectedRows.map((row) => ({
    RequestID: String(row.requestID),
    PdfUrl: row.pdf,
    InsurerDivisionName: row.insurerDivisionName,
    ProposalNo: row?.proposalNo,
    Insured: row?.insured,
  }))

  const requestBody = {
    encryptedData: encryptDetails(JSON.stringify(requestDetails), VITE_APP_SECRET_KEY),
  }
  const handleDownload = async () => {
    const a = await axiosInstance.post(MEDICAL_DETAILS.getMedicalBulkReportZip, requestBody)
    if (a.data !== '') {
      const content = a?.data.match(/https?:\/\/[^\s]+/)[0]
      const link = document.createElement('a')
      link.href = content
      link.download = `${new Date()} bulk_download.zip`
      link.click()
    }
  }

  const handleDownLoadAudio = async (item) => {
    const requestDetailsAudio = {
      RequestID: String(item.requestID),
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

  return (
    <>
      <Box>
        {/* <div className='flex justify-between'>
          <div>
            <h1 className='font-medium text-2xl pt-5 pb-5'>Bulk Report</h1>
          </div>
        </div> */}
        <div className='shadow-[0_4px_8px_rgba(0,0,0,0.25)] rounded-md'>
          <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div className='flex justify-between items-center p-3 bg-white-main rounded-t-md'>
              <div className='flex justify-around items-center space-x-2 p-3'>
                <DateTimeInput
                  clearErrors={clearErrors}
                  control={control}
                  handleChange={() => {}}
                  label='From Date'
                  name='startDate'
                  setError={setError}
                  validation={dateSelectValidation('From Date', true)}
                  sx={{ minWidth: '250px' }}
                  showClearButton={true}
                  // minDate={startOfMonth(new Date())} // Start of the current month
                  // maxDate={endOfMonth(new Date())}
                  minDate={startOfYear(new Date(2024, 0, 1))}
                />
                <DateTimeInput
                  clearErrors={clearErrors}
                  control={control}
                  handleChange={() => {}}
                  label='To Date'
                  name='endDate'
                  setError={setError}
                  validation={dateSelectValidation('To Date', true)}
                  sx={{ minWidth: '250px' }}
                  // minDate={new Date(startDateWatch) || null} // Start date
                  // maxDate={
                  //   new Date(
                  //     new Date(startDateWatch).setDate(new Date(startDateWatch).getDate() + 1),
                  //   ) || null
                  // } // One day after start date
                  minDate={new Date(startDateWatch) || null}
                  showClearButton={true}
                />
              </div>
              <RadioInput name='division' label='Division' control={control} radios={radios} />
              <div className='h-[10%] text-center flex justify-center p-3'>
                <Button color='mBlue' sx={{ color: theme.palette.mWhite.main }} type='submit'>
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
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
            actions={[ACTIONS_TABLE.BULK_REPORT, ACTIONS_TABLE.BULK_REPORT_PLAY]}
            tableHeading={{
              tableId: TABLES.BULK_REPORT,
              tableName: 'Case',
            }}
            notFound={notFound.includes(TABLES.BULK_REPORT)}
            btnTxtArray={[{ btnType: HEADER_BTN?.PDF_DOWNLOAD, btnText: `Export PDF` }]}
            isTableWithOutAction={false}
            redirectPath={``}
            showSearch={false}
            showPagination={true}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isTableHeadWithCheckBox={true}
            handleDownload={handleDownload}
            DownLoadAudio={(item) => handleDownLoadAudio(item)}
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
                // maxWidth='xl'
                dialogStyleProps={{
                  minWidth: 450,
                }}
                type={undefined}
              >
                <CustomAudioPlayer audioSource={entity?.audio} />
              </CustomDialog>
            </>
          )}
        </div>
      </Box>
    </>
  )
}

export default BulkReport
