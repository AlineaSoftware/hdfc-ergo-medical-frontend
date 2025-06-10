import { LoadingState, ShowToastFunction } from '@/types/common'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { formatDate, formatDateForFile, formatMongoDBDateToTime } from '@/utils/constants'
import { format, parseISO } from 'date-fns'
import ExcelJS from 'exceljs'
import axiosInstance from 'src/axiosInstance'
import { MSI } from 'src/utils/endPoints'

// export const downloadExcel = (
//   headCells: { id: string; name: string; isDate?: boolean; isTime?: boolean; isLeave?: boolean }[],
//   rows: any[],
//   fileName: string,
//   sheetName: string,
//   toast: ShowToastFunction,
//   msg?: string,
// ) => {
//   if (rows.length === 0) {
//     toast('info', msg ? msg : COMMON_MESSAGE.ExcelMsg)
//   } else {
//     const data = rows.map((x, i) => {
//       const dataX: any = {}
//       for (let j = 0; j < headCells.length; j++) {
//         const element = headCells[j]
//         if (element.isDate) {
//           dataX[element.id] = x[element.id]
//             ? `${formatDate(x[element.id])} | ${formatMongoDBDateToTime(x[element.id])}`
//             : ''
//         } else if (element.isTime) {
//           dataX[element.id] = x[element.id] ? `${format(parseISO(x[element.id]), 'hh:mm a')}` : ''
//         } else if (element.isLeave) {
//           dataX[element.id] =
//             (x[element.id] === 0 && 'Absent') ||
//             (x[element.id] === 1 && 'Present') ||
//             (x[element.id] === 2 && 'Holiday') ||
//             (x[element.id] === 3 && 'Weekoff')
//         } else {
//           dataX[element.id] = x[element.id]
//         }
//       }
//       return dataX
//     })
//     const groupedData = data.reduce((result, item, i, arr) => {
//       for (const key in item) {
//         if (!result[key]) {
//           result[key] = [key.length]
//         }
//         const max = Math.max(...result[key], item[key]?.length)
//         if (typeof max === 'number') {
//           result[key].push(max)
//         }
//         if (arr.length - 1 === i) {
//           const max = Math.max(...result[key], item[key]?.length)
//           const lastMax = result[key][result[key].length - 1]
//           result[key] = []
//           result[key].push(lastMax)
//         }
//       }
//       return result
//     }, {})
//     const headersWithWidth = Object.keys(groupedData).map((x) => {
//       return {
//         width: groupedData[x][0] ? groupedData[x][0] + 15 : 40,
//         header: headCells.find((y) => y.id === x)?.name,
//         key: x,
//       }
//     })
//     const workbook = new ExcelJS.Workbook()
//     const sheet = workbook.addWorksheet(`${sheetName}`)
//     const row1 = sheet.getRow(1)
//     row1.height = 35
//     row1.border = {
//       top: { style: 'thin', color: { argb: '3441A3' } },
//       left: { style: 'thin', color: { argb: '3441A3' } },
//       bottom: { style: 'thin', color: { argb: '3441A3' } },
//       right: { style: 'thin', color: { argb: '3441A3' } },
//     }
//     row1.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: 'D3D7F2' },
//     }
//     row1.font = {
//       family: 4,
//       size: 18,
//       bold: true,
//     }
//     row1.alignment = {
//       vertical: 'middle',
//     }

//     sheet.columns = headersWithWidth
//     data?.map((x) => {
//       const r = sheet.addRow(x)
//       r.font = {
//         family: 4,
//         size: 14,
//       }
//       r.height = 35
//       r.alignment = {
//         vertical: 'middle',
//       }
//       r.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'F2F2F2' },
//       }
//       r.border = {
//         top: { style: 'thin', color: { argb: '3441A3' } },
//         left: { style: 'thin', color: { argb: '3441A3' } },
//         bottom: { style: 'thin', color: { argb: '3441A3' } },
//         right: { style: 'thin', color: { argb: '3441A3' } },
//       }
//     })

//     const todayDate = new Date()
//     const dateForFile = formatDateForFile(todayDate.toISOString())
//     workbook.xlsx.writeBuffer().then(function (data) {
//       const blob = new Blob([data], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       })
//       const url = window.URL.createObjectURL(blob)
//       const anchor = document.createElement('a')
//       anchor.href = url
//       anchor.download = `${fileName}-${dateForFile}.xlsx`
//       anchor.click()
//       window.URL.revokeObjectURL(url)
//     })
//   }
// }

export const downloadExcel = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  params: Record<string, any>,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    const url = `${MSI.Export_Excel}?${new URLSearchParams(params).toString()}`

    const res = await axiosInstance.get(url)
    if (res?.data?.status === 400) {
      toast('error', res.data.message)
    } else {
      toast('success', COMMON_MESSAGE.Submit)
    }
    return res?.data
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 400) {
      toast('error', error.response.data.message)
    } else if (error.response.status === 401) {
      toast('error', 'Unauthorized access. Please log in again.')
      localStorage.clear()
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
