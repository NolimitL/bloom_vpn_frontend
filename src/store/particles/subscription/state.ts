import { ISubscription } from '~/store/interfaces/subscription.data.interface'
import { IUIState } from '~/store/interfaces/_ui.state.interface'

export interface ISubscriptionState extends IUIState {
  data: Array<ISubscription>
}

export const InitialSubscriptionsState: ISubscriptionState = {
  data: [],
  ui: {
    isLoading: false,
  },
}
