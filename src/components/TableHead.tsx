import {
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { StyledTableSortLabel } from '@/components/MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import { HandleControls, HeadCell } from '@/types/common'
import { splitDescription } from 'src/utils/constants'
import _ from 'lodash'

type Props = {
  headCells: HeadCell[]
  sortFnc: (sort: string, sortOrder: number) => void
  handleControls: any
  setSelectedRows: Dispatch<SetStateAction<any[]>>
  selectedRows: any[]
  rows: any[]
  isTableWithOutAction: boolean
  isTableHeadWithCheckBox: boolean
}

const TableHeader = ({
  headCells,
  sortFnc,
  handleControls,
  setSelectedRows,
  rows,
  selectedRows,
  isTableWithOutAction,
  isTableHeadWithCheckBox,
}: Props) => {
  return (
    <>
      <TableHead
        sx={{
          borderBottom: '1px solid ',
          borderColor: theme.palette.mDarkGray?.main,
        }}
      >
        <TableRow>
          {/* {isTableHeadWithCheckBox && (
            <TableCell
              align={'justify'}
              padding='none'
              sx={{
                paddingY: '5px',
                width: 'auto',
                // position: 'sticky',
                paddingRight: '5px',
                right: 0,
                bgcolor: theme.palette.mWhite?.main,
              }}
            >
              <Checkbox
                checked={
                  rows?.length > 0
                    ? _.isEqual(
                        selectedRows?.map((x) => x?.requestId),
                        rows?.map((x) => x?.requestId),
                      )
                    : false
                }
                onChange={(e, checked) => {
                  if (checked) {
                    setSelectedRows(rows)
                  } else {
                    setSelectedRows([])
                  }
                }}
              />
            </TableCell>
          )} */}
          {headCells.map((headCell) => (
            <TableCell
              key={Math.random()}
              align={headCell.align ?? 'center'}
              padding='none'
              sx={{
                paddingY: isTableWithOutAction ? '5px' : '',
                minWidth: 'max-content',
                [theme.breakpoints.down('xl')]: {
                  minWidth: headCell.width ? headCell.width : 150,
                },
                px: '10px',
              }}
            >
              <StyledTableSortLabel active={true}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={headCell.type === 'checkBox' ? '' : '4px'}
                >
                  {headCell.isCheck && (
                    <Checkbox
                      checked={
                        rows?.length > 0
                          ? _.isEqual(
                              selectedRows?.map((x) => x?.requestId),
                              rows?.map((x) => x?.requestId),
                            )
                          : false
                      }
                      onChange={(e, checked) => {
                        if (checked) {
                          setSelectedRows(rows)
                        } else {
                          setSelectedRows([])
                        }
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: theme.palette.mBlack?.main,
                      fontWeight: '600',
                      fontSize: '14px',
                      marginRight: headCell.type === 'checkBox' ? '8px' : '1px',
                    }}
                  >
                    {`${headCell.label}`} <br /> {`${headCell.secondLineLabel ?? ''}`}
                  </Typography>
                </Box>
              </StyledTableSortLabel>
            </TableCell>
          ))}
          {!isTableWithOutAction && (
            <TableCell
              align={'center'}
              padding='none'
              sx={{
                paddingY: '5px',
                width: 'auto',
                // position: 'sticky',
                paddingRight: '5px',
                right: 0,
                bgcolor: theme.palette.mWhite?.main,
              }}
            >
              <StyledTableSortLabel>
                <Typography
                  sx={{
                    color: theme.palette.mBlack?.main,
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  Actions
                </Typography>
              </StyledTableSortLabel>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    </>
  )
}

export default TableHeader
