import React, { Dispatch, SetStateAction, memo } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableFooterControls from './TableFooterControls'
import TableHeaderControls from './TableHeaderControls'
import TableHeader from './TableHead'
import TableContent from './TableContent'
import {
  Actions,
  ACTIONS_TABLE,
  Controls,
  HandleControls,
  HeaderBtnTypes,
  TABLE_STATES,
  TableStates,
} from '@/types/common'
import { useNavigate } from 'react-router-dom'
import { EApprovalStatus, ERequestType } from '@/utils/constants'
import { EVerificationProcess } from '@/lib/empanelmentCountAndList'

type Props = {
  handleOpen: () => void
  setType: React.Dispatch<React.SetStateAction<TableStates>>
  setEntity: React.Dispatch<React.SetStateAction<any | undefined>>
  rows: any[]
  headCells: any[]
  controls: Controls
  actions: Actions
  tableHeading?: { tableId: string; tableName: string }
  headingInsured?: string
  handleControls: HandleControls
  setHandleControls: React.Dispatch<React.SetStateAction<HandleControls>>
  tabs?: { isTabs: boolean; tabComponent: any }
  btnTxtArray: HeaderBtnTypes
  notFound: boolean
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>
  selectedRows?: any[]
  isTableWithOutAction?: boolean
  isTableHeadWithCheckBox?: boolean
  handleSwitchInCell?: (controlName: string, switchState: boolean) => void
  viewNotRequired?: boolean
  permissionName?: string
  redirectPath?: string
  handleSign?: (item: any) => void
  path?: string
  pathPermission?: string[]
  handleEditAction?: string
  onRowClick?: (row: any) => void
  showSearch?: boolean
  showPagination?: boolean
  selectedId?: string
  showSelectedRowBg?: boolean
  handleDownload?: () => void
  DownLoadAudio?: (item: any) => void
  DownLoadReport?: (item: any) => void
}

const CustomTable = ({
  rows,
  headCells,
  actions,
  tableHeading,
  headingInsured,
  controls,
  handleControls,
  setHandleControls,
  handleOpen,
  setType,
  setEntity,
  tabs,
  setSelectedRows,
  selectedRows,
  notFound,
  isTableWithOutAction,
  isTableHeadWithCheckBox,
  btnTxtArray,
  handleSwitchInCell,
  viewNotRequired,
  permissionName,
  redirectPath,
  handleSign,
  path,
  pathPermission,
  handleEditAction,
  onRowClick,
  showSearch,
  showPagination,
  selectedId,
  showSelectedRowBg,
  handleDownload,
  DownLoadAudio,
  DownLoadReport,
}: Props) => {
  const nav = useNavigate()

  // Actions

  //Create
  const create = () => {
    setType(TABLE_STATES.ADD)
    setEntity(undefined)
    handleOpen()
  }

  //Edit
  const memoizedHandleEdit = (item: any) => {
    setEntity(item)
    nav(handleEditAction, {
      state: item,
    })
  }

  //Delete
  const memoizedHandleDelete = (item: any) => {
    setType(TABLE_STATES.DELETE)
    setEntity(item)
    handleOpen()
  }

  const memoizedHandleView = (item: any) => {
    // console.log('item', item)
    if (
      (!viewNotRequired && redirectPath && item.division === 'PPHC') ||
      (item.division === 'Wellness' && !viewNotRequired && redirectPath)
    ) {
      nav('/dashboard/pphccasehistory', {
        state: item,
      })
    } else if (
      !viewNotRequired &&
      redirectPath &&
      item.division !== 'PPHC' &&
      item.division !== 'Wellness'
    ) {
      nav(redirectPath, {
        state: item,
      })
    }
  }

  const memoizedHandleNavigate = (item: any) => {
    if (
      path
      // &&
      // (item?.verificationStatusByNw === EVerificationProcess.Pending ||
      //   item?.verificationStatusByLegal === EVerificationProcess.ReturnedByLegal)
    ) {
      nav(path, {
        state: item,
      })
    }
  }

  const memoizedHandleSign = (item: any) => {
    if (handleSign) {
      setEntity(item)
      handleSign(item)
    }
  }

  const handleSwitch = (item: any, switchState: boolean) => {
    if (!actions.includes(ACTIONS_TABLE.SWITCH)) {
      return
    } else {
      if (item.isActive) {
        setType(TABLE_STATES.ACTIVE)
      } else {
        setType(TABLE_STATES.INACTIVE)
      }
      setEntity(item)
      handleOpen()
    }
  }

  const memoizedHandleSchedule = (item: any) => {
    setType(TABLE_STATES.SCHEDULE)
    setEntity(item)
    handleOpen()
  }

  const memoizedHandleAudio = (item: any) => {
    setType(TABLE_STATES.PLAY)
    setEntity(item)
    handleOpen()
  }

  const memoizedHandleAudioDownload = (item: any) => {
    setType(TABLE_STATES.DOWNLOAD_AUDIO)
    setEntity(item)
    handleOpen()
  }

  // Sorting, Searching and Pagination
  //search
  const search = (srhTxt: string) =>
    setHandleControls({ ...handleControls, search: srhTxt, page: 1 })
  //sort
  const sort = (sort: string, sortOrder: number) =>
    setHandleControls({
      ...handleControls,
      sortParam: sort,
      page: 1,
      sortOrder: sortOrder,
    })

  //Page
  const handlePage = (newPage: number) => setHandleControls({ ...handleControls, page: newPage })

  //RowsPerPage
  const handleRowsPerPage = (pageLimit: number) =>
    setHandleControls({
      ...handleControls,
      per_page: pageLimit,
      page: 1,
    })

  const view = () => {
    setType(TABLE_STATES.VIEW)
    setEntity(undefined)
    handleOpen()
  }
  const handleSwitchCell = (
    item: Record<string, any>,
    switchState: boolean,
    controlName: string,
  ) => {
    if (handleSwitchInCell) {
      handleSwitchInCell(controlName, switchState)
    }
    setType(TABLE_STATES.SWITCH_CELL)
    setEntity(item)
    handleOpen()
  }

  const downloadPdf = () => {
    if (handleDownload) {
      handleDownload()
    }
  }
  const DownloadAudio = () => {
    setType(TABLE_STATES.DOWNLOAD_AUDIO)
    handleOpen()
  }

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '5px',
        marginBottom: '10px',
      }}
      elevation={3}
    >
      <TableHeaderControls
        heading={tableHeading && tableHeading.tableName}
        headingInsured={headingInsured}
        searchFnc={search}
        clickFnc={create}
        tabs={tabs}
        btnTxtArray={btnTxtArray}
        selectedRows={selectedRows as any[]}
        clickView={view}
        permissionName={permissionName && permissionName}
        showSearch={showSearch}
        clickPDFDownload={downloadPdf}
      />
      <TableContainer className='scrollBar'>
        <Table aria-labelledby='tableTitle' size='medium'>
          <TableHeader
            headCells={headCells}
            sortFnc={sort}
            handleControls={handleControls}
            setSelectedRows={setSelectedRows as Dispatch<SetStateAction<any[]>>}
            selectedRows={selectedRows as any[]}
            rows={rows}
            isTableWithOutAction={isTableWithOutAction ? isTableWithOutAction : false}
            isTableHeadWithCheckBox={isTableHeadWithCheckBox ? isTableHeadWithCheckBox : false}
          />
          <TableContent
            rows={rows}
            key={Math.random()}
            handleDelete={memoizedHandleDelete}
            handleEdit={memoizedHandleEdit}
            handleSwitch={handleSwitch}
            handleView={memoizedHandleView}
            handleSchedule={memoizedHandleSchedule}
            handleAudio={memoizedHandleAudio}
            handleAudioDownload={memoizedHandleAudioDownload}
            actions={actions}
            headCells={headCells}
            selectedRows={selectedRows as any[]}
            setSelectedRows={setSelectedRows as Dispatch<SetStateAction<any[]>>}
            notFound={notFound}
            isTableWithOutAction={isTableWithOutAction ? isTableWithOutAction : false}
            controls={controls}
            handleSwitchCell={handleSwitchCell}
            permissionName={permissionName && permissionName}
            setType={setType}
            handleSign={memoizedHandleSign}
            handleNav={memoizedHandleNavigate}
            pathPermission={pathPermission}
            viewNotRequired={viewNotRequired}
            onRowClick={onRowClick}
            selectedId={selectedId}
            showSelectedRowBg={showSelectedRowBg}
            DownLoadAudio={DownLoadAudio}
            DownLoadReport={DownLoadReport}
          />
        </Table>
      </TableContainer>
      {showPagination && (
        <TableFooterControls
          handlePage={handlePage}
          handleRowsPerPage={handleRowsPerPage}
          numberOfPages={controls.last_page}
          from={controls.current_page}
          to={controls.current_page}
          total={controls.total}
          currentPage={controls.current_page}
          handleControls={handleControls}
          notFound={notFound}
        />
      )}
    </Paper>
  )
}

export default memo(CustomTable)
