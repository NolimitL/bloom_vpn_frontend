import { ContentLayout } from '~/components/layouts/content/content.layout'
import { BlockLayout } from '~/components/layouts/block/block.layout'
import { ContentTitleLayout } from '~/components/layouts/content/content.title.layout'
import { SidebarItems } from '~/static/sidebar.items.static'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import styled from 'styled-components'
import { Loading } from '~/components/animation/Loading'
import { Card } from '~/elements/card/card.element'
import { formatCents } from '~/backbone/utils/formatCurrency.util'
import { COLORS_MAP } from '~/styles/colors.map'
import { CardsWrapper } from '~/elements/card/card.element'
import { PaymentMethodPart } from '~/pages/payments/parts/payment-method.part'
import { useNetwork } from '~/backbone/hooks/network.hook'
import { fetchUserSubscriptions } from '~/store/particles/subscription/actions'

export function PaymentsPage(): JSX.Element {
  const {
    productState: { data: products },
    subscriptionsState: { data: subscriptions },
    campaignState: { data: campaigns },
  } = useSelector((root: RootState) => root)
  const networkService = useNetwork()
  const dispatch = useDispatch()

  async function chooseProduct(productId: string): Promise<void> {
    try {
      if (products.find((product) => product.name === 'Trial').id === productId) {
        await networkService.createTrialSubscription()
      } else {
        await networkService.getSubscription(productId)
      }
      dispatch(fetchUserSubscriptions())
    } catch (error) {
      // TODO put the error to notification
      console.error(error)
    }
  }

  return (
    <>
      <ContentTitleLayout
        title="Payments page"
        subtitle="Set up your payment method and view transactions"
        icon={SidebarItems.find((item) => item.id == 'payments').icon}
      />
      <ContentLayout>
        <BlockLayout title="Available plans" withOwnContent>
          {campaigns.length > 0 ? (
            <C_CardsWrapper>
              {campaigns.map((campaign) => (
                <>
                  {campaign.products
                    .sort((a, b) => a.metadata.position - b.metadata.position)
                    .map((product, idx) => (
                      <Card
                        key={product.metadata?.position || idx}
                        className={
                          !!subscriptions.find((sub) => sub.product.id === product.id)
                            ? 'active'
                            : ''
                        }
                        onClick={() => chooseProduct(product.id)}
                        disabled={
                          // product.name.toLowerCase() !== 'trial' ||
                          !!subscriptions.find((sub) => sub.product.id === product.id)
                        }
                        buttonTitle={
                          !!subscriptions.find((sub) => sub.product.id === product.id)
                            ? 'Your current plan'
                            : product.name === 'Trial'
                            ? 'Try for free'
                            : 'Get started'
                        }
                      >
                        <ContentWrapper>
                          {product.name == 'Liberty' ? (
                            <>
                              <img
                                src="/src/assets/flags/liberty.jpg"
                                alt="flag"
                                className="flag"
                              />
                            </>
                          ) : null}
                          <div className="title">{product.name}</div>
                          {product.description && (
                            <div className="description">
                              "<span className="__value">{product.description}</span>"
                            </div>
                          )}
                          <div className="info">
                            <div className="price __title">Price</div>
                            <div className="devices __title">Devices</div>
                            <div className="traffic __title">Traffic</div>
                            <div className="price __value">
                              {product.price.monthly == 0
                                ? 'Free'
                                : formatCents(product.price.monthly, product.price.currency)}
                            </div>
                            <div className="devices __value">{product.devices}</div>
                            <div className="traffic __value">
                              {product.traffic >= 1000
                                ? product.traffic / 1000 + ' TB'
                                : product.traffic + ' GB'}
                            </div>
                          </div>
                          {product.metadata && product.metadata.time_period ? (
                            <div className="time-period">
                              Period:{' '}
                              {product.metadata.time_period == 1
                                ? `${product.metadata.time_period} month`
                                : `${product.metadata.time_period} months`}
                            </div>
                          ) : null}
                        </ContentWrapper>
                      </Card>
                    ))}
                </>
              ))}
            </C_CardsWrapper>
          ) : (
            <Loading />
          )}
        </BlockLayout>
        <PaymentMethodPart />
      </ContentLayout>
    </>
  )
}

const C_CardsWrapper = styled(CardsWrapper)`
  .active .card-button {
    color: ${COLORS_MAP.standard.halfWhite};
    text-decoration: underline;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  background-color: ${COLORS_MAP.dashboard.elements.layout.content};
  padding: 20px 15px 15px;
  row-gap: 10px;
  position: relative;

  .flag {
    height: 25px;
    width: 80px;
    position: absolute;
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: -21px;
    top: 7px;
  }

  .title {
    font-size: 18px;
  }

  .description {
    font-size: 14px;
    margin-bottom: 5px;

    .__value {
      font-style: italic;
    }
  }

  .info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    margin-top: 10px;

    .price,
    .devices,
    .traffic {
      width: 100%;
      text-align: center;
      padding: 3px 1px;

      &.__title {
        border-bottom: 0.5px solid ${COLORS_MAP.standard.halfWhite};
      }
    }

    .devices {
      &.__title,
      &.__value {
        border-right: 0.5px solid ${COLORS_MAP.standard.halfWhite};
        border-left: 0.5px solid ${COLORS_MAP.standard.halfWhite};
      }
    }
  }
`
