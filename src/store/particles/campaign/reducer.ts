import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { ICampaignState, InitialCampaignState } from '~/store/particles/campaign/state'
import { setCampaignsData, setCampaignsLoading } from '~/store/particles/campaign/action'

export const campaignReducer = reducerWithInitialState<ICampaignState>(InitialCampaignState)
  .case(setCampaignsData, (state, payload) => {
    const data = Array.from(state.data)
    payload.forEach((campaign) =>
      state.data.find((cmp) => cmp.id === campaign.id) ? null : data.unshift(campaign)
    )
    return {
      ...state,
      data,
    }
  })
  .case(setCampaignsLoading, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: payload,
    },
  }))
