import { useState } from 'react'
import MedicalDetailsPage from './MedicalDetailsPage'
import MedicalDetails2Page from './MedicalDetails2.page'

type Props = {}

const MedicalDePage = (props: Props) => {
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
      <MedicalDetailsPage
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />
      <MedicalDetails2Page
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        selectedId={selectedId}
      />
    </>
  )
}

export default MedicalDePage
