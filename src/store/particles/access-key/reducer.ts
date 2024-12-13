import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IAccessKeyState, InitialAccessKeysState } from '~/store/particles/access-key/state'
import {
  restoreAccessKeysData,
  setAccessKeysData,
  setAccessKeysLoading,
} from '~/store/particles/access-key/actions'

export const accessKeyReducer = reducerWithInitialState<IAccessKeyState>(InitialAccessKeysState)
  .case(setAccessKeysData, (state, payload) => ({
    ...state,
    data: payload,
  }))
  .case(setAccessKeysLoading, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: payload,
    },
  }))
  .case(restoreAccessKeysData, () => ({
    ...InitialAccessKeysState,
  }))
