import { useEffect, useState } from 'react'
import SalesTeamData from './SalesTeamData'
import SalesTeam2Data from './SalesTeam2Data'
import { InsuranceDivisionEnum, TABLES } from 'src/utils/constants'
import { getAllDetails, getSalesList } from 'src/lib/salesDetails'
import { useLoading } from 'src/context/LoadingContext'
import { useToast } from 'src/hooks/useToast'
import { useNotFound } from 'src/context/NotFound'
type Props = {}

const SalesTeamPage = (props: Props) => {
  //Modal Open and Close
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<any>(undefined)
  const [selectedId, setSelectedId] = useState(null)
  const [schedule, setSchedule] = useState(false)
  const { setLoading } = useLoading()
  const showToast = useToast()
  const { setNotFound, notFound } = useNotFound()
  const [data, setData] = useState<any[]>([])
  const [dataset, setDataset] = useState(null)
  const [controls, setControls] = useState({})

  //Modal changes function
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setType(undefined)
  }

  const getUserData = async () => {
    const response = await getSalesList(setLoading, showToast)
    if (response) {
      const { data, ...rest } = response
      if (data?.length === 0) {
        setNotFound([TABLES.SALES_CHECK])
      } else {
        setNotFound([])
        setData(data)
        setSelectedId(data[0]?._id)
        setControls(rest)
        await getAllData(data[0]?._id)
      }
    } else {
      setData([])
    }
  }

  useEffect(() => {
    getUserData()
  }, [schedule])

  const getAllData = async (item: any) => {
    const response = await getAllDetails(setLoading, showToast, item)

    if (response) {
      const { getCallList, getDCList, getInsurerList, ...rest } = response

      if (data[0]?.insurerDivisionName === InsuranceDivisionEnum.PPHC) {
        setDataset(response)
      } else {
        setDataset(response)
      }
      setControls(rest)
      setNotFound([])
    } else {
      setDataset({ getCallList: [], getDCList: [], getInsurerList: [] })
    }
  }

  useEffect(() => {
    if (selectedId !== null && dataset !== null) {
      getAllData(selectedId)
    }
  }, [selectedId])

  return (
    <>
      <SalesTeamData
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        data={data}
        dataset={dataset}
        controls={controls}
        setSchedule={setSchedule}
        schedule={schedule}
      />
      <SalesTeam2Data
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        data={data}
        dataset={dataset}
        controls={controls}
      />
    </>
  )
}

export default SalesTeamPage
