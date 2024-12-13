import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { InitialProductsState, IProductState } from '~/store/particles/product/state'
import { setProductsData, setProductsLoading } from '~/store/particles/product/actions'

export const productReducer = reducerWithInitialState<IProductState>(InitialProductsState)
  .case(setProductsData, (state, payload) => {
    const data = Array.from(state.data)
    payload.forEach((product) =>
      state.data.find((prod) => prod.id === product.id) ? null : data.unshift(product)
    )
    return {
      ...state,
      data,
    }
  })
  .case(setProductsLoading, (state, payload) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: payload,
    },
  }))
