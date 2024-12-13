import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { InitialUserState, IUserState } from '~/store/particles/user/state'
import {
  restoreUserData,
  setUserData,
  setUserLoading,
  setUserLocalization,
} from '~/store/particles/user/actions'

export const userReducer = reducerWithInitialState<IUserState>(InitialUserState)
  .case(setUserData, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(restoreUserData, () => ({
    ...InitialUserState,
  }))
  .case(setUserLoading, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: payload,
    },
  }))
  .case(setUserLocalization, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      localization: payload,
    },
  }))
