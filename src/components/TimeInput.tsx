import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { theme } from '../context/ThemeProvider'
import { SxProps, Theme } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'

type Props = {
  name: string
  control: any
  label: string
  setError: any
  clearErrors: any
  validation: any
  isDisabled?: boolean
  sx?: SxProps<Theme>
  minTime?: Date
  maxTime?: Date
  disabledTimeSlotValidator?: (time: Date) => boolean
}

const TimeInput = ({
  name,
  control,
  label,
  setError,
  clearErrors,
  validation,
  isDisabled,
  sx,
  minTime,
  maxTime,
  disabledTimeSlotValidator,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%' }
  const [OpenTimer, setOpenTimer] = useState(false)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOpenTimer(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState }) => {
          const handleTimeChange = (newValue: Date | null) => {
            if (newValue) {
              clearErrors(name)
              onChange(newValue)
            }
          }

          return (
            <div className='flex flex-col items-start'>
              <label className='text-sm font-semibold'>{label}</label>
              <TimePicker
                open={OpenTimer}
                onClose={() => setOpenTimer(false)}
                onChange={handleTimeChange}
                value={value}
                reduceAnimations
                slotProps={{
                  textField: {
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message ?? '',
                    InputLabelProps: { shrink: true },
                    onKeyDown: onKeyDown,
                    onClick: () => setOpenTimer(!OpenTimer),
                    placeholder: `Select ${label}`,
                    disabled: isDisabled ?? false,
                    sx: inputStyleProps,
                  },
                  actionBar: {
                    sx: {
                      '& .MuiButtonBase-root': {
                        color: 'white !important',
                        background: theme.palette.mBlue?.main,
                        minWidth: '100%',
                        maxWidth: '100%',
                        minHeight: '30px',
                        maxHeight: '30px',
                        ':hover': {
                          background: theme.palette.mBlue?.main,
                        },
                      },
                    },
                  },
                }}
                views={['hours', 'minutes']}
                ampm={true}
                minTime={minTime} // Ensure this is set correctly (2 hours from now)
                maxTime={maxTime} // Set to 8:00 PM
                minutesStep={30}
                shouldDisableTime={disabledTimeSlotValidator} // Use the validator here
              />
            </div>
          )
        }}
        rules={validation}
      />
    </LocalizationProvider>
  )
}

export default TimeInput
