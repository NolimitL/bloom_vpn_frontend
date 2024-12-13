import { IProduct } from '~/store/interfaces/product.data.interface'
import { IUIState } from '~/store/interfaces/_ui.state.interface'

export interface IProductState extends IUIState {
  data: Array<IProduct>
}

export const InitialProductsState: IProductState = {
  data: [],
  ui: {
    isLoading: false,
  },
}
