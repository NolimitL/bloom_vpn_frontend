import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { InitialSubscriptionsState, ISubscriptionState } from '~/store/particles/subscription/state'
import {
  restoreSubscriptionsData,
  setSubscriptionsData,
  setSubscriptionsLoading,
} from '~/store/particles/subscription/actions'

export const subscriptionReducer = reducerWithInitialState<ISubscriptionState>(
  InitialSubscriptionsState
)
  .case(setSubscriptionsData, (state, payload) => ({
    ...state,
    data: payload,
  }))
  .case(setSubscriptionsLoading, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: payload,
    },
  }))
  .case(restoreSubscriptionsData, () => ({
    ...InitialSubscriptionsState,
  }))
