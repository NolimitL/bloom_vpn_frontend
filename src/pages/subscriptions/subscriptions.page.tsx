import { SidebarItems } from '~/static/sidebar.items.static'
import { BlockContentWrapper, BlockLayout } from '~/components/layouts/block/block.layout'
import { Card, CardsWrapper } from '~/elements/card/card.element'
import { ContentTitleLayout } from '~/components/layouts/content/content.title.layout'
import { ContentLayout } from '~/components/layouts/content/content.layout'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import { COLORS_MAP } from '~/styles/colors.map'
import { Line } from '~/components/line/Line'
import { formatDataToSlashString } from '~/backbone/utils/formatDate.util'
import { CopiedText } from '~/components/text/CopiedText'
import { Loading } from '~/components/animation/Loading'
import { StyledNavLink } from '~/components/links/Link'

export function SubscriptionsPage(): JSX.Element {
  const {
    subscriptionsState: {
      data: subscriptions,
      ui: { isLoading: subscriptionLoading },
    },
    accessKeyState: { data: accessKeys },
  } = useSelector((root: RootState) => root)

  return (
    <>
      <ContentTitleLayout
        title="Subscription page"
        subtitle="Manage your subscriptions"
        icon={SidebarItems.find((item) => item.id == 'subscriptions').icon}
      />
      <ContentLayout>
        <BlockLayout title="Your subscriptions" withOwnContent>
          {subscriptionLoading ? (
            <Loading />
          ) : subscriptions.length > 0 ? (
            <CardsWrapper>
              {subscriptions.map((subscription, idx) => (
                <Card key={idx} half>
                  <ContentWrapper>
                    <div className="sub-title">
                      <div>
                        <span className="__title">Plan</span>:&nbsp;
                        <span className="sub-name">{subscription.product.name}</span>&nbsp;
                        <div>
                          <CopiedText className="sub-name">{subscription.code}</CopiedText>
                        </div>
                      </div>
                      <div>
                        <div className="start-date">
                          <span className="__title">Start date:</span>&nbsp;
                          {formatDataToSlashString(subscription.startDate) || '-'}
                        </div>
                        {/*{subscription.endDate && (*/}
                        <div className="end-date">
                          <span className="__title">End date:</span>&nbsp;
                          {formatDataToSlashString(subscription.endDate) || '-'}
                        </div>
                        {/*)}*/}
                      </div>
                    </div>
                    <Line />
                    <div className="info">
                      <div className="devices">
                        Connected devices:{' '}
                        {accessKeys.filter((key) => key.subscriptionId === subscription.id).length}
                        &nbsp;of&nbsp;
                        {subscription.product.devices}
                      </div>
                      <div className="traffic">
                        Maximum traffic:&nbsp;
                        {subscription.product.traffic > 1000
                          ? subscription.product.traffic / 1000 + ' TB'
                          : subscription.product.traffic + ' GB'}
                      </div>
                    </div>
                  </ContentWrapper>
                </Card>
              ))}
            </CardsWrapper>
          ) : (
            <C_BlockContentWrapper>
              <div>
                You don't have any subscriptions.{' '}
                <StyledNavLink to="/payments">Choose a plan.</StyledNavLink>
              </div>
            </C_BlockContentWrapper>
          )}
        </BlockLayout>
      </ContentLayout>
    </>
  )
}

const C_BlockContentWrapper = styled(BlockContentWrapper)`
  padding: 12px 20px;
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${COLORS_MAP.dashboard.elements.layout.content};
  padding: 20px 15px;
  .__title {
    font-size: 14px;
  }
  .sub-title {
    font-size: 16px;
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .sub-name {
      font-weight: 500;
      padding: 0;
    }
  }
  .info {
    margin-top: 15px;
    display: flex;
    flex-flow: column nowrap;
    row-gap: 5px;
  }
`
