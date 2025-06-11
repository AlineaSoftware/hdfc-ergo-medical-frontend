import { Box } from '@mui/material'
import Table from '@/components/Table'
import { Controls, HandleControls, HeadCell, TableStates } from '@/types/common'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { formatCurrency, InsuranceDivisionEnum, limitOfPage, TABLES } from 'src/utils/constants'
import { useNotFound } from '@/context/NotFound'
import {
  callDispositions,
  callDetails,
  getAllDetails,
  getSalesList,
  proposerStatus,
} from 'src/lib/salesDetails'
import { useLoading } from 'src/context/LoadingContext'
import { useToast } from '@/hooks/useToast'

type Props = {
  handleOpen: () => void
  setType: Dispatch<SetStateAction<any>>
  open: boolean
  type: TableStates
  handleClose: () => void
  selectedId: string
  setSelectedId: Dispatch<SetStateAction<string>>
  data: any
  dataset: any
  controls: any
}
const defaultControls = {
  search: '',
  page: 1,
  per_page: 10,
}

const SalesTeam2Data = ({
  handleOpen,
  setType,
  selectedId,
  setSelectedId,
  data,
  dataset,
  controls,
}: Props) => {
  const [entity, setEntity] = useState<any | undefined>()
  const [controls1, setControls1] = useState({})
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultControls)
  const [handleControls1, setHandleControls1] = useState<HandleControls>(defaultControls)
  const { setNotFound, notFound } = useNotFound()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [dataDesposition, setDataDesposition] = useState(null)
  const [statusDetails, setStatusDetails] = useState(null)
  const salesUser = JSON.parse(localStorage.getItem('sales'))

  const headCells: HeadCell[] = [
    {
      id: 'newStatus',
      label: 'Status',
      isSort: false,
      width: 50,
    },
    {
      id: 'changedAt',
      label: 'Status date',
      isSort: false,
      width: 200,
      type: 'dateTime',
    },
    {
      id: 'tat',
      label: 'TAT',
      isSort: false,
      width: 30,
    },
  ]

  const callDispositionHeadCells: any[] = [
    {
      id: 'name',
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

  const callDispositionHeadCellsPPHC: HeadCell[] = [
    {
      id: 'name',
      label: 'Disposition',
      isSort: false,
      width: 50,
    },
    {
      id: 'changedAt',
      label: 'Call Date',
      isSort: false,
      width: 50,
      type: 'dateTime',
    },
    {
      id: 'comment',
      label: 'Comment',
      isSort: false,
      width: 200,
    },
    {
      id: 'callbackDatePPHC',
      label: 'Call Back',
      isSort: false,
      width: 150,
    },
  ]

  const genderMap = {
    m: 'male',
    f: 'female',
    male: 'male',
    female: 'female',
  }

  // const getCallDispositions = async () => {
  //   const response = await callDispositions(setLoading, showToast, selectedId, handleControls)
  //   if (response?.data) {
  //     const callDisposition = response?.data?.dispositionId
  //       ?.filter((call) => call.id)
  //       .map((call) => call.id)
  //     console.log({ callDisposition })
  //     setDataDesposition(callDisposition)
  //   } else {
  //     setDataDesposition([])
  //   }
  // }

  // useEffect(() => {
  //   if (selectedId !== null) {
  //     getCallDispositions()
  //   }
  // }, [selectedId, handleControls1])

  // const getStatusDetails = async (item: any) => {
  //   const response = await proposerStatus(setLoading, showToast, selectedId, handleControls)
  //   if (response) {
  //     setStatusDetails(response?.data)
  //   } else {
  //     setStatusDetails([])
  //   }
  // }

  // useEffect(() => {
  //   if (selectedId !== null) {
  //     getStatusDetails({
  //       requestID: String(selectedId),
  //     })
  //   }
  // }, [selectedId, handleControls])

  const getModifyData = () => {
    setHandleControls(defaultControls)
  }

  useEffect(() => {
    getModifyData()
  }, [])

  return (
    <Box>
      {/* {dataset?.getInsurerList
        ?.filter((x) => x.requestID === selectedId)
        .map((x) => ( */}
      <div className='grid grid-cols-5 gap-4'>
        <div className='row-span-4 row-start-2 shadow-md mb-[10px] rounded-md flex justify-between items-center flex-col'>
          <div className='flex justify-center items-center h-[41px] bg-lightGray-light  w-full rounded-md'>
            <div className='w-full flex justify-around'>
              <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>Insured</h1>
              <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>
                {dataset?.data?.insuredName}
              </h1>
            </div>
          </div>
          <p className='text-center text-base font-bold text-gray-700 mb-2'></p>

          <div className='flex w-72 flex-col gap-3  text-gray-600 sm:text-sm pt-1'>
            <div className='flex justify-end'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                Gender
              </div>
              <div className='w-[50%] break-words pl-2 sm:text-xs'>
                {genderMap[dataset?.data?.gender?.toLowerCase()]}
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>Age</div>
              <div className='w-[50%] break-words pl-2 sm:text-xs'>
                {dataset?.data?.age ? `${dataset?.data?.age} Years` : 'N/A'}
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                Product
              </div>
              <div className='w-[50%] pl-2 sm:text-xs'>{dataset?.data?.productName}</div>
            </div>
            <div className='flex justify-end'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs break-words'>
                Sum Insured
              </div>
              <div className='w-[50%] break-words pl-2 sm:text-xs'>
                {formatCurrency(dataset?.data?.sumInsured)}
              </div>
            </div>
          </div>

          <div className='mt-4 bg-gray-100 p-2  text-center text-xs text-gray-600'>
            <div className='font-semibold  sm:text-xs'>Address</div>
            <div className='pt-2 sm:text-xs md:text-xs break-all '>{dataset?.data?.address}</div>
          </div>

          <div className='flex justify-center items-center h-[41px] bg-lightGray-light   w-full '>
            <div className='w-full flex justify-around'>
              <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>Agent</h1>
              <h1 className='text-center sm:text-sm text-lg font-black text-gray-800'>
                {dataset?.data?.proposerName}
              </h1>
            </div>
          </div>

          <div className='flex w-72 flex-col gap-3 pt-2 pb-2 text-gray-600 sm:text-sm'>
            <div className='flex justify-end'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>
                Contact
              </div>
              <div className='w-[70%] break-words pl-2 sm:text-xs'>{dataset?.data?.contactNo}</div>
            </div>
            <div className='flex justify-end'>
              <div className='w-[33%] border-r pr-2 text-right font-semibold sm:text-xs'>Email</div>
              <div className='w-[70%] break-words pl-2 sm:text-xs'>
                {dataset?.data?.customerEmailId}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-4 row-span-4 col-start-2 row-start-2'>
          <Table
            handleOpen={handleOpen}
            setType={setType}
            setEntity={setEntity}
            rows={dataset?.data?.history}
            headCells={headCells.filter((cell) => {
              return !(
                cell.id === 'comment' && data[0]?.insurerDivisionName === InsuranceDivisionEnum.TUW
              )
            })}
            controls={controls as Controls}
            handleControls={handleControls}
            setHandleControls={setHandleControls}
            actions={[]}
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName:
                data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC
                  ? 'PPHC Case History'
                  : data[0]?.insurerDivisionName === InsuranceDivisionEnum.TUW
                    ? 'Tele MER Case History'
                    : '',
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
            rows={dataset?.data?.disposition}
            headCells={
              data[0]?.insurerDivisionName === InsuranceDivisionEnum.TUW
                ? callDispositionHeadCells
                : callDispositionHeadCellsPPHC
            }
            controls={controls1 as Controls}
            handleControls={handleControls1}
            setHandleControls={setHandleControls1}
            actions={[]}
            tableHeading={{
              tableId: TABLES.NEW_REQUEST,
              tableName: `Call Disposition`,
            }}
            notFound={notFound.includes(TABLES.NEW_REQUEST)}
            btnTxtArray={[]}
            isTableWithOutAction={true}
            showPagination={true}
          />
        </div>
      </div>
      {/* ))} */}
    </Box>
  )
}

export default SalesTeam2Data
