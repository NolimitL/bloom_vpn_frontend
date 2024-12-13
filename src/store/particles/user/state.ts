import { IUser } from '~/store/interfaces/user.data.interface'
import { IUIState } from '~/store/interfaces/_ui.state.interface'

export interface IUserState extends IUser, IUIState {
  photo?: string | undefined
}

export const InitialUserState: IUserState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  isVerified: false,
  photo: null,
  birthdate: null,
  phoneNumber: null,
  ui: {
    isLoading: false,
  },
}
