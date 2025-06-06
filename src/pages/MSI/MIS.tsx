import { useState } from 'react'
import Msi from './Page'
// import MedicalHomePage from './MedicalHomePage';

type Props = {}

const MSIPage = (props: Props) => {
  //Modal Open and Close
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<any>(undefined)

  //Modal changes function
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setType(undefined)
  }

  return (
    <Msi
      handleOpen={handleOpen}
      setType={setType}
      open={open}
      type={type}
      handleClose={handleClose}
    />
  )
}

export default MSIPage
