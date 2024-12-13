import { useNetwork } from '~/backbone/hooks/network.hook'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocalization } from '~/store/particles/user/actions'
import { CountryCode } from '~/static/countries.code.static'

export function IpLookupWrapper(): JSX.Element {
  const networkService = useNetwork()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const localizationData = await networkService.getUserLocalization()
      if (
        localizationData.country &&
        Object.values(CountryCode).includes(localizationData.country)
      ) {
        dispatch(setUserLocalization(localizationData.country))
      }
    })()
  }, [])

  return null
}
