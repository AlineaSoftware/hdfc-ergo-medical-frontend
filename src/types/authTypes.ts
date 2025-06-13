export type SignInFormFields = {
  email?: string
  contactCode?: string
  password: string
  deviceType?: string
  notificationToken?: string
}

export type SignInFormForSalesFields = {
  proposal_no: string
}

export type SignUpFormFields = {
  name: string
  person_name: string
  email: string
  contact_no: string
  type: any
  permission: boolean
}

export type ForgetPassFields = {
  email: string
}

export type ResetPasswordFields = {
  password: string
  confirm_password: string
}

export type SalesLogin = {
  proposalNum: string
  deviceType: string
  notificationToken: string
}
