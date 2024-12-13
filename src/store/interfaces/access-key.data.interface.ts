import { AccessKeyStatus } from '~/store/enums/access-key.status'

export interface IAccessKey {
  id: string
  subscriptionId: string
  accessKey: string
  keyName: string
  /**
   * Amount of data in GB
   */
  dataLimit: number
  status: AccessKeyStatus
}
