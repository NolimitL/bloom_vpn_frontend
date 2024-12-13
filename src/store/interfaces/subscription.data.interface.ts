import { IProduct } from '~/store/interfaces/product.data.interface'

export interface ISubscription {
  id: string
  userId: string
  productId: string
  code: string
  startDate: Date
  endDate: Date
  product: IProduct
}
