import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Controller } from 'react-hook-form'
import { enGB } from 'date-fns/locale'
import { SxProps, Theme } from '@mui/material'
import { useState } from 'react'

type Props = {
  name: string
  control: any
  label: string
  setError: any
  clearErrors: any
  validation: any
  minDate?: Date | null
  maxDate?: Date | null
  handleChange: () => void
  isDisabled?: boolean
  sx?: SxProps<Theme>
  showClearButton?: boolean
}

export const DateTimeInput = ({
  name,
  control,
  label,
  setError,
  clearErrors,
  validation,
  minDate,
  maxDate,
  handleChange,
  isDisabled,
  sx,
  showClearButton = true,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%', marginTop: '5px' }
  const [openCalendar, setOpenCalendar] = useState(false)
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ clearButtonLabel: 'Clear' }}
      adapterLocale={enGB}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState }) => (
          <div className='flex flex-col items-start'>
            <label className='text-sm font-semibold'>{label}</label>
            <DateTimePicker
              open={openCalendar}
              onClose={() => setOpenCalendar(false)}
              onChange={(newDate) => {
                onChange(newDate)
                handleChange()
                // setOpenCalendar(false)
                if (!newDate) {
                  setError(name, {
                    type: 'validate',
                    message: `Select a valid ${label}`,
                  })
                } else {
                  clearErrors(name)
                }
              }}
              minDate={minDate}
              maxDate={maxDate}
              value={value ? new Date(value) : null}
              ampm={true} // Enable AM/PM format
              format='dd/MM/yyyy hh:mm a' // Format for both date and time
              views={['month', 'year', 'day', 'hours', 'minutes']} // Date and time views
              slotProps={{
                textField: {
                  error: fieldState.invalid,
                  InputLabelProps: { shrink: true },
                  onClick: () => setOpenCalendar(!openCalendar),
                  placeholder: `Select ${label}`,
                  disabled: true,
                  sx: inputStyleProps,
                },
                actionBar: {
                  actions: showClearButton ? ['clear'] : [],
                },
              }}
            />
          </div>
        )}
        rules={validation}
      />
    </LocalizationProvider>
  )
}
