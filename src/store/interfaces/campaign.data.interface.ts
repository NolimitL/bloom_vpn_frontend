import { CountryCode } from '~/static/countries.code.static'
import { IProduct } from '~/store/interfaces/product.data.interface'

export interface ICampaign {
  id: string
  name: string
  parameters?: ICampaignParameters
  products: Array<IProduct>
}

export interface ICampaignParameters {
  localization: CountryCode | undefined
  period: number | undefined
}
