import { IAccessKey } from '~/store/interfaces/access-key.data.interface'
import { IUIState } from '~/store/interfaces/_ui.state.interface'

export interface IAccessKeyState extends IUIState {
  data: Array<IAccessKey>
}

export const InitialAccessKeysState: IAccessKeyState = {
  data: [],
  ui: {
    isLoading: false,
  },
}
