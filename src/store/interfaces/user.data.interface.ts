export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  birthdate?: string | undefined
  phoneNumber?: string | undefined
}
