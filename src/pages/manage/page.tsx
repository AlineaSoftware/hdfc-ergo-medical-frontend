import { theme } from '@/context/ThemeProvider'
import { Button, Chip, DialogTitle, Divider, Switch } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { EApprovalStatus, EUserRole, limitOfPage, TABLES } from '@/utils/constants'
import {
  delistProvider,
  delistProviderForNetwork,
  modifyProvider,
  modifyProviderForNetwork,
  searchProviderForManage,
} from '@/lib/manage'
import { useState } from 'react'
import { useNotFound } from '@/context/NotFound'
import ConfirmPopUp from '@/components/ConfirmBox'
import { useAuth } from '@/context/AuthContext'
import CustomDialog from '@/components/Dialog-custom'
import _ from 'lodash'

type Props = {}

const arr = [
  {
    name: 'Vardaan Diagnosis',
    providerName: 163635,
    address: 'B-502, Gota, Ahemedabad, Gujrat, India',
    status: 'Delist',
    deActivated: ['HDFC', 'IPRU'],
    activated: ['Max Life', 'RS', 'SBI'],
  },
  {
    name: 'Krishna Pathology Lab',
    providerName: 163335,
    address: 'B-602, Sola, Ahemedabad, Gujrat, India',
    status: '',
    deActivated: ['HDFC', 'IPRU'],
    activated: ['SBI'],
  },
  {
    name: 'Ashirwad Hospitals',
    providerName: 183635,
    address: 'A-502, Naroda, Ahemedabad, Gujrat, India',
    status: 'Delist',
    deActivated: ['HDFC', 'IPRU'],
    activated: ['Max Life'],
  },
  {
    name: 'Shah Pathology Lab',
    providerName: 177635,
    address: 'B-555, Helifax, Ontirio, Cananda',
    status: '',
    deActivated: ['IPRU'],
    activated: ['Max Life', 'RS', 'SBI'],
  },
  {
    name: 'Bombay Laboratory',
    providerName: 163995,
    address: 'B-502, Jamnagar, Purvanchal, Gujrat, India',
    status: 'Delist',
    deActivated: ['HDFC', 'IPRU'],
    activated: ['Max Life', 'SBI'],
  },
]

const getKeysByValue = (obj, valueToFind) =>
  Object.entries(obj)
    .filter(([key, value]) => value === valueToFind)
    .map(([key]) => key)

const ManagePage = (props: Props) => {
  const nav = useNavigate()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()
  const { user } = useAuth()

  //default controls
  const defaultControls = {
    search: '',
    page: 1,
    per_page: 10,
  }

  // Record and Control States
  const [data, setData] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [showModify, setShowModify] = useState(false)
  const [searchData, setSearchData] = useState(null)
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState<any>({})
  const [handleControls, setHandleControls] = useState<any>(defaultControls)
  const [switchStates, setSwitchStates] = useState<any>([])

  const { control, handleSubmit, clearErrors, setError, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const getModifiedData = () => {
    setData([])
    setHandleControls(defaultControls)
  }

  const onSubmitHandle: SubmitHandler<any> = async (data) => {
    getModifiedData()
    setSearchData(data)
    const response = await searchProviderForManage(setLoading, showToast, setNotFound, notFound, {
      ...handleControls,
      search: data?.search,
    })
    if (response) {
      const { records, ...rest } = response
      if (records?.length === 0) {
        setNotFound([TABLES.MANAGE_SEARCH])
      } else {
        setNotFound([])
        setData(records)
        setControls(rest)
      }
    } else {
      setData([])
    }
  }

  const handleDelist = async (id: string) => {
    let res
    if (user?.role?.includes(EUserRole.Network)) {
      res = await delistProviderForNetwork(setLoading, showToast, id)
    } else {
      res = await delistProvider(setLoading, showToast, id)
    }
    if (res?.success) {
      setShow(false)
      await onSubmitHandle(searchData)
    }
  }

  const handleModify = async (id: string) => {
    let res
    if (user?.role?.includes(EUserRole.Network)) {
      res = await modifyProviderForNetwork(setLoading, showToast, id)
    } else {
      const insurerMap = _.keyBy(entity?.insurers, 'insurerId')
      const insurerStatusMap = _.mapValues(insurerMap, 'isActive')
      const differences = _.pickBy(insurerStatusMap, (value, key) => {
        return switchStates[key] !== undefined && switchStates[key] !== value
      })
      res = await modifyProvider(setLoading, showToast, {
        id: id,
        deactivateForInsurerIds: getKeysByValue(differences, false),
        activateForInsurerIds: getKeysByValue(differences, true),
      })
    }
    if (res?.success) {
      setShow(false)
      await onSubmitHandle(searchData)
    }
  }

  const handleSwitchChange = (insurerId: string, isChecked: boolean) => {
    setSwitchStates((prev) => ({
      ...prev,
      [insurerId]: isChecked,
    }))
  }

  const initializeSwitchStates = (insurers: any[]) => {
    const states = insurers.reduce(
      (acc, insurer) => {
        acc[insurer?.insurerId] = insurer?.isActive || false
        return acc
      },
      {} as Record<string, boolean>,
    )
    setSwitchStates(states)
  }

  return (
    <section>
      <div className='mt-5 mb-8'>
        <form
          onSubmit={handleSubmit(onSubmitHandle)}
          className='flex justify-center items-center gap-5 pt-3'
        >
          <div className='flex items-end justify-center gap-5'>
            <TxtInput
              control={control}
              name='search'
              handleChange={() => {}}
              placeholder='Enter Search'
              sx={{ minWidth: 300 }}
              label='Search'
              validation={txtFieldValidation(true)}
            />

            <div className='text-center flex flex-col'>
              <Button
                color='mBlue'
                sx={{
                  minWidth: '100%',
                  maxHeight: '35px',
                  minHeight: '35px',
                  color: theme.palette.mWhite.main,
                }}
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className='grid grid-cols-3 gap-5 w-full my-3'>
        {data?.length > 0 &&
          data?.map((x) => (
            <div
              className={`${x?.isDelist ? 'bg-white-main' : 'bg-white-main'} rounded-md min-h-20 z-10 shadow`}
            >
              <div className='flex justify-between items-center px-3 py-2 bg-lightGray-main'>
                <div className='flex flex-col '>
                  <div className='font-medium text-lg'>{x?.providerName}</div>
                  <span className='text-xs font-normal'>{x?.telephone}</span>
                </div>
                <span className='text-orange-main'>{x?.isDelist ? 'Delist' : ''}</span>
              </div>
              <Divider sx={{ borderWidth: '1px' }} />
              <div className='p-3'>
                <div>
                  {' '}
                  <span className='font-normal text-black-main'>Address : </span>
                  {x?.addressLineOne}, {x?.city}, {x?.state} - {x?.pincode}
                </div>
                <div className='mt-2 flex gap-2 items-center flex-wrap'>
                  {' '}
                  <span className='font-normal text-black-main'>Activated : </span>
                  {x?.insurers?.map((x) => {
                    if (x?.isActive) {
                      return <Chip label={x?.name} size='small' variant='outlined' />
                    }
                  })}
                </div>
                <div className='mt-2 mb-1 flex gap-2 items-center flex-wrap'>
                  {' '}
                  <span className='font-normal text-black-main'>Deactivated : </span>{' '}
                  {x?.insurers?.map((x) => {
                    if (!x?.isActive) {
                      return <Chip label={x?.name} size='small' variant='outlined' />
                    }
                  })}
                </div>
              </div>
              <Divider sx={{ borderWidth: '1px' }} />
              <div
                className={`${x?.isDelist ? 'bg-lightGray-main' : 'bg-white-main'} p-3 flex gap-5 items-center w-full justify-center`}
              >
                <Button
                  color='mBlue'
                  sx={{
                    minWidth: '80px',
                    maxWidth: '80px',
                    maxHeight: '35px',
                    minHeight: '35px',
                    color: theme.palette.mWhite.main,
                  }}
                  disabled={
                    x?.modifyRequest?.status === EApprovalStatus.Pending || x?.isDelist
                      ? true
                      : false
                  }
                  onClick={() => {
                    setShowModify(true)
                    setEntity(x)
                    initializeSwitchStates(x?.insurers || [])
                  }}
                >
                  Modify
                </Button>
                <Button
                  color='mWhite'
                  sx={{
                    minWidth: '80px',
                    maxWidth: '80px',
                    maxHeight: '35px',
                    minHeight: '35px',
                  }}
                  variant='contained'
                  disabled={
                    x?.delistRequest?.status === EApprovalStatus.Pending || x?.isDelist
                      ? true
                      : false
                  }
                  onClick={() => {
                    setShow(true)
                    setEntity(x)
                  }}
                >
                  Delist
                </Button>
              </div>
            </div>
          ))}
        {/* {data?.length > 0 && data?.length < controls?.total && (
          <div className='flex w-full justify-center items-center'>
            <span role='button' onClick={handleSeeMore}>
              See More...
            </span>
          </div>
        )} */}
      </div>
      {show && (
        <ConfirmPopUp
          setOpenPopUp={setShow}
          openPopUp={show}
          handleYes={() => handleDelist(entity?._id)}
        />
      )}
      {showModify && (
        <CustomDialog
          action={{ component: null, isAction: false }}
          handleClose={() => {
            setShowModify(false)
          }}
          open={showModify}
          header={{
            isHeader: true,
            component: <></>,
          }}
          maxWidth='xl'
          dialogStyleProps={{
            minWidth: 500,
          }}
          type={undefined}
        >
          <div className='flex flex-col gap-4 justify-center'>
            <div className='flex items-start justify-start'>
              <span className='text-lg font-black'>{entity?.providerName}</span>
            </div>
            <div>
              <table className='w-full divide-y-2 '>
                <thead>
                  <tr>
                    <th className='w-[70%] text-start font-semibold'>Name</th>
                    <th className='w-[30%] text-start font-semibold'>Action</th>
                  </tr>
                </thead>
                <tbody className='w-full divide-y'>
                  {entity?.insurers?.map((x) => (
                    <tr key={x?.id}>
                      <td className='text-sm font-normal w-[70%]'>{x?.name}</td>
                      <td className='text-sm font-normal w-[30%]'>
                        <Switch
                          key={x?.insurerId}
                          onChange={(e) => {
                            handleSwitchChange(x?.insurerId, e.currentTarget.checked)
                          }}
                          checked={switchStates[x?.insurerId] || false}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-center gap-5 px-5'>
              <Button
                color='mWhite'
                sx={{
                  minWidth: '120px',
                  maxWidth: '120px',
                }}
                onClick={() => {
                  setShowModify(false)
                }}
              >
                Cancel
              </Button>
              <Button
                color='mBlue'
                sx={{
                  minWidth: '120px',
                  maxWidth: '120px',
                  color: theme.palette.mWhite.main,
                }}
                onClick={() => handleModify(entity?._id)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </CustomDialog>
      )}
    </section>
  )
}

export default ManagePage
