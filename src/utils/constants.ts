import CryptoJS from 'crypto-js'
import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'
export const x = 10

export const CURRENCY_SYMBOL = '₹'
export const limitOfPage = 10

export const VITE_APP_API_URL = 'http://localhost:8000/api'
export const VITE_APP_FRONTEND_URL = 'http://localhost:4000'
export const VITE_APP_IMAGE_GET = 'http://localhost:8000'
// export const VITE_APP_API_URL = 'http://192.168.1.48:8000/api'
// export const VITE_APP_IMAGE_GET = 'https://api.dropikme.com'
// export const VITE_APP_API_URL = 'https://api.dropikme.com/api'
// export const VITE_APP_FRONTEND_URL = 'https://dropikme.com'

export const enum TOAST_TYPES {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
}

export const enum ALIGN_DIALOG {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export const splitDescription = (description: string, length?: number) => {
  const maxCharac = length ? length : 15
  if (description.length > maxCharac) {
    return description.slice(0, maxCharac).concat('...')
  } else {
    return description
  }
}

export const drawerWidth = 260

export const enum TABLES {
  NEW_REQUEST = 'NEW_REQUEST',
  OPEN_REQUEST = 'OPEN_REQUEST',
  CLOSE_REQUEST = 'CLOSE_REQUEST',
  PERSPECTIVE_PROVIDER = 'PERSPECTIVE_PROVIDER',
  PENDING_FOR_VERIFICATION = 'PENDING_FOR_VERIFICATION',
  VERIFICATION = 'VERIFICATION',
  PROVIDER_SEARCH = 'PROVIDER_SEARCH',
  RETURN_BY_LEGAL = 'RETURN_BY_LEGAL',
  MANAGE_SEARCH = 'MANAGE_SEARCH',
  NETWORK_VERIFICATION = 'NETWORK_VERIFICATION',
  SALES_CHECK = 'SALES VERIFICATION',
  MEDICAL_CHECK = 'MEDICAL CHECK',
  DISPOSITION_DURATION = 'DISPOSITION_DURATION',
  CALL_HISTORY = 'CALL_HISTORY',
  BULK_REPORT = 'BULK_REPORT',
}

export enum EUserRole {
  Operation = 'Operation',
  Network = 'Network',
  Legal = 'Legal',
}

export enum EApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

// export enum EZones {
//   North = 'North',
//   East = 'East',
//   West = 'West',
//   South = 'South',
// }

export enum EZones {
  NorthZone = 'NorthZone',
  EastZone = 'EastZone',
  WestZone = 'WestZone',
  SouthZone = 'SouthZone',
}

export const EZonesArray = Object.keys(EZones).map((key) => {
  return {
    _id: EZones[key],
    label: EZones[key],
  }
})

export enum ERequestType {
  Empanel = 'Empanel',
  Delist = 'Delist',
  Deactivate = 'Deactivate',
  Activate = 'Activate',
}

export enum EFdEmpanelProcessStatus {
  ForwardedToDC = 48,
  DocumentSubmittedByDC = 49,
  ForwardedToLegalAfterQC1 = 50,
  DocumentVerifiedByLegal = 51,
  IssueInDocument = 52,
  EmpanelmentSuccessful = 53,
}

export enum EFdStatus {
  Open = 2,
  Pending = 3,
  Resolved = 4,
  Closed = 5,
  ForwardedToDC = 48,
  DocumentSubmittedByDC = 49,
  ForwardedToLegalAfterQC1 = 50,
  DocumentVerifiedByLegal = 51,
  IssueInDocument = 52,
  EmpanelmentSuccessful = 53,
  ManualEmpanelmentStart = 54,
  ManualEmpanelmentSubmitted = 55,
  IssueInDocumentNw = 56,
}

export enum EFdSource {
  Email = 1,
  Portal = 2,
  Phone = 3,
  Chat = 7,
  FeedbackWidget = 9,
  OutboundEmail = 10,
}

export enum EFdPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export enum EFdAssociationType {
  Parent = 1,
  Child = 2,
  Tracker = 3,
  Related = 4,
}

export enum EUserRoleHDFcErgo {
  LinkingTeam = 'Download',
  MailingTeam = 'View',
}

export enum InsuranceDivisionEnum {
  PPHC = 'PPHC',
  TUW = 'TUW',
}

export function convertTo12HourFormat(dateString: string): string {
  const [datePart, timePart] = dateString.split(' ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hour, minutes, seconds] = timePart.split(':').map(Number)

  const date = new Date(year, month - 1, day, hour, minutes, seconds)

  let hours12 = date.getHours()
  const minutes12 = String(date.getMinutes()).padStart(2, '0')
  const seconds12 = String(date.getSeconds()).padStart(2, '0')

  const ampm = hours12 >= 12 ? 'PM' : 'AM'
  hours12 = hours12 % 12
  hours12 = hours12 ? hours12 : 12

  const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
  return `${formattedDate} ${hours12}:${minutes12}:${seconds12} ${ampm}`
}

export const formatCurrency = (value) => {
  const numericValue = parseFloat(value)
  if (isNaN(numericValue)) return '0'
  return numericValue.toLocaleString('en-IN')
}

//only forDate
export function formatDateDDMMYY(dateInput) {
  // Split the date part from the time part
  const [datePart] = dateInput.split(' ')
  const [day, month, year] = datePart.split('/')

  // Return the formatted date in DD/MM/YYYY
  return `${day}/${month}/${year}`
}

export const formatDateDDMMYYYYTIME = (dateString) => {
  const date = new Date(dateString)

  // Extract parts of the date
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM' // Fixed 'a2' to '12'

  // Format date into the desired format: DD/MM/YYYY hh:mm:ss AM/PM
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`
}

export const encryptDetails = (formData, secretKey) => {
  const iv = CryptoJS.lib.WordArray.random(16)

  const encrypted = CryptoJS.AES.encrypt(formData, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  const encryptedString = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)

  return encryptedString
}

/////////////////////////////date function on excel file
export const formatDate = (dateString: string) => {
  if (typeof dateString === 'string') {
    const parsedDate = parseISO(dateString)
    const formattedDate = format(parsedDate, "dd MMMM',' yyyy", { locale: enUS })
    return formattedDate
  } else {
    return ''
  }
}

export const formatDateForFile = (dateString) => {
  const parsedDate = parseISO(dateString)
  const formattedDate = format(parsedDate, "dd'-'MM'-'yyyy", { locale: enUS })
  return formattedDate
}

export const formatMongoDBDateToTime = (mongoDBDate) => {
  const date = new Date(mongoDBDate)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const amOrPm = hours >= 12 ? 'PM' : 'AM'

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12

  // Ensure single digits have leading zero, e.g., 5:05 PM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  const timeString = `${formattedHours}:${formattedMinutes} ${amOrPm}`

  return timeString
}
