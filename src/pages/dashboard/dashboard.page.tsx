import { ContentLayout } from '~/components/layouts/content/content.layout'
import { BlockLayout } from '~/components/layouts/block/block.layout'
import { ContentTitleLayout } from '~/components/layouts/content/content.title.layout'
import { SidebarItems } from '~/static/sidebar.items.static'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import styled from 'styled-components'
import { CopiedText } from '~/components/text/CopiedText'
import { ScrolledText } from '~/components/text/ScrolledText'
import { COLORS_MAP } from '~/styles/colors.map'
import { S_Button } from '~/components/buttons/Button'
import { useMemo } from 'react'
import { createAccessKey } from '~/store/particles/access-key/actions'
import { AccessKeyStatus } from '~/store/enums/access-key.status'
import { Line } from '~/components/line/Line'
import { Loading } from '~/components/animation/Loading'
import { InstructionPart } from '~/pages/dashboard/parts/instruction.part'
import { StyledNavLink } from '~/components/links/Link'

export function DashboardPage(): JSX.Element {
  const {
    subscriptionsState: {
      data: subscriptions,
      ui: { isLoading: subscriptionLoading },
    },
    accessKeyState: {
      data: accessKeys,
      ui: { isLoading: accessKeysLoading },
    },
  } = useSelector((root: RootState) => root)
  const dispatch = useDispatch()

  const keysAmount = useMemo(() => {
    return subscriptions
      .map((subscription) => subscription.product.devices)
      .reduce((acc, val) => acc + val, 0)
  }, [subscriptions])

  async function handleOnCreateKey(subscriptionId: string) {
    dispatch(createAccessKey(subscriptionId))
  }

  return (
    <>
      <ContentTitleLayout
        title="Dashboard page"
        subtitle="Main information about your networks"
        icon={SidebarItems.find((item) => item.id == 'dashboard').icon}
      />
      <ContentLayout half>
        <BlockLayout
          title="Your access keys"
          subtitle="Put a key to the app dashboard and connect to the network"
        >
          {subscriptionLoading ? (
            <Loading />
          ) : subscriptions.length > 0 ? (
            subscriptions.map((subscription, index) => (
              <SubscriptionWrapper key={index}>
                <div className="sub-title">
                  Subscription: <CopiedText className="sub-name">{subscription.code}</CopiedText>
                  &nbsp;
                </div>
                <Line />
                {accessKeysLoading ? (
                  <Loading />
                ) : accessKeys.length > 0 ? (
                  accessKeys.map((accessKey, idx) => (
                    <KeyWrapper key={idx}>
                      <div className="space">
                        <div>{idx + 1}.&nbsp;Name:</div>
                        <ScrolledText>{accessKey.keyName}</ScrolledText>
                        <KeyStatus status={accessKey.status}>{accessKey.status}</KeyStatus>
                      </div>
                      <div className="space key">
                        <div>Key:</div>
                        <CopiedText isHighlighted withIcon>
                          {accessKey.accessKey}
                        </CopiedText>
                      </div>
                    </KeyWrapper>
                  ))
                ) : (
                  <EmptyContent>
                    <div>You don't have any keys.</div>
                  </EmptyContent>
                )}
                <ButtonWrapper>
                  <S_Button
                    onClick={() => handleOnCreateKey(subscription.id)}
                    disabled={accessKeys.length === keysAmount}
                  >
                    Keys {accessKeys.length}/{keysAmount}: Create one
                  </S_Button>
                </ButtonWrapper>
              </SubscriptionWrapper>
            ))
          ) : (
            <div>
              You don't have any subscriptions.{' '}
              <StyledNavLink to="/payments">Choose a plan.</StyledNavLink>
            </div>
          )}
        </BlockLayout>
        <InstructionPart />
      </ContentLayout>
      <ContentLayout>
        {/*<BlockLayout title="Your data traffic"></BlockLayout>*/}
        {/* // TODO traffic data later */}
      </ContentLayout>
    </>
  )
}

const SubscriptionWrapper = styled.div`
  .sub-title {
    font-size: 16px;
    margin-bottom: 15px;
    .sub-name {
      font-weight: 500;
    }
  }
`

const KeyWrapper = styled.div`
  width: 100%;
  line-height: 1.8em;
  &:nth-child(3) {
    margin-top: 15px;
  }
  &:not(:nth-child(3)) {
    margin-top: 2.5em;
  }
  .space {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    column-gap: 0.5rem;
    &.key {
      margin-top: 10px;
    }
  }
`

const EmptyContent = styled.div`
  margin-top: 12px;
  text-align: center;
`

const KeyStatus = styled.div<{ status: AccessKeyStatus }>`
  white-space: nowrap;
  color: ${(props) =>
    Object.keys(COLORS_MAP.status).includes(props.status?.toLowerCase()) &&
    COLORS_MAP.status[props.status?.toLowerCase()]};
`

const ButtonWrapper = styled.div`
  margin-top: 20px;
`
