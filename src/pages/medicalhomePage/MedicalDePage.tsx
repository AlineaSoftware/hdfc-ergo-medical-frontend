import { useState } from 'react'
import MedicalDetailsPage from './MedicalDetailsPage'
import MedicalDetails2Page from './MedicalDetails2.page'
import { useLocation } from 'react-router-dom'

type Props = {}

const MedicalDePage = (props: Props) => {
  //Modal Open and Close
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<any>(undefined)
  const [selectedId, setSelectedId] = useState(null)
  const { state } = useLocation()
  //Modal changes function
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setType(undefined)
  }
  console.log({ state })

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
        state={state}
      />
      <MedicalDetails2Page
        handleOpen={handleOpen}
        setType={setType}
        open={open}
        type={type}
        handleClose={handleClose}
        selectedId={selectedId}
        state={state}
      />
    </>
  )
}

export default MedicalDePage
