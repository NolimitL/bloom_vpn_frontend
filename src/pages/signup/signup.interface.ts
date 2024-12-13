import { ILoginData } from '~/pages/login/login.interface'

export interface ISignupData extends ILoginData {
  firstName: string
  lastName: string
}
