import { Container } from 'typedi'
import { NetworkService } from '~/backbone/services/network.service'

const networkService = Container.get(NetworkService)

/**
 * Provides NetworkService instance from DI
 */
export function useNetwork(): NetworkService {
  return networkService
}
