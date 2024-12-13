export interface IUpdateUserData {
  email?: string
  firstName?: string
  lastName?: string
  birthdate?: string
  phoneNumber?: string
}

/**
 * Following fields require single requests to update them
 */
export interface IUpdateUserPasswordData {
  password: string
  newPassword: string
}

// TODO create update photo flow
