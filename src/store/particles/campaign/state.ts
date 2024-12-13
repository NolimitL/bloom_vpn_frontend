import { IUIState } from '~/store/interfaces/_ui.state.interface'
import { ICampaign } from '~/store/interfaces/campaign.data.interface'

export interface ICampaignState extends IUIState {
  data: Array<ICampaign>
}

export const InitialCampaignState: ICampaignState = {
  data: [],
  ui: {
    isLoading: false,
  },
}
