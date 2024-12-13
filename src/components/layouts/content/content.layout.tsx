import styled from 'styled-components'
import { PropsWithChildren } from 'react'
import { COMMON_STYLED_CONFIG } from '~/styles/common.styled.config'

export interface IContentLayoutProps {
  /**
   * Either full width or 50%
   */
  half?: boolean

  stable?: boolean
}

export function ContentLayout(props: PropsWithChildren<IContentLayoutProps>): JSX.Element {
  const { half = false, stable = false, children } = props

  return (
    <ContentWrapper className={half ? 'half' : stable ? 'stable' : ''}>
      <>{children}</>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${COMMON_STYLED_CONFIG.DashboardCardColumnGap}px;

  &.half {
    grid-template-columns: 1fr 1fr;
  }

  &.stable {
    max-width: 650px;
  }

  @media (max-width: 800px) {
    &.half {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 500px) {
    margin-top: 5px;
  }
`
