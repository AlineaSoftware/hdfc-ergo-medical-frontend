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
import { differenceInDays, startOfMonth, startOfYear } from 'date-fns'
import { getAllMedicalUserDetails, getDetailsOfMsi } from 'src/lib/medicalDetails'
import { downloadExcel } from 'src/lib/common'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
}

const Msi = ({ handleOpen, setType, open, type, handleClose }: Props) => {
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
  const [handleControls, setHandleControls] = useState<any>(defaultControls)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const { control, handleSubmit, setValue, clearErrors, setError, watch, getValues } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      division: 'TUW',
    },
  })
  const [exportEnabled, setExportEnabled] = useState(true)
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const division = watch('division')

  const formatDate = (date) => {
    const localDate = new Date(date)
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
    return localDate.toISOString().split('T')[0]
  }

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    try {
      const res = await downloadExcel(setLoading, showToast, {
        fromDate: startDate,
        toDate: endDate,
        tpaName: division,
      })
      if (res) {
        alert('Excel file downloaded successfully!')
      }
    } catch (error) {
      return {}
    }
  }

  const getModifiedData = () => {
    setData([])
    setHandleControls(defaultControls)
  }

  useEffect(() => {
    getModifiedData()
  }, [])

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

  return (
    <>
      <Box>
        <div className='flex justify-between'>
          <div>
            <h1 className='font-medium text-2xl pt-5 pb-5'>MIS</h1>
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
                  maxDate={new Date()}
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
                  // minDate={new Date(startDateWatch)}
                  maxDate={new Date()}
                  showClearButton={false}
                />
                <RadioInput name='division' label='Division' control={control} radios={radios} />
              </div>

              <div className='flex justify-center'>
                <div className='h-[10%] text-center flex justify-center p-3'>
                  <Button
                    color='mBlue'
                    sx={{ color: theme.palette.mWhite.main }}
                    onClick={() => setExportEnabled(false)}
                    disabled={!startDate || !endDate}
                  >
                    Search
                  </Button>
                </div>
                {/* <div className='h-[10%] text-center flex justify-center p-3'>
                  <Button
                    color='mBlue'
                    sx={{ color: theme.palette.mWhite.main }}
                    onClick={download}
                    disabled={data?.length > 0 ? false : true}
                  >
                    Export Excel
                  </Button>
                  <a href='https://api.life-connect.in/Reports/HDFCERGOPPHC.xlsb' download>
                    <Button color='mBlue' sx={{ color: theme.palette.mWhite.main }}>
                      Export Excel
                    </Button>
                  </a>
                </div> */}

                {/* {watch('division') === 'TUW' ? ( */}
                <div className='h-[10%] text-center flex justify-center p-3'>
                  <Button
                    color='mBlue'
                    sx={{ color: theme.palette.mWhite.main }}
                    type='submit'
                    disabled={exportEnabled}
                  >
                    Export Excel
                  </Button>
                </div>
                {/* ) : (
                  <div className='h-[10%] text-center flex justify-center p-3'>
                    <a href='https://api.life-connect.in/Reports/HDFCERGOPPHC.xlsb' download>
                      <Button color='mBlue' sx={{ color: theme.palette.mWhite.main }}>
                        Export Excel
                      </Button>
                    </a>
                  </div>
                )} */}
              </div>
            </div>
          </form>
        </div>
      </Box>
    </>
  )
}

export default Msi
