import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { useToast } from '@/hooks/useToast'
import { ReactNode } from 'react'
import { COMMON_MESSAGE } from '@/utils/commonMessages'

type Props = {
  name: string
  control: Control<any> | undefined
  label: FormControlLabelProps['label']
  handleToggle?: (check: boolean) => void
  sxProps?: SxProps<Theme>
  isDisabled?: boolean
  handleOnChange?: any
  required?: any
}

const CheckInput = ({
  control,
  name,
  label,
  handleToggle,
  sxProps,
  isDisabled,
  handleOnChange,
  required,
}: Props) => {
  const shoeToast = useToast()
  return (
    <div className='flex items-center '>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const { onChange: fieldOnChange, ...rest } = field
          return (
            <div className=''>
              <Checkbox
                {...rest}
                onChange={(e, checked) => {
                  fieldOnChange(e)
                  if (handleToggle) {
                    handleToggle(checked)
                  }
                  if (handleOnChange) {
                    handleOnChange(checked)
                  }
                }}
                checked={field.value ?? false}
                sx={{
                  maxWidth: 'max-content',
                }}
                disabled={isDisabled ?? false}
              />
              <FormHelperText>{fieldState.invalid ?? fieldState.error?.message}</FormHelperText>
            </div>
          )
        }}
        rules={required ? { validate: (val) => val || COMMON_MESSAGE.Check } : {}}
      />
      <FormLabel
        sx={{
          ...(sxProps ? sxProps : {}),
          marginBottom: 0,
        }}
      >
        {label}
      </FormLabel>
    </div>
  )
}

export default CheckInput
