import { theme } from '@/context/ThemeProvider'
import { Button, Chip, Divider } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { searchProvider } from '@/lib/providerSearch'
import { useNotFound } from '@/context/NotFound'
import { limitOfPage, TABLES } from '@/utils/constants'
import { useState } from 'react'

type Props = {}

const SearchPage = (props: Props) => {
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
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<any | undefined>()
  const [controls, setControls] = useState<any>({})
  const [handleControls, setHandleControls] = useState<any>(defaultControls)

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
    const response = await searchProvider(setLoading, showToast, setNotFound, notFound, {
      ...handleControls,
      search: data?.search,
      testIds: [],
    })
    if (response) {
      const { records, ...rest } = response
      if (records?.length === 0) {
        setNotFound([TABLES.PROVIDER_SEARCH])
      } else {
        setNotFound([])
        setData(records)
        setControls(rest)
      }
    } else {
      setData([])
    }
  }

  const handleSeeMore = (x: any) => {
    nav('details', {
      state: x,
    })
  }

  return (
    <section>
      <div className='my-5'>
        <form
          onSubmit={handleSubmit(onSubmitHandle)}
          className='flex justify-center items-center gap-5 pt-3'
        >
          <div className='flex items-end justify-center gap-5'>
            <TxtInput
              control={control}
              name='search'
              handleChange={() => {}}
              placeholder='Search By Name, PIN & City'
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
      <div className='grid grid-cols-3 gap-5 w-full mt-3'>
        {data?.length > 0 &&
          data?.map((x) => (
            <div className='bg-white-main shadow rounded-md min-h-20 z-10 mb-5'>
              <div className='flex justify-between items-center px-3 py-2 bg-lightGray-main'>
                <div className='flex flex-col'>
                  <div className='font-medium text-lg'>{x?.providerName}</div>
                  <span className='text-xs font-normal'>{x?.telephone}</span>
                </div>
                <span className='text-orange-main'>{x?.status}</span>
              </div>
              <Divider sx={{ borderWidth: '1px' }} />
              <div className='p-3'>
                <div>
                  {' '}
                  <span className='font-normal text-black-main'>Address : </span>
                  {x?.addressLineOne}, {x?.city}, {x?.state} - {x?.pincode}
                </div>
                {/* <div className='mt-2 flex gap-2 items-center'>
                  {' '}
                  <span className='font-normal text-black-main'>Activated : </span>
                  {x?.activated?.map((x) => {
                    return <Chip label={x} size='small' variant='outlined' />
                  })}
                </div>
                <div className='mt-2 mb-1 flex gap-2 items-center'>
                  {' '}
                  <span className='font-normal text-black-main'>Deactivated : </span>{' '}
                  {x?.deActivated?.map((x) => {
                    return <Chip label={x} size='small' variant='outlined' />
                  })}
                </div> */}
              </div>
              <Divider sx={{ borderWidth: '1px' }} />
              <div className='p-3 flex gap-5 items-center w-full justify-center'>
                <Button
                  color='mBlue'
                  sx={{
                    minWidth: '80px',
                    maxWidth: '80px',
                    maxHeight: '35px',
                    minHeight: '35px',
                    color: theme.palette.mWhite.main,
                  }}
                  onClick={() => {
                    handleSeeMore(x)
                  }}
                >
                  More
                </Button>
              </div>
            </div>
          ))}

        {data?.length > 0 && data?.length < controls?.total && (
          <div className='flex w-full justify-center items-center'>
            <span role='button' onClick={handleSeeMore}>
              See More...
            </span>
          </div>
        )}
      </div>
      {data?.length === 0 && (
        <div className='flex items-center justify-center my-10'>There is nothing to show here.</div>
      )}
    </section>
  )
}

export default SearchPage
