export interface IPasswordResetData {
  token: string
  password: string
}

export interface IPasswordResetRequestData {
  email: string
}

export interface IResetPassword {
  password: string
  repeat_password: string
}
