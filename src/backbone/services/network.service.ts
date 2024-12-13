import { Service } from 'typedi'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { backendBaseUrl } from '~/environment'
import { IIntentionForm } from '~/pages/intention/intention.form'
import { ILoginData } from '~/pages/login/login.interface'
import { ILocalization, IToken } from '~/backbone/services/network.interfaces'
import { IUser } from '~/store/interfaces/user.data.interface'
import { ISignupData } from '~/pages/signup/signup.interface'
import { IProduct } from '~/store/interfaces/product.data.interface'
import { ISubscription } from '~/store/interfaces/subscription.data.interface'
import { IAccessKey } from '~/store/interfaces/access-key.data.interface'
import { IUpdateUserData, IUpdateUserPasswordData } from '~/pages/settings/settings.interface'
import {
  IPasswordResetData,
  IPasswordResetRequestData,
} from '~/pages/password-reset/password-reset.interface'
import { ICampaign, ICampaignParameters } from '~/store/interfaces/campaign.data.interface'

const backendUrl = backendBaseUrl()

/**
 * All requests to custom endpoint can appear here
 * To get class instance use the hook useNetwork()
 * @constructor
 * @example
 *      const network = useNetwork()
 *      network.createProduct(product)
 */
@Service()
export class NetworkService {
  private httpClient: AxiosInstance

  async authGuard(res: AxiosResponse): Promise<void> {
    if (res.status == 401) {
      if (window && window.location) {
        await this.logout()
        window.location.href = 'login'
      }
    }
  }

  constructor() {
    if (!backendUrl) {
      throw new Error(`Backend URL is not specified!`)
    }

    this.httpClient = axios.create({
      baseURL: backendUrl,
      withCredentials: true,
    })

    this.httpClient.interceptors.response.use(
      (res) => {
        return res // Forward response
      },
      async (err: AxiosError<any, any>) => {
        await this.authGuard(err.response)
        const data = err.response?.data

        if (data && data?.message) {
          throw new Error(data.message)
        }
        throw err // Forward error
      }
    )
  }

  /* Internal 3rd parties requests */

  // ---

  /* --- API Requests --- */

  // Temporary intention
  async saveIntention(emailBody: IIntentionForm): Promise<void | string> {
    const { data } = await this.httpClient.post('/intentions', emailBody)
    if (data) {
      return data
    }
    return
  }

  async isEmailInUse(email: string): Promise<boolean> {
    return await this.httpClient.post(
      '/auth/validate/email',
      {
        username: email,
      },
      {
        headers: {
          time: new Date().getTime().toString(),
        },
      }
    )
  }

  /* Authorization */

  async login(loginData: ILoginData): Promise<IToken> {
    const { data } = await this.httpClient.post<ILoginData, AxiosResponse<IToken>>(
      '/auth/login',
      loginData
    )
    return data
  }

  async signup(signupData: ISignupData): Promise<void> {
    await this.httpClient.post<void, AxiosResponse<void>>('/auth/signup', signupData)
  }

  async logout(): Promise<void> {
    await this.httpClient.post<void, AxiosResponse<void>>('/auth/logout')
  }

  async requestPasswordResetLink(requestData: IPasswordResetRequestData): Promise<boolean> {
    try {
      await this.httpClient.post('/auth/reset/link', requestData)
      return true
    } catch {
      return false
    }
  }

  async verifyResetToken(tokenData: IToken): Promise<boolean> {
    const { data } = await this.httpClient.post('/auth/reset/token/verify', tokenData)
    return data
  }

  async resetPassword(passwordResetData: IPasswordResetData): Promise<void> {
    await this.httpClient.post('/auth/reset/password', passwordResetData)
  }

  /*  User  */

  async confirmEmail(token: string): Promise<boolean> {
    return this.httpClient.post('/confirm/email', {
      token,
    })
  }

  async getUserData(): Promise<IUser> {
    const { data } = await this.httpClient.get<void, AxiosResponse<IUser>>('/users')
    return data
  }

  async updateUser(updateUserData: IUpdateUserData): Promise<IUser> {
    const { data } = await this.httpClient.put<IUpdateUserData, AxiosResponse<IUser>>(
      '/users',
      updateUserData
    )
    return data
  }

  async updateUserPassword(updatePasswordData: IUpdateUserPasswordData): Promise<void> {
    await this.httpClient.put<IUpdateUserPasswordData, AxiosResponse<void>>(
      '/users/password',
      updatePasswordData
    )
  }

  // --- IP Lookup
  async getUserLocalization(): Promise<ILocalization> {
    const { data } = await this.httpClient.get<void, AxiosResponse<ILocalization>>(
      '/users/localization'
    )
    return data
  }

  /*  Product  */

  async getProducts(): Promise<Array<IProduct>> {
    const { data } = await this.httpClient.get<void, AxiosResponse<Array<IProduct>>>(
      '/products/main'
    )
    return data
  }

  /*  Campaigns  */

  async getCampaign(campaignId: string): Promise<ICampaign> {
    const { data } = await this.httpClient.get<void, AxiosResponse<ICampaign>>(
      `/campaigns/find/${campaignId}`
    )
    return data
  }

  async getMainCampaign(): Promise<ICampaign> {
    const { data } = await this.httpClient.get<void, AxiosResponse<ICampaign>>('/campaigns/main')
    return data
  }

  async findCampaigns(params?: Partial<ICampaignParameters>): Promise<Array<ICampaign>> {
    const { data } = await this.httpClient.get<void, AxiosResponse<Array<ICampaign>>>(
      `/campaigns`,
      {
        params: params,
      }
    )
    return data
  }

  /*  Subscription  */

  // NOTE for trial only
  async createTrialSubscription(): Promise<void> {
    await this.httpClient.post(`/subscriptions/trial`)
  }

  async getSubscription(id: string): Promise<void> {
    // TODO make payment flow
  }

  async getSubscriptions(): Promise<Array<ISubscription>> {
    const { data } = await this.httpClient.get<void, AxiosResponse<Array<ISubscription>>>(
      '/subscriptions'
    )
    return data
  }

  /*  Access Keys  */

  async getAccessKeys(): Promise<Array<IAccessKey>> {
    const { data } = await this.httpClient.get<void, AxiosResponse<Array<IAccessKey>>>(
      '/access-keys'
    )
    return data
  }

  async createAccessKey(subscriptionId: string): Promise<IAccessKey> {
    const { data } = await this.httpClient.post<void, AxiosResponse<IAccessKey>>(
      `/access-keys/subscription/${subscriptionId}`
    )
    return data
  }
}
