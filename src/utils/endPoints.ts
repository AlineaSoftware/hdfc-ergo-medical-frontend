export const enum AUTH_ENDPOINT {
  Login = '/admin/auth/login',
  CurrentUser = '/admin/auth/profile',
  ForgotPassword = '/HDFCERGO/ValidateEmail',
  ResetPassword = '/HDFCERGO/ChangePassword',
  salesLogin = '/sales/auth/login',
  Logout = '/admin/auth/logout',
  HardLogOut = '/HDFCERGO/HardLogout',
}

export const enum SALES_DETAILS {
  getUserList = '/sales/cases/list',
  getAllDetails = '/sales/cases/details',
  insertAllDetails = '/HDFCERGO/InsertApptDetails',
  callDisposition = '/sales/cases/call-disposition',
  proposerStatus = '/sales/cases/status',
  callDetails = '/HDFCERGO/GetCallDetails',
  pinCodeAPI = '/HDFCERGO/GetDCName',
}

export const enum MEDICAL_DETAILS {
  getMedicalUserDetails = '/medical/cases/list',
  getMedicalUserAllDetails = '/medical/cases/proposal-list',
  getMedicalUserOtherDetails = '/medical/cases/proposal-detail',
  getMedicalUserInsuredMedicalDetails = '/HDFCERGO/GetInsurerMedicalDetails',
  getMedicalCallDetails = '/HDFCERGO/GetCallMedicalDetails',
  getMedicalDispositionDetails = '/HDFCERGO/GetCallMedicalDispositions',
  getMedicalDCDetails = '/HDFCERGO/GetDCDetails',
  getMedicalBulkReport = '/medical/report/list',
  getMedicalBulkReportZip = '/HDFCERGO/DownloadPdfs/DownloadPdfs',
  getMedicalAudioDownload = '/HDFCERGO/DownloadAudio/DownloadAudio',
  getMSIDetails = '/HDFCERGO/GetMISDetails',
}

export enum MSI {
  Export_Excel = 'medical/mis/export',
}

export const enum EMPANELMENT_REQUEST {
  Pincode = '/other/search-pincode',
  Empanelment_Send = '/ticket/create',
  Empanelment_New_Request = '/ticket/list/new-requests',
  Empanelment_Open_Request = '/prospective-provider/open-req/list',
  Empanelment_Close_Request = '/ticket/list/closed-requests',
}

export const enum PERSPECTIVE_PROVIDER {
  Create = '/prospective-provider/create',
  Add = '/prospective-provider/add',
  Delete = '/prospective-provider/delete',
  Get = '/prospective-provider/get',
}

export const enum MANUAL_EMPANELMENT {
  Create = '/temp-empanelment/manual-create',
  Get = '/prospective-provider/details',
  Edit = '/temp-empanelment/edit/nw',
  CreatePartial = '/partial-empanelment/save',
}

export const enum AUTO_EMPANELMENT {
  Create = '/temp-empanelment/self-create',
  Edit = '/temp-empanelment/edit/dc',
}

export const enum DROPDOWN {
  Council = '/council/dropdown',
  Qualification = '/qualification/dropdown',
  Ownership = '/ownership-type/dropdown',
}

export const enum EMPANELMENT_COUNT_AND_LIST {
  Count = '/temp-empanelment/count',
  List = '/temp-empanelment/list',
  GetOne = '/temp-empanelment/get-one',
  VerifyByNetwork = '/temp-empanelment/change-status-nw',
  VerifyByLegal = '/temp-empanelment/change-status-legal',
  DocumentSignature = '/temp-empanelment/proceed-docusign',
  ListForLegal = '/temp-empanelment/legal-list',
}

export enum PROVIDER_SEARCH {
  MainSearch = '/provider/main-search',
  Details = '/provider/details',
}

export enum MANAGE_REQUEST {
  MainSearch = '/provider/manage-search',
  CreateDelist = '/delist-request/create',
  ChangeStatusForDelist = '/delist-request/change-status',
  ChangeStatusNwForDelist = '/delist-request/change-status-nw',
  CreateModify = '/provider-insurer-manage-req/create',
  ChangeStatusForModify = '/provider-insurer-manage-req/change-status',
  ChangeStatusNwForModify = '/provider-insurer-manage-req/change-status-nw',
}

export enum VERIFICATION {
  VerifyAadhaarcard = '/verification/verify-aadhar',
  VerifyPancard = '/verification/verify-pan',
  VerifyBank = '/verification/verify-bank',
  VerifyCompany = '/verification/verify-company',
}
