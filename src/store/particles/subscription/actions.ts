import actionCreatorFactory from 'typescript-fsa'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'
import { ISubscriptionState } from '~/store/particles/subscription/state'
import { ISubscription } from '~/store/interfaces/subscription.data.interface'

const actionCreator = actionCreatorFactory()
const asyncActionCreator = asyncFactory<ISubscriptionState>(actionCreator)
const networkService = Container.get(NetworkService)

export const setSubscriptionsData = actionCreator<Array<ISubscription>>('SET_SUBSCRIPTIONS')
export const setSubscriptionsLoading = actionCreator<boolean>('SET_SUBSCRIPTIONS_LOADING')
export const restoreSubscriptionsData = actionCreator<void>('RESTORE_SUBSCRIPTIONS_DATA')

export const fetchUserSubscriptions = asyncActionCreator<void, void>(
  'FETCH_USER_SUBSCRIPTIONS',
  async (_, dispatch) => {
    dispatch(setSubscriptionsLoading(true))
    try {
      const subscriptions = await networkService.getSubscriptions()

      dispatch(setSubscriptionsData(subscriptions))
    } catch (error) {
      console.error(`Unable to fetch user subscriptions: ${error}`)
    } finally {
      dispatch(setSubscriptionsLoading(false))
    }
  }
)
