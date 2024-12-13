import actionCreatorFactory from 'typescript-fsa'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'
import { ICampaignState } from '~/store/particles/campaign/state'
import { ICampaign, ICampaignParameters } from '~/store/interfaces/campaign.data.interface'
import { setProductsData } from '~/store/particles/product/actions'

const actionCreator = actionCreatorFactory()
const asyncActionCreator = asyncFactory<ICampaignState>(actionCreator)
const networkService = Container.get(NetworkService)

export const setCampaignsData = actionCreator<Array<ICampaign>>('SET_CAMPAIGNS')
export const setCampaignsLoading = actionCreator<boolean>('SET_CAMPAIGNS_LOADING')

export const fetchMainCampaign = asyncActionCreator<void, void>(
  'FETCH_MAIN_CAMPAIGN',
  async (_, dispatch) => {
    try {
      const campaign = await networkService.getMainCampaign()

      dispatch(setCampaignsData([campaign]))
      dispatch(setProductsData(campaign.products))
    } catch (error) {
      console.error(`Unable to fetch campaigns: ${error}`)
    } finally {
      dispatch(setCampaignsLoading(false))
    }
  }
)

export const fetchCampaigns = asyncActionCreator<ICampaignParameters | void, void>(
  'FETCH_CAMPAIGNS',
  async (params, dispatch) => {
    dispatch(setCampaignsLoading(true))
    try {
      const campaigns = await networkService.findCampaigns(params || null)
      const camps: Array<ICampaign> = []
      for (const { id } of campaigns) {
        try {
          const campaign = await networkService.getCampaign(id)
          camps.push(campaign)
        } catch (error) {
          console.error(`Unable to find certain campaign with id [${id}]: ${error}`)
        }
      }
      dispatch(setCampaignsData(camps))
      camps.forEach((camp) => dispatch(setProductsData(camp.products)))
    } catch (error) {
      console.error(`Unable to fetch campaigns: ${error}`)
    } finally {
      dispatch(setCampaignsLoading(false))
    }
  }
)
