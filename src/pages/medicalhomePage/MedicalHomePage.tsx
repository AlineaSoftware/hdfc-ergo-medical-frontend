import React from 'react'
import homePageData from 'src/data/homeData'
import { Box, Button, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import Table from '@/components/Table'
import { Controls, HandleControls, HeadCell, TABLE_STATES, TableStates } from '@/types/common'
import { useNotFound } from '@/context/NotFound'
import { EApprovalStatus, EUserRole, limitOfPage, TABLES } from '@/utils/constants'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { startOfMonth, startOfYear } from 'date-fns'
import { getAllMedicalUserDetails } from 'src/lib/medicalDetails'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const MedicalHomePage = ({ handleOpen, setType, open, type, handleClose }: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()

  //default controls
  const defaultControls = {
    search: '',
    currentPage: 1,
    limitPerPage: limitOfPage,
    sortParam: '',
    sortOrder: -1,
  }

  // Record and Control States
  const [data, setData] = useState<any[]>(null)
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState({})
  const [handleControls, setHandleControls] = useState<any>(defaultControls)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract query parameters for startDate, endDate, and division from the URL
  const startDateFromUrl = searchParams.get('startDate')
  const endDateFromUrl = searchParams.get('endDate')
  const divisionFromUrl = searchParams.get('division')

  const { control, handleSubmit, setValue, clearErrors, setError, watch, getValues } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      division: '',
    },
  })

  // Set the form fields based on URL parameters
  useEffect(() => {
    if (startDateFromUrl) setValue('startDate', startDateFromUrl)
    if (endDateFromUrl) setValue('endDate', endDateFromUrl)
    if (divisionFromUrl) setValue('division', divisionFromUrl)
  }, [startDateFromUrl, endDateFromUrl, divisionFromUrl, setValue])

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    const { startDate, endDate, division } = data
    setSearchParams({ startDate, endDate, division })
    getData(data)
  }

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString('en-CA')
      .replace(/-/g, '/')
      .split('/')
      .reverse()
      .join('/')
  }

  const getData = async (data) => {
    const token = localStorage.getItem('token')
    const response = await getAllMedicalUserDetails(setLoading, showToast, setNotFound, notFound, {
      ...handleControls,
      startDate: data?.startDate ? formatDate(data.startDate) : '',
      endDate: data?.endDate ? formatDate(data.endDate) : '',
      division: data?.division ?? '',
      token: token,
    })

    if (response) {
      const { getMedicalDashboardCasesData, ...rest } = response
      if (getMedicalDashboardCasesData.length === 0) {
        setNotFound([TABLES.MEDICAL_CHECK])
      } else {
        setNotFound([])
        setData(getMedicalDashboardCasesData)
        setControls(rest)
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
    getData({
      ...data,
      startDate: a,
      endDate: b,
      division: c,
    })
  }, [handleControls])

  // Set the form fields based on URL parameters
  useEffect(() => {
    if (startDateFromUrl) setValue('startDate', startDateFromUrl)
    if (endDateFromUrl) setValue('endDate', endDateFromUrl)
    if (divisionFromUrl) setValue('division', divisionFromUrl)
  }, [startDateFromUrl, endDateFromUrl, divisionFromUrl, setValue])

  const headCells: HeadCell[] = [
    {
      id: 'requesttime',
      label: 'Request Time',
      isSort: false,
      width: 80,
      type: 'formatDateDDMMYYYYTIMEFunction',
    },
    {
      id: 'requestId',
      label: 'Request Id',
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
      id: 'uniqueId',
      label: 'Unique Id',
      isSort: false,
      width: 80,
    },
    {
      id: 'proposeName',
      label: 'Proposer Name',
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
      id: 'division',
      label: 'Division',
      isSort: false,
      width: 80,
    },
    {
      id: 'test',
      label: 'Tests',
      isSort: false,
      width: 80,
    },
    {
      id: 'currentStatus',
      label: 'Current Status',
      isSort: false,
      width: 80,
    },
    {
      id: 'mobileNo',
      label: 'Mobile No / Alternative No',
      isSort: false,
      width: 80,
      type: 'maskingMobileNo',
    },
    {
      id: 'tat',
      label: 'TAT',
      isSort: false,
      width: 50,
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
  const startDateWatch = watch('startDate')
  // console.log(startDateWatch)
  return (
    <>
      <Box>
        <div className='flex justify-between'>
          <div>
            <h1 className='font-medium text-2xl pt-5 pb-5'>Dashboard</h1>
          </div>
        </div>
        <div className='shadow-[0_4px_8px_rgba(0,0,0,0.25)] rounded-md'>
          <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div>
              <div className='flex justify-around items-center  p-3'>
                <DateInput
                  clearErrors={clearErrors}
                  control={control}
                  handleChange={() => {}}
                  label='From Date'
                  name='startDate'
                  setError={setError}
                  validation={dateSelectValidation('From Date', true)}
                  sx={{ minWidth: '350px' }}
                  showClearButton={false}
                  minDate={startOfYear(new Date(2024, 0, 1))}
                />
                <DateInput
                  clearErrors={clearErrors}
                  control={control}
                  handleChange={() => {}}
                  label='To Date'
                  name='endDate'
                  setError={setError}
                  validation={dateSelectValidation('To Date', true)}
                  sx={{ minWidth: '350px' }}
                  minDate={new Date(startDateWatch) || null}
                  showClearButton={false}
                />
                <RadioInput name='division' label='Division' control={control} radios={radios} />
              </div>
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
            actions={[]}
            tableHeading={{
              tableId: TABLES.MEDICAL_CHECK,
              tableName: 'Case',
            }}
            notFound={notFound.includes(TABLES.MEDICAL_CHECK)}
            btnTxtArray={[]}
            isTableWithOutAction={true}
            redirectPath={`/dashboard/medicalDetailsPage?startDate=${startDateFromUrl}&endDate=${endDateFromUrl}&division=${divisionFromUrl}}`}
            showSearch={true}
            showPagination={true}
          />
        </div>
      </Box>
    </>
  )
}

export default MedicalHomePage
