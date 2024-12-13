import actionCreatorFactory from 'typescript-fsa'
import { ILoginData } from '~/pages/login/login.interface'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { IUserState } from '~/store/particles/user/state'
import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'
import { IUser } from '~/store/interfaces/user.data.interface'
import { ISignupData } from '~/pages/signup/signup.interface'
import { IUpdateUserData, IUpdateUserPasswordData } from '~/pages/settings/settings.interface'
import { restoreSubscriptionsData } from '~/store/particles/subscription/actions'
import { restoreAccessKeysData } from '~/store/particles/access-key/actions'
import { CountryCode } from '~/static/countries.code.static'

const actionCreator = actionCreatorFactory()
const asyncActionCreator = asyncFactory<IUserState>(actionCreator)
const networkService = Container.get(NetworkService)

export const setUserData = actionCreator<IUser>('SET_USER_DATA')
export const restoreUserData = actionCreator<void>('RESTORE_USER_DATA')
export const setUserLoading = actionCreator<boolean>('SET_USER_LOADING')
export const setUserLocalization = actionCreator<CountryCode>('SET_USER_LOCALIZATION')

export const fetchUserData = asyncActionCreator<void, Promise<IUser>>(
  'FETCH_USER_DATA',
  async (_, dispatch) => {
    dispatch(setUserLoading(true))
    try {
      const userData = await networkService.getUserData()

      dispatch(setUserData(userData))
      return userData
    } catch (error) {
      console.error(`Unable to fetch user data: ${error}`)
      return null
    } finally {
      dispatch(setUserLoading(false))
    }
  }
)

export const confirmEmail = asyncActionCreator<string, boolean>('CONFIRM_EMAIL', async (token) => {
  try {
    return await networkService.confirmEmail(token)
  } catch (error) {
    console.error(`Unable to confirm user email: ${error}`)
    return false
  }
})

export const loginUser = asyncActionCreator<ILoginData, void>('LOGIN_USER', async (data) => {
  try {
    await networkService.login(data)
  } catch (error) {
    console.error(`Unable to login user: ${error}`)
  }
})

export const registerUser = asyncActionCreator<ISignupData, void>('REGISTER_USER', async (data) => {
  try {
    await networkService.signup(data)
  } catch (error) {
    console.error(`Unable to register user: ${error}`)
  }
})

export const updateUser = asyncActionCreator<IUpdateUserData, void>(
  'UPDATE_USER',
  async (data, dispatch) => {
    try {
      const userData = await networkService.updateUser(data)

      dispatch(setUserData(userData))
    } catch (error) {
      console.error(`Unable to update user data: ${error}`)
    }
  }
)

export const updateUserPassword = asyncActionCreator<IUpdateUserPasswordData, void>(
  'UPDATE_USER_PASSWORD',
  async (data) => {
    try {
      await networkService.updateUserPassword(data)
    } catch (error) {
      console.error(`Unable to update user password: ${error}`)
    }
  }
)

export const logoutUser = asyncActionCreator<void, void>('LOGOUT_USER', async (_, dispatch) => {
  try {
    await networkService.logout()
  } catch (error) {
    console.error(`Unable to logout user: ${error}`)
  } finally {
    dispatch(restoreUserData())
    dispatch(restoreSubscriptionsData())
    dispatch(restoreAccessKeysData())
  }
})
