import { CountryCode } from '~/static/countries.code.static'

export interface IUIState {
  ui: {
    isLoading: boolean
    localization?: CountryCode
  }
}
