import { SxProps, TextField, Theme } from '@mui/material'
import { Controller, Control } from 'react-hook-form'

type Props = {
  placeholder: string
  name: string
  control: Control<any> | undefined
  handleChange: (value: any) => void // Updated this line
  validation: any
  isDisabled?: boolean
  sx?: SxProps<Theme>
  multiline?: number
  label?: string
  handleClick?: () => void
  readonly?: boolean
  handleBlue?: (e) => void
  handleOnChange?: (e) => void
  autoComplete?: boolean
}

const TxtInput = ({
  placeholder,
  name,
  control,
  handleChange,
  validation,
  isDisabled,
  sx,
  multiline,
  label,
  handleClick,
  readonly,
  handleBlue,
  handleOnChange,
  autoComplete,
}: Props) => {
  const inputStyleProps: SxProps<Theme> = { ...sx, width: '100%', marginTop: '5px' }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field
        return (
          <div className='flex flex-col items-start'>
            <label className='text-sm font-semibold'>{label}</label>
            <TextField
              {...rest}
              onChange={(e) => {
                const value = e.target.value // Get the input value
                onChange(value) // Update react-hook-form
                handleChange(value) // Call handleChange with the new value
                if (handleOnChange) {
                  handleOnChange(e)
                }
              }}
              onBlur={(e) => {
                if (handleBlue) {
                  handleBlue(e)
                }
              }}
              onClick={() => {
                if (handleClick) {
                  handleClick()
                }
              }}
              placeholder={placeholder}
              error={fieldState.invalid}
              disabled={isDisabled ?? false}
              sx={inputStyleProps}
              multiline={multiline ? true : false}
              minRows={multiline ?? 0}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: readonly || false,
                autoComplete: autoComplete ? 'off' : 'on',
              }} // This is the inputProps
            />
          </div>
        )
      }}
      rules={validation}
    />
  )
}

export default TxtInput
