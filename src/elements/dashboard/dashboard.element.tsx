import { PropsWithChildren, useEffect } from 'react'
import styled from 'styled-components'
import { Sidebar } from '~/elements/sidebar/sidebar.element'
import { SidebarItems } from '~/static/sidebar.items.static'
import { Navbar } from '~/elements/navbar/navbar.element'
import { COMMON_STYLED_CONFIG } from '~/styles/common.styled.config'
import { fetchUserSubscriptions } from '~/store/particles/subscription/actions'
import { fetchAccessKeys } from '~/store/particles/access-key/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import { fetchCampaigns, fetchMainCampaign } from '~/store/particles/campaign/action'

/**
 * Common dashboard element
 * @constructor
 */
export function Dashboard(props: PropsWithChildren<any>): JSX.Element {
  const { children } = props
  const dispatch = useDispatch()
  const {
    ui: { localization },
  } = useSelector(({ userState }: RootState) => userState)

  useEffect(() => {
    dispatch(fetchUserSubscriptions())
    dispatch(fetchMainCampaign())
    dispatch(fetchAccessKeys())
    dispatch(fetchCampaigns())
  }, [])

  useEffect(() => {
    if (localization) {
      dispatch(
        fetchCampaigns({
          localization,
          period: null,
        })
      )
    }
  }, [localization])

  return (
    <DashboardWrapper>
      <Sidebar items={SidebarItems} />
      <ContentWrapper>
        <Navbar />
        <ScrolledWrapper>
          <>{children}</>
        </ScrolledWrapper>
      </ContentWrapper>
    </DashboardWrapper>
  )
}

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  column-gap: 1px;
  align-items: flex-start;
  justify-content: flex-start;
`

const ContentWrapper = styled.div`
  width: 80%;
  height: 100%;
  row-gap: 1px;

  @media (max-width: 800px) {
    width: calc(100% - ${COMMON_STYLED_CONFIG.Tablet.SideBarWidth}px);
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`

const ScrolledWrapper = styled.div`
  padding: 25px 30px;
  overflow-y: auto;
  height: calc(100% - ${COMMON_STYLED_CONFIG.NavBarHeight}px);

  @media (max-width: 600px) {
    padding: 20px 10px;
  }

  @media (max-width: 500px) {
    padding: 0 10px 10px;
  }
`
