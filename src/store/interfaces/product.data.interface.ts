export interface IProduct {
  id: string
  name: string
  description: string
  price: IProductPrice
  devices: number
  /**
   * Amount of traffic in GB
   */
  traffic: number
  metadata?: IProductMetadata
}

/**
 * All prices in cents.
 * Use formatCents() function to get real price format.
 */
export interface IProductPrice {
  monthly: number
  annually: number
  currency: string
}

/**
 * Metadata about product
 */
export interface IProductMetadata {
  position?: number
  time_period?: number
}
