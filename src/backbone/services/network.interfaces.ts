import { CountryCode } from '~/static/countries.code.static'

export interface IToken {
  token: string
}

export class ILocalization {
  ip: string
  country: CountryCode
}
