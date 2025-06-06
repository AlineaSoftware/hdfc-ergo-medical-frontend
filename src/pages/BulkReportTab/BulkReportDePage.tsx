import { useState } from 'react'
import BulkReport from './Page'
import MedicalDetails2Page from '../medicalhomePage/MedicalDetails2.page'
import { Box } from '@mui/material'

type Props = {}

const BulkReportDePage = (props: Props) => {
  //Modal Open and Close
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<any>(undefined)
  const [selectedId, setSelectedId] = useState(0)
  //Modal changes function
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setType(undefined)
  }

  return (
    <>
      <BulkReport
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />

      <Box>
        <div className='grid grid-cols-5 gap-4'>
          <div className='row-span-5 col-span-5 row-start-2 flex justify-between items-center flex-col'></div>
        </div>
      </Box>
    </>
  )
}

export default BulkReportDePage
