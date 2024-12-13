/**
 * LIST OF ALL REDUCERS
 */
import { userReducer } from '~/store/particles/user/reducer'
import { subscriptionReducer } from '~/store/particles/subscription/reducer'
import { productReducer } from '~/store/particles/product/reducer'
import { accessKeyReducer } from '~/store/particles/access-key/reducer'
import { campaignReducer } from '~/store/particles/campaign/reducer'

// TODO create notifications reducer

export const reducers = {
  userState: userReducer,
  subscriptionsState: subscriptionReducer,
  productState: productReducer,
  accessKeyState: accessKeyReducer,
  campaignState: campaignReducer,
}
