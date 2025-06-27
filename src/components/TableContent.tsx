import {
  Grid,
  IconButton,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Link,
  Tooltip,
} from '@mui/material'
import {
  Actions,
  ACTIONS_TABLE,
  HeadCell,
  sortTableRowsByHeadCells,
  TableStates,
} from '@/types/common'
import TableRowCell from './TableRowCells'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { EVerificationProcess } from '@/lib/empanelmentCountAndList'
import { theme } from '@/context/ThemeProvider'
import { useAuth } from '@/context/AuthContext'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import DownloadIcon from '@mui/icons-material/Download'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ScheduleIcon from '@mui/icons-material/Schedule'

type Props = {
  rows: any[]
  handleEdit: (item: any) => void
  handleDelete: (item: any) => void
  handleSwitch: (item: any, switchState: boolean) => void
  handleSwitchCell: (item: any, switchState: boolean, controlName: string) => void
  handleView: (item: any) => void
  handleSchedule: (item: any) => void
  handleAudio: (item: any) => void
  handleAudioDownload: (item: any) => void
  actions: Actions
  headCells: HeadCell[]
  selectedRows: any[]
  setSelectedRows: Dispatch<SetStateAction<any[]>>
  notFound: boolean
  isTableWithOutAction: boolean
  controls: any
  permissionName?: string
  setType: Dispatch<React.SetStateAction<TableStates>>
  handleSign: (item: any) => void
  handleNav: (item: any) => void
  pathPermission: string[]
  viewNotRequired: boolean
  onRowClick?: (row: any) => void
  selectedId?: string
  showSelectedRowBg?: boolean
  DownLoadAudio: (item: any) => void
  DownLoadReport: (item: any) => void
}

const TableContent = ({
  rows,
  handleEdit,
  handleDelete,
  handleSwitch,
  handleView,
  handleSchedule,
  handleAudio,
  handleAudioDownload,
  actions,
  headCells,
  selectedRows,
  setSelectedRows,
  notFound,
  controls,
  handleSwitchCell,
  permissionName,
  setType,
  handleSign,
  handleNav,
  pathPermission,
  viewNotRequired,
  onRowClick,
  selectedId,
  showSelectedRowBg,
  DownLoadAudio,
  DownLoadReport,
}: Props) => {
  const showToast = useToast()
  const { user } = useAuth()
  const handleChecked = (checked: boolean, row: any) => {
    if (selectedRows.find((x) => x.requestID == row.requestID)) {
      const arr = selectedRows.filter((x) => x.requestID !== row.requestID)
      setSelectedRows(arr)
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row])
    }
  }
  const rowProps = {
    paddingY: '5px',
  }

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row) // Trigger the prop when a row is clicked
    }
  }

  // console.log('TableContent rows:', rows)
  return (
    <>
      {!notFound && (
        <TableBody
          sx={{
            maxWidth: '300px',
            overflow: 'scroll',
          }}
        >
          {rows?.map((row, indexRow) => {
            const _isNewRecord = row.isNewRecord
            let tableRows: HeadCell[] = []
            if (row?.image) {
              const { image, ...rest } = row
              tableRows = sortTableRowsByHeadCells(Object.keys(rest), headCells)
            } else {
              const { ...rest } = row
              tableRows = sortTableRowsByHeadCells(Object.keys(rest), headCells)
            }

            return (
              <TableRow
                role='checkbox'
                tabIndex={-1}
                key={Math.random()}
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.mLightGray?.main,
                  },
                  backgroundColor:
                    selectedId === row._id && showSelectedRowBg ? theme.palette.mGray.main : '',
                }}
              >
                {tableRows.map((x, i) => {
                  return (
                    <TableRowCell
                      setType={setType}
                      x={x}
                      i={i}
                      row={row}
                      rowIndex={indexRow}
                      controls={controls}
                      key={Math.random()}
                      handleView={handleView}
                      selectedRows={selectedRows}
                      handleChecked={handleChecked}
                      lastIndex={rows.length - 1}
                      onClickViewFnc={handleView}
                      handleSwitchCell={handleSwitchCell}
                      viewNotRequired={viewNotRequired}
                    />
                  )
                })}
                <TableCell
                  align='left'
                  padding='none'
                  sx={{
                    position: 'sticky',
                    right: 0,
                    ...rowProps,
                  }}
                >
                  <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    {actions.includes(ACTIONS_TABLE.NAV) && (
                      <Tooltip title='Open' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '600',
                              fontSize: '14px',
                              color: `${
                                // user?.role?.includes(pathPermission) &&
                                // (row?.verificationStatusByNw === EVerificationProcess.Pending ||
                                //   row?.verificationStatusByLegal ===
                                //     EVerificationProcess.ReturnedByLegal)
                                //   ?
                                '#004DAA'
                                // : theme.palette.mDarkGray?.main
                              }`,
                              cursor: `${
                                // user?.role?.includes(pathPermission) &&
                                // (row?.verificationStatusByNw === EVerificationProcess.Pending ||
                                //   row?.verificationStatusByLegal ===
                                //     EVerificationProcess.ReturnedByLegal)
                                //   ?
                                'pointer'
                                // : 'default'
                              }`,
                              marginRight: '10px',
                            }}
                            onClick={() => {
                              if (user?.role?.includes(pathPermission)) {
                                handleNav(row)
                              }
                            }}
                          >
                            Open
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.VIEW) && (
                      <Tooltip title='View' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '600',
                              fontSize: '14px',
                              color: '#004DAA',
                              marginRight: '10px',
                            }}
                            onClick={() => handleView(row)}
                          >
                            View
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.EDIT) && (
                      <Tooltip title='Edit' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '600',
                              fontSize: '14px',
                              color: `${
                                user?.role?.includes(pathPermission) &&
                                (row?.verificationStatusByNw === EVerificationProcess.Pending ||
                                  row?.verificationStatusByLegal ===
                                    EVerificationProcess.ReturnedByLegal)
                                  ? '#004DAA'
                                  : theme.palette.mDarkGray?.main
                              }`,
                              cursor: `${
                                user?.role?.includes(pathPermission) &&
                                (row?.verificationStatusByNw === EVerificationProcess.Pending ||
                                  row?.verificationStatusByLegal ===
                                    EVerificationProcess.ReturnedByLegal)
                                  ? 'pointer'
                                  : 'default'
                              }`,
                              marginRight: '10px',
                            }}
                            onClick={() => {
                              if (
                                user?.role?.includes(pathPermission) &&
                                (row?.verificationStatusByNw === EVerificationProcess.Pending ||
                                  row?.verificationStatusByLegal ===
                                    EVerificationProcess.ReturnedByLegal)
                              ) {
                                handleEdit(row)
                              }
                            }}
                          >
                            Edit
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}

                    {actions.includes(ACTIONS_TABLE.SWITCH) && (
                      <Tooltip title='Switch' arrow>
                        <Grid item>
                          <Switch
                            onChange={(e) => {
                              handleSwitch(row, e.currentTarget.checked)
                            }}
                            checked={row.isActive}
                          />
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.SIGN) && (
                      <Tooltip title='Document Signature' arrow>
                        <Grid item>
                          <Link
                            sx={{
                              display: 'inline-block',
                              fontWeight: '600',
                              fontSize: '14px',
                              color:
                                row?.empanelmentStatus === EVerificationProcess.Pending
                                  ? '#004DAA'
                                  : theme.palette.mDarkGray?.main,
                              marginRight: '10px',
                              cursor:
                                row?.empanelmentStatus === EVerificationProcess.Pending
                                  ? 'pointer'
                                  : 'default',
                            }}
                            onClick={() => {
                              if (row?.empanelmentStatus === EVerificationProcess.Pending) {
                                handleSign(row?._id)
                              }
                            }}
                          >
                            Signature
                          </Link>
                        </Grid>
                      </Tooltip>
                    )}

                    {actions.includes(ACTIONS_TABLE.DOWNLOAD_REPORT) &&
                      row?.status === 'Closed' && (
                        // <a href={`${row?.pdf}`} download={true} target='_blank' rel='noreferrer'>
                        //   <Tooltip title='Download Report' arrow>
                        //     <Grid item>
                        //       <IconButton
                        //         sx={{
                        //           width: 24, // Adjust width as needed
                        //           height: 24, // Adjust height as needed
                        //         }}
                        //       >
                        //         <PictureAsPdfIcon className='text-orange-main' />
                        //       </IconButton>
                        //     </Grid>
                        //   </Tooltip>
                        // </a>
                        <Tooltip title='Download Report' arrow>
                          <Grid item>
                            <IconButton
                              sx={{ width: 24, height: 24 }}
                              onClick={(e) => {
                                DownLoadReport(row)
                              }}
                            >
                              <PictureAsPdfIcon className='text-orange-main' />
                            </IconButton>
                          </Grid>
                        </Tooltip>
                      )}

                    {actions.includes(ACTIONS_TABLE.PLAY) && row?.status === 'Closed' && (
                      <Tooltip title='Audio Play' arrow>
                        <Grid item>
                          <IconButton
                            sx={{
                              width: 24, // Adjust width as needed
                              height: 24, // Adjust height as needed
                            }}
                            onClick={(e) => handleAudio(row)}
                          >
                            <PlayCircleFilledIcon className='text-blue-main' />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    {actions.includes(ACTIONS_TABLE.DOWNLOAD_AUDIO) && row?.status === 'Closed' && (
                      <>

                        {(() => {
                          const sortedCalls = [...(row?.agentCalls || [])].sort(
                            (a, b) =>
                              new Date(b.StartTime).getTime() - new Date(a.StartTime).getTime(),
                          )
                          const latestAudioFile = sortedCalls[0]?.AudioFile
                          console.log(latestAudioFile, 'latestAudioFile')

                          return latestAudioFile ? (
                            <a href={latestAudioFile} download target='_blank' rel='noreferrer'>
                              <Tooltip title='Download Audio' arrow>
                                <Grid item>
                                  <IconButton sx={{ width: 24, height: 24 }}>
                                    <DownloadIcon className='text-blue-main' />
                                  </IconButton>
                                </Grid>
                              </Tooltip>
                            </a>
                          ) : null
                        })()}
                      </>
                    )}

                    {actions.includes(ACTIONS_TABLE.DOWNLOAD) && (
                      <Tooltip title='Download' arrow>
                        <Grid item>
                          <DownloadIcon
                            className='text-blue-main'
                            onClick={() => handleDelete(row)}
                          />
                        </Grid>
                      </Tooltip>
                    )}

                    {JSON.parse(localStorage.getItem('salesRedirect')) &&
                      ((actions.includes(ACTIONS_TABLE.SCHEDULE) && row?.status === 'Recall') ||
                        row?.status === 'Received') && (
                        <Tooltip title='Add Schedule' arrow>
                          <Grid item>
                            <IconButton
                              sx={{
                                width: 24,
                                height: 24,
                              }}
                              onClick={() => handleSchedule(row)}
                            >
                              <ScheduleIcon className='text-blue-main' />
                            </IconButton>
                          </Grid>
                        </Tooltip>
                      )}
                    {actions.includes(ACTIONS_TABLE.BULK_REPORT) &&
                      row?.insurerDivisionName === 'TUW' && (
                        <Tooltip title='Download Audio' arrow>
                          <Grid item>
                            <IconButton
                              sx={{ width: 24, height: 24 }}
                              onClick={(e) => {
                                DownLoadAudio(row)
                              }}
                            >
                              <DownloadIcon className='text-blue-main' />
                            </IconButton>
                          </Grid>
                        </Tooltip>
                      )}

                    {actions.includes(ACTIONS_TABLE.BULK_REPORT_PLAY) &&
                      row?.insurerDivisionName === 'TUW' && (
                        <Tooltip title='Audio Play' arrow>
                          <Grid item>
                            <IconButton
                              sx={{
                                width: 24, // Adjust width as needed
                                height: 24, // Adjust height as needed
                              }}
                              onClick={() => handleAudio(row)}
                            >
                              <PlayCircleFilledIcon className='text-blue-main' />
                            </IconButton>
                          </Grid>
                        </Tooltip>
                      )}
                  </Grid>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )}
    </>
  )
}

export default TableContent
