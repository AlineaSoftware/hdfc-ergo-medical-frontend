import { Box, Button } from '@mui/material'
import Table from '@/components/Table'
import {
  ACTIONS_TABLE,
  Controls,
  HandleControls,
  HeadCell,
  SearchDDL,
  TABLE_STATES,
  TableStates,
} from '@/types/common'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { InsuranceDivisionEnum, limitOfPage, TABLES } from 'src/utils/constants'
import { useNotFound } from '@/context/NotFound'
import { theme } from 'src/context/ThemeProvider'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TxtInput from 'src/components/TxtInput'
import { DateInput } from 'src/components/DateInput'
import TimeInput from 'src/components/TimeInput'
import SelectInput from 'src/components/SelectInput'
import CustomDialog from 'src/components/Dialog-custom'
import {
  dateAndTimeSelectValidation,
  dateSelectValidation,
  searchSelectValidation,
  txtFieldValidation,
} from 'src/utils/form.validation'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { getAllDetails, getSalesList, insertDetails, pinCodeAPI } from 'src/lib/salesDetails'
import { addDays, addHours, format, setHours, setMinutes } from 'date-fns'
import { useAuth } from '@/context/AuthContext'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
  setSelectedId: Dispatch<SetStateAction<number>>
  selectedId: number
  data: any
  dataset: any
  controls: any
}
const SalesTeamData = ({
  handleOpen,
  setType,
  open,
  type,
  handleClose,
  setSelectedId,
  selectedId,
  data,
  dataset,
  controls,
}: Props) => {
  const defaultControls = {
    page: 1,
    per_page: limitOfPage,
  }

  const [entity, setEntity] = useState<any | undefined>()

  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const [selectedDC, setSelectedDC] = useState('')
  const [pincode, setPincode] = useState('')
  const [dcOptions, setDcOptions] = useState([])
  const { setNotFound, notFound } = useNotFound()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const salesUser = JSON.parse(localStorage.getItem('sales'))
  const [savedDCName, setSavedDCName] = useState('')

  // console.log({ dataset })
  const nav = useNavigate()

  const { control, handleSubmit, setValue, clearErrors, setError, watch, getValues, reset } =
    useForm({
      defaultValues: {
        loginValue: '',
        AppointmentDate: '',
      },
    })

  // const getAllData = async (item: any) => {
  //   console.log({ item })
  //   const response = await getAllDetails(setLoading, showToast, item)

  //   if (response) {
  //     const { ...rest } = response
  //     if (!response) {
  //       setNotFound([TABLES.SALES_CHECK])
  //     } else {
  //       setNotFound([])
  //       setDataset(response)
  //       setControls(rest)
  //     }
  //   } else {
  //     setDataset([])
  //   }
  // }

  // const getUserData = async () => {
  //   const loginValue = salesUser?.validProposalNumber
  //   const response = await getSalesList(setLoading, showToast)

  //   if (response) {
  //     const { data, ...rest } = response
  //     if (data?.length === 0) {
  //       setNotFound([TABLES.SALES_CHECK])
  //     } else {
  //       setNotFound([])
  //       setData(data)
  //       setSelectedId(data[0]?._id)
  //       setControls(rest)
  //       if (data.length > 0) {
  //         await getAllData(data[0]?._id)
  //       }
  //     }
  //   } else {
  //     setData([])
  //   }
  // }

  // useEffect(() => {
  //   getUserData()
  // }, [])

  // useEffect(() => {
  //   if (selectedId !== 0 && data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC) {
  //     getAllData(selectedId)
  //   }
  // }, [selectedId])

  const getPincode = async (pincode) => {
    const response = await pinCodeAPI(setLoading, showToast, pincode)
    if (response) {
      const { getDCListName } = response
      if (getDCListName.length === 0) {
        setDcOptions([])
      } else {
        setDcOptions(getDCListName.map((dc) => ({ _id: dc.dcId, label: dc.dcName })))
      }
    } else {
      setPincode('')
      setDcOptions([])
    }
  }

  useEffect(() => {
    if (pincode.length === 6) {
      getPincode(pincode)
    } else {
      setDcOptions([])
    }
  }, [pincode])

  const handlePincodeChange = (value) => {
    setPincode(value) // Update pincode state
  }

  const onPartialSaveDetails: SubmitHandler<any> = async (data) => {
    if (!entity?.requestID) {
      showToast(
        'error',
        'Request ID is missing. Please ensure all fields are filled out correctly.',
      )
      return
    }

    const formData = {
      requestID: entity?.requestID,
      AppointmentDate: new Date(data?.AppointmentDate).toLocaleDateString('en-CA'),
      appointmentTime: format(new Date(data?.appointmentTime), 'HH:mm'),
      agentName: data?.agentName,
      agentMobileNumber: data?.agentMobileNumber,
      language: data?.language?.label || '',
      dcName: data?.DcName?.label || '',
      dcPincode: data?.dcPincode || '',
    }

    console.log(formData)

    // const response = await insertDetails(setLoading, showToast, formData)

    // if (response?.success) {
    //   showToast('success', 'Details inserted successfully!')
    //   handleClose()
    //   reset()
    // } else {
    //   showToast('error', 'Failed to insert details. Please try again.')
    // }
  }

  const headCells_TeleMER: HeadCell[] = [
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
      width: 80,
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
      width: 80,
    },
    {
      id: 'apptDateTime',
      label: 'Appt Date',
      isSort: false,
      width: 150,
      type: 'date12hour',
    },
  ]

  const DC_Details_headCells_PPHC: HeadCell[] = [
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

  const handleRowClick = (row: any) => {
    setSelectedId(row?._id)
  }

  const staffType: SearchDDL[] = [
    { _id: '0', label: 'Hindi' },
    { _id: '1', label: 'English' },
    { _id: '2', label: 'Marathi' },
    { _id: '3', label: 'Gujarati' },
    { _id: '4', label: 'Malayalam' },
    { _id: '5', label: 'Telugu' },
    { _id: '6', label: 'Tamil' },
    { _id: '7', label: 'Urdu' },
    { _id: '8', label: 'Kannada' },
    { _id: '9', label: 'Marwari' },
    { _id: '10', label: 'Other' },
  ]

  const currentTime = new Date()
  const twoHoursLater = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000)
  const eightPm = setHours(setMinutes(new Date(), 0), 20)

  let minTime =
    twoHoursLater >= setHours(setMinutes(new Date(), 0), 8)
      ? twoHoursLater
      : setHours(setMinutes(new Date(), 0), 8)

  const maxTime = eightPm

  if (minTime > maxTime) {
    minTime = maxTime
  }

  const getMinMaxDatesForAppointments3pm = () => {
    const now = new Date()
    const today = new Date()
    const todayAt3PM = new Date() // Changed to 3 PM
    todayAt3PM.setHours(15, 0, 0, 0) // Set the time to 3 PM instead of 2 PM

    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 3)

    let minDate

    if (now < todayAt3PM) {
      // Compare with 3 PM
      minDate = todayAt3PM
    } else {
      minDate = new Date(today.getTime() + 86400000)
      minDate.setHours(15, 0, 0, 0) // Set to 3 PM here as well
    }

    return { minDate, maxDate }
  }

  const { minDate, maxDate } = getMinMaxDatesForAppointments3pm()

  const appointmentDate = new Date(watch('AppointmentDate'))

  // const disableTimeSlots = (time: Date) => {
  //   const now = new Date()

  //   const twoHoursFromNow = new Date(now.getTime() + 1 * 60 * 60 * 1000)

  //   if (time.getTime() < twoHoursFromNow.getTime()) {
  //     return true
  //   }

  //   const maxTime = new Date()
  //   maxTime.setHours(20, 0, 0, 0)
  //   if (time.getTime() > maxTime.getTime()) {
  //     return true
  //   }

  //   return false
  // }

  const disableTimeSlots = (time: Date) => {
    const now = new Date()

    const twoHoursFromNow = new Date(now.getTime() + 1 * 60 * 60 * 1000)

    // Check if the appointment date is not today
    const isNotToday =
      time.getDate() !== new Date(appointmentDate).getDate() ||
      time.getMonth() !== new Date(appointmentDate).getMonth() ||
      time.getFullYear() !== new Date(appointmentDate).getFullYear()

    // If appointment date is not today, allow time slots from 8 AM to 8 PM
    if (isNotToday) {
      const startOfDay = new Date(time)
      startOfDay.setHours(8, 0, 0, 0) // 8 AM
      const endOfDay = new Date(time)
      endOfDay.setHours(20, 0, 0, 0) // 8 PM

      // If the time is between 8 AM and 8 PM on a different day, don't disable it
      if (time >= startOfDay && time <= endOfDay) {
        return false
      }
    }

    // If time is less than 2 hours from now, disable it
    if (time.getTime() < twoHoursFromNow.getTime()) {
      return true
    }

    const maxTime = new Date()
    maxTime.setHours(20, 0, 0, 0) // 8 PM cutoff for today
    if (time.getTime() > maxTime.getTime()) {
      return true
    }

    return false
  }

  const getMinMaxDatesForAppointments = () => {
    const now = new Date()
    const today = new Date()
    const todayAt6PM = new Date() // Set time to 6 PM
    todayAt6PM.setHours(18, 0, 0, 0) // Set the time to 6 PM instead of 2 PM or 3 PM

    const maxDateAt6PM = new Date(today)
    maxDateAt6PM.setDate(today.getDate() + 3)

    let minDateAt6PM

    if (now < todayAt6PM) {
      // Compare with 6 PM
      minDateAt6PM = todayAt6PM
    } else {
      minDateAt6PM = new Date(today.getTime() + 86400000)
      minDateAt6PM.setHours(18, 0, 0, 0) // Set to 6 PM here as well
    }

    return { minDateAt6PM, maxDateAt6PM }
  }

  console.log(':: name >>', `${data?.find((x) => x._id === selectedId)?.proposalName}`)

  const { minDateAt6PM, maxDateAt6PM } = getMinMaxDatesForAppointments()
  const dynamicMinDate =
    data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC ? minDate : minDateAt6PM
  const { clearStorage } = useAuth()
  return (
    <Box>
      {/* <div className='flex justify-between items-center'>
        <h1 className='font-medium text-2xl pt-5 pb-5'>Dashboard</h1>
        <div className='text-center flex justify-center p-3'>
          <Button
            color='mBlue'
            sx={{ color: theme.palette.mWhite.main }}
            onClick={() => {
              localStorage.getItem('salesRedirect')
                ? (nav('/sales-login'), clearStorage())
                : 'window.history.go(-1)'
            }}
          >
            Back
          </Button>
        </div>
      </div> */}

      <div className='col-span-5'>
        <div className='pt-4'>
          <Table
            handleOpen={handleOpen}
            setType={setType}
            setEntity={setEntity}
            rows={data}
            headCells={headCells_TeleMER}
            controls={controls as Controls}
            handleControls={handleControls}
            headingInsured={`${data?.find((x) => x._id === selectedId)?.insured}`}
            setHandleControls={setHandleControls}
            actions={[ACTIONS_TABLE.SCHEDULE]}
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName: 'Case',
            }}
            notFound={notFound.includes(TABLES.NEW_REQUEST)}
            btnTxtArray={[]}
            onRowClick={handleRowClick}
            isTableWithOutAction={false}
            selectedId={selectedId}
            showSelectedRowBg={true}
          />
        </div>

        {data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC ? (
          <div className='pt-4'>
            <Table
              handleOpen={handleOpen}
              setType={setType}
              setEntity={setEntity}
              rows={dataset?.data}
              headCells={DC_Details_headCells_PPHC}
              controls={controls as Controls}
              handleControls={handleControls}
              setHandleControls={setHandleControls}
              actions={[]}
              tableHeading={{
                tableId: TABLES.NEW_REQUEST,
                tableName: `DC Details`,
              }}
              headingInsured={`${data?.find((x) => x._id === selectedId)?.proposalName}`}
              notFound={notFound.includes(TABLES.NEW_REQUEST)}
              btnTxtArray={[]}
              onRowClick={handleRowClick}
              isTableWithOutAction={true}
            />
          </div>
        ) : null}
      </div>

      {type === TABLE_STATES.SCHEDULE && (
        <>
          {data[0]?.insurerDivisionName === InsuranceDivisionEnum.TUW ? (
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
              <div className='flex flex-col gap-4 items-center justify-center'>
                <form
                  className='flex justify-center items-center gap-5 pt-3'
                  onSubmit={handleSubmit(onPartialSaveDetails)}
                >
                  <div className='grid grid-col-4 gap-3'>
                    <DateInput
                      clearErrors={clearErrors}
                      control={control}
                      handleChange={() => {}}
                      label='Appointment Date'
                      name='AppointmentDate'
                      setError={setError}
                      validation={dateSelectValidation('AppointmentDate', false)}
                      sx={{ minWidth: '250px' }}
                      showClearButton={false}
                      minDate={dynamicMinDate}
                      maxDate={maxDateAt6PM}
                    />
                    {watch('AppointmentDate') ? (
                      <>
                        <TimeInput
                          name='appointmentTime'
                          control={control}
                          label='Appointment Time'
                          setError={setError}
                          clearErrors={clearErrors}
                          validation={txtFieldValidation(true)}
                          minTime={setHours(setMinutes(new Date(), 0), 8)}
                          maxTime={setHours(setMinutes(new Date(), 0), 20)}
                          disabledTimeSlotValidator={disableTimeSlots}
                        />
                        <p className='text-orange-main text-xs'>
                          Appointments can only be booked 2 hours ahead and before 8 PM.
                        </p>
                      </>
                    ) : null}

                    <TxtInput
                      control={control}
                      name='agentName'
                      handleChange={() => {}}
                      placeholder='Agent Name'
                      label='Agent Name'
                      validation={txtFieldValidation(true, 'txtArea')}
                    />
                    <TxtInput
                      control={control}
                      name='agentMobileNumber'
                      handleChange={() => {}}
                      placeholder='Agent Mobile Number'
                      label='Agent Mobile Number'
                      validation={txtFieldValidation(true, 'PositiveNumbers')}
                    />
                    <SelectInput
                      clearErrors={clearErrors}
                      control={control}
                      label=' Language'
                      name='language'
                      options={staffType}
                      setError={setError}
                      setValue={setValue}
                      validation={searchSelectValidation('language', false)}
                      handleOnChange={(e: any) => {}}
                    />
                    <div className='flex justify-between gap-3 px-5'>
                      <Button
                        color='mBlue'
                        sx={{
                          minWidth: '120px',
                          maxWidth: '120px',
                          color: theme.palette.mWhite.main,
                        }}
                        type='submit'
                      >
                        Submit
                      </Button>
                      <Button
                        color='mWhite'
                        sx={{
                          minWidth: '120px',
                          maxWidth: '120px',
                          color: theme.palette.mBlack.main,
                        }}
                        onClick={() => {
                          handleClose()
                          reset()
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </CustomDialog>
          ) : data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC ? (
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
              <div className='flex flex-col gap-4 items-center justify-center'>
                <form
                  className='flex justify-center items-center gap-5 pt-3'
                  onSubmit={handleSubmit(onPartialSaveDetails)}
                >
                  <div className='grid grid-col-4 gap-3'>
                    <Controller
                      control={control}
                      name={'loginValue'}
                      render={({ field: { onChange, value } }) => (
                        <TxtInput
                          placeholder='Pincode'
                          name='dcPincode'
                          control={control}
                          handleChange={(val) => {
                            setPincode(val)
                            onChange(val)
                            setDcOptions([])
                          }}
                          validation={txtFieldValidation(true, 'PositiveNumbers')}
                          isDisabled={false}
                          sx={{}}
                          label='Pincode'
                        />
                      )}
                    />
                    {pincode.length === 6 && dcOptions.length > 0 && (
                      <SelectInput
                        options={dcOptions}
                        name='DcName'
                        control={control}
                        label='DC Name'
                        setValue={setValue}
                        setError={setError}
                        clearErrors={clearErrors}
                        validation={''}
                        handleChange={(selectedOption) => {
                          setSelectedDC(selectedOption.label)
                        }}
                        onBlur={(selectedValue) => {
                          if (selectedValue) {
                            setSavedDCName(selectedValue.label)
                          }
                        }}
                        sx={{}}
                      />
                    )}
                    <DateInput
                      clearErrors={clearErrors}
                      control={control}
                      handleChange={() => {}}
                      label='Appointment Date'
                      name='AppointmentDate'
                      setError={setError}
                      validation={dateSelectValidation('AppointmentDate', false)}
                      sx={{ minWidth: '250px' }}
                      showClearButton={false}
                      minDate={dynamicMinDate}
                      maxDate={maxDate}
                    />
                    <TimeInput
                      name='appointmentTime'
                      control={control}
                      label='Appointment Time'
                      setError={setError}
                      clearErrors={clearErrors}
                      validation={true}
                      minTime={setHours(setMinutes(new Date(), 0), 8)}
                      maxTime={setHours(setMinutes(new Date(), 0), 20)}
                    />
                    <TxtInput
                      control={control}
                      name='agentName'
                      handleChange={() => {}}
                      placeholder='Agent Name'
                      label='Agent Name'
                      validation={txtFieldValidation(true, 'txtArea')}
                    />
                    <TxtInput
                      control={control}
                      name='agentMobileNumber'
                      handleChange={() => {}}
                      placeholder='Agent Mobile Number'
                      label='Agent Mobile Number'
                      validation={txtFieldValidation(true, 'PositiveNumbers')}
                    />
                    <div className='flex justify-between gap-3 px-5'>
                      <Button
                        color='mBlue'
                        sx={{
                          minWidth: '120px',
                          maxWidth: '120px',
                          color: theme.palette.mWhite.main,
                        }}
                        type='submit'
                      >
                        Submit
                      </Button>
                      <Button
                        color='mWhite'
                        sx={{
                          minWidth: '120px',
                          maxWidth: '120px',
                          color: theme.palette.mBlack.main,
                        }}
                        onClick={() => {
                          handleClose()
                          reset()
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </CustomDialog>
          ) : null}
        </>
      )}
    </Box>
  )
}

export default SalesTeamData
