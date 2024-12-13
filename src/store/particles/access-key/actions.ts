import actionCreatorFactory from 'typescript-fsa'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'
import { IAccessKeyState } from '~/store/particles/access-key/state'
import { IAccessKey } from '~/store/interfaces/access-key.data.interface'

const actionCreator = actionCreatorFactory()
const asyncActionCreator = asyncFactory<IAccessKeyState>(actionCreator)
const networkService = Container.get(NetworkService)

export const setAccessKeysData = actionCreator<Array<IAccessKey>>('SET_ACCESS_KEYS')
export const setAccessKeysLoading = actionCreator<boolean>('SET_ACCESS_KEYS_LOADING')
export const restoreAccessKeysData = actionCreator<void>('RESTORE_ACCESS_KEYS_DATA')

export const fetchAccessKeys = asyncActionCreator<void, void>(
  'FETCH_ACCESS_KEYS',
  async (_, dispatch) => {
    dispatch(setAccessKeysLoading(true))
    try {
      const accessKeys = await networkService.getAccessKeys()

      dispatch(setAccessKeysData(accessKeys))
    } catch (error) {
      console.error(`Unable to fetch access keys: ${error}`)
    } finally {
      dispatch(setAccessKeysLoading(false))
    }
  }
)

export const createAccessKey = asyncActionCreator<string, void>(
  'CREATE_ACCESS_KEY',
  async (subscriptionId, dispatch) => {
    try {
      if (subscriptionId) {
        await networkService.createAccessKey(subscriptionId)
      }

      dispatch(fetchAccessKeys())
    } catch (error) {
      console.error(`Unable to create an access key: ${error}`)
    }
  }
)
