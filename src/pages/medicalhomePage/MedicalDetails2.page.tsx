import HomeDataOfCase from 'src/data/homeDataDetails'
import { Box, Button, DialogTitle } from '@mui/material'
import Table from '@/components/Table'
import {
  ACTIONS_TABLE,
  Controls,
  HandleControls,
  HeadCell,
  maskEmail,
  TABLE_STATES,
  TableStates,
} from '@/types/common'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { formatCurrency, formatDateDDMMYY, limitOfPage, TABLES } from 'src/utils/constants'
import { useNotFound } from '@/context/NotFound'
import DownloadIcon from '@mui/icons-material/Download'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { useLocation } from 'react-router-dom'
import { useLoading } from 'src/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import {
  callDispositionsForMedicalDetails,
  callForMedicalDetails,
  getMedicalUserInsuredDetails,
} from 'src/lib/medicalDetails'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
  selectedId: number
}
const MedicalDetails2Page = ({
  handleOpen,
  setType,
  open,
  type,
  handleClose,
  selectedId,
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
  const [controls1, setControls1] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const { setNotFound, notFound } = useNotFound()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [callData, setCallData] = useState(null)
  const [dataDesposition, setDataDesposition] = useState(null)
  const [handleControls1, setHandleControls1] = useState<HandleControls>(defaultControls)

  const getUserInsuredData = async () => {
    const token = localStorage.getItem('token')
    const response = await getMedicalUserInsuredDetails(setLoading, showToast, {
      requestID: String(selectedId),
      token: token,
    })

    if (response) {
      const { getInsurerMedicalList, ...rest } = response
      if (getInsurerMedicalList?.length === 0) {
        setNotFound([TABLES.SALES_CHECK])
      } else {
        setNotFound([])
        setData(getInsurerMedicalList)
        setControls(rest)
      }
    } else {
      setData([])
    }
  }

  useEffect(() => {
    if (selectedId !== 0) {
      getUserInsuredData()
    }
  }, [selectedId])

  const headCells: HeadCell[] = [
    {
      id: 'status',
      label: 'Status',
      isSort: false,
      width: 50,
    },
    {
      id: 'statusDate',
      label: 'Status date',
      isSort: false,
      width: 200,
      type: 'date12hour',
    },
    // {
    //   id: 'comment',
    //   label: 'Comment',
    //   isSort: false,
    //   width: 150,
    // },
    {
      id: 'tat',
      label: 'TAT',
      isSort: false,
      width: 30,
    },
  ]

  // const callDispositionHeadCells: HeadCell[] = [
  //   {
  //     id: 'disposition',
  //     label: 'Disposition',
  //     isSort: false,
  //     width: 50,
  //   },
  //   {
  //     id: 'comment',
  //     label: 'Comment',
  //     isSort: false,
  //     width: 200,
  //   },

  //   {
  //     id: 'callbackDate',
  //     label: 'Call Back Date',
  //     isSort: false,
  //     width: 150,
  //   },
  // ]

  const callDispositionHeadCells: HeadCell[] = [
    {
      id: 'disposition',
      label: 'Disposition',
      isSort: false,
      width: 50,
    },
    {
      id: 'startTime',
      label: 'Start Date',
      isSort: false,
      width: 200,
      type: 'date12hour',
    },
    {
      id: 'endTime',
      label: 'End Date',
      isSort: false,
      width: 200,
      type: 'date12hour',
    },
    {
      id: 'callDuration',
      label: 'Duration',
      isSort: false,
      width: 200,
    },
    {
      id: 'callDate',
      label: 'Call Back',
      isSort: false,
      width: 150,
    },
  ]

  const getCallMedicalDetails = async (item: any) => {
    const token = localStorage.getItem('token')
    const response = await callForMedicalDetails(setLoading, showToast, setNotFound, notFound, {
      ...handleControls,
      requestID: String(selectedId),
      token: token,
    })
    if (response) {
      const { getCallList, ...rest } = response
      if (getCallList.length === 0) {
        setNotFound([TABLES.SALES_CHECK])
      } else {
        setNotFound([])
        setCallData(getCallList)
        setControls(rest)
      }
    } else {
      setCallData([])
    }
  }

  useEffect(() => {
    if (selectedId !== 0) {
      getCallMedicalDetails({
        requestID: String(selectedId),
      })
    }
  }, [selectedId, handleControls])

  const getCallDispositionsMedical = async () => {
    const token = localStorage.getItem('token')
    const response = await callDispositionsForMedicalDetails(
      setLoading,
      showToast,
      setNotFound,
      notFound,
      {
        ...handleControls1,
        requestID: String(selectedId),
        token: token,
      },
    )

    if (response) {
      const { getCallDispositionList, ...rest } = response

      // Add a null check for getCallDispositionList before accessing length
      if (getCallDispositionList && getCallDispositionList.length === 0) {
        setNotFound([TABLES.DISPOSITION_DURATION])
      } else if (getCallDispositionList) {
        setNotFound([])
        setDataDesposition(getCallDispositionList)
        setControls1(rest)
      } else {
        // Handle case where getCallDispositionList is null or undefined
        setDataDesposition([])
      }
    } else {
      setDataDesposition([])
    }
  }

  useEffect(() => {
    if (selectedId !== 0) {
      getCallDispositionsMedical()
    }
  }, [selectedId, handleControls1])

  return (
    <Box>
      {data
        ?.filter((x) => x.requestID === selectedId)
        ?.map((x, i) => (
          <div className='grid grid-cols-5 gap-4' key={Math.random()}>
            <div className='row-span-4 row-start-2  shadow-md mb-[10px]  flex justify-between items-center flex-col'>
              <div className='flex justify-center items-center h-[41px] bg-lightGray-light  w-full rounded-md'>
                <div className='w-full flex justify-around'>
                  <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>
                    Insured
                  </h1>
                  <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>
                    {x?.name}
                  </h1>
                </div>
              </div>
              <p className='text-center text-base font-bold text-gray-700 mb-2'></p>

              <div className='flex w-72 flex-col gap-3  text-gray-600 sm:text-sm pt-1'>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Gender
                  </div>
                  <div className='w-[50%] break-words pl-2 sm:text-xs'>{x?.gender}</div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Age
                  </div>
                  <div className='w-[50%] break-words pl-2 sm:text-xs'>
                    {x?.age ? `${x.age} Years` : 'N/A'}
                  </div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    DOB
                  </div>
                  <div className='w-[50%] break-words pl-2 sm:text-xs'>
                    {x?.dob ? formatDateDDMMYY(x?.dob) : ''}
                  </div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Contact
                  </div>
                  <div className='w-[50%] break-words pl-2 sm:text-xs'>{x?.userMobile}</div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Email
                  </div>
                  <div className=' w-[50%] break-words pl-2 sm:text-xs md:text-xs'>{x?.email}</div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Product
                  </div>
                  <div className='w-[50%] pl-2 sm:text-xs'>{x?.product}</div>
                </div>

                <div className='flex justify-center'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs whitespace-nowrap'>
                    Sum Insured
                  </div>
                  <div className='w-[50%] break-words pl-2 sm:text-xs'>
                    {x?.sumInsured ? formatCurrency(x?.sumInsured) : ''}
                  </div>
                </div>
              </div>

              <div className='mt-4 bg-gray-100 p-2  text-center text-xs text-gray-600'>
                <div className='font-semibold  sm:text-xs'>Address</div>
                <div className='pt-2 sm:text-xs break-all'>{x?.address}</div>
              </div>

              <div className='flex justify-center items-center h-[41px] bg-lightGray-light  w-full '>
                <div className='w-full flex justify-around'>
                  <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>Agent</h1>
                  <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>
                    {x?.userName}
                  </h1>
                </div>
              </div>

              <div className='flex w-64 flex-col gap-3 pt-2 pb-2 text-gray-600 sm:text-sm'>
                <div className='flex justify-end'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Contact
                  </div>
                  <div className='w-[70%] break-words pl-2 sm:text-xs'>{x.mobile}</div>
                </div>
                <div className='flex justify-end'>
                  <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                    Email
                  </div>
                  <div className='w-[70%] break-words pl-2 sm:text-xs md:text-xs'>
                    {x?.insuredEmail}
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-4 row-span-4 col-start-2 row-start-2'>
              <Table
                handleOpen={handleOpen}
                setType={setType}
                setEntity={setEntity}
                rows={callData}
                headCells={headCells}
                controls={controls as Controls}
                handleControls={handleControls}
                setHandleControls={setHandleControls}
                actions={[]}
                tableHeading={{
                  tableId: TABLES.NEW_REQUEST,
                  tableName: 'Tele MER Case History',
                }}
                notFound={notFound.includes(TABLES.NEW_REQUEST)}
                btnTxtArray={[]}
                isTableWithOutAction={true}
                showPagination={true}
              />
              <Table
                handleOpen={handleOpen}
                setType={setType}
                setEntity={setEntity}
                rows={dataDesposition}
                headCells={callDispositionHeadCells}
                controls={controls1 as Controls}
                handleControls={handleControls1}
                setHandleControls={setHandleControls1}
                actions={[]}
                tableHeading={{
                  tableId: TABLES.MEDICAL_CHECK,
                  tableName: `Call Disposition`,
                }}
                notFound={notFound.includes(TABLES.MEDICAL_CHECK)}
                btnTxtArray={[]}
                isTableWithOutAction={true}
                showPagination={true}
              />
            </div>
          </div>
        ))}
    </Box>
  )
}

export default MedicalDetails2Page
