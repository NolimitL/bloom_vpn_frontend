import actionCreatorFactory from 'typescript-fsa'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'
import { IProduct } from '~/store/interfaces/product.data.interface'
import { IProductState } from '~/store/particles/product/state'

const actionCreator = actionCreatorFactory()
const asyncActionCreator = asyncFactory<IProductState>(actionCreator)
const networkService = Container.get(NetworkService)

export const setProductsData = actionCreator<Array<IProduct>>('SET_PRODUCTS')
export const setProductsLoading = actionCreator<boolean>('SET_PRODUCTS_LOADING')

export const fetchProducts = asyncActionCreator<void, void>(
  'FETCH_PRODUCTS',
  async (_, dispatch) => {
    dispatch(setProductsLoading(true))
    try {
      const products = await networkService.getProducts()

      dispatch(setProductsData(products))
    } catch (error) {
      console.error(`Unable to fetch products: ${error}`)
    } finally {
      dispatch(setProductsLoading(false))
    }
  }
)
