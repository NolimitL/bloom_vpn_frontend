import styled from 'styled-components'
import { PropsWithChildren } from 'react'
import {
  BlockTitleLayout,
  IBlockLabelLayoutProps,
} from '~/components/layouts/block/block.title.layout'
import { COLORS_MAP } from '~/styles/colors.map'
import { COMMON_STYLED_CONFIG } from '~/styles/common.styled.config'

export interface IBlockLayoutStyleProps {
  /**
   * Custom gap between title and content
   */
  gap?: number

  padding?: number
}

export interface IBlockLayoutProps extends IBlockLabelLayoutProps, IBlockLayoutStyleProps {
  /**
   * Default false. If true the BlockContentWrapper is off.
   */
  withOwnContent?: boolean
}

/**
 * Common layout for every content window
 * @param props
 * @constructor
 */
export function BlockLayout(props: PropsWithChildren<IBlockLayoutProps>): JSX.Element {
  const { title, subtitle, children, withOwnContent = false, ...styleProps } = props

  return (
    <>
      <BlockWrapper {...styleProps}>
        {title && <BlockTitleLayout title={title} subtitle={subtitle} />}
        {withOwnContent ? (
          <>{children}</>
        ) : (
          <BlockContentWrapper className="inside_wrapper">
            <>{children}</>
          </BlockContentWrapper>
        )}
      </BlockWrapper>
    </>
  )
}

const BlockWrapper = styled.div<IBlockLayoutStyleProps>`
  width: 100%;
  min-width: calc(50% - ${COMMON_STYLED_CONFIG.DashboardCardColumnGap}px / 2);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: ${(props) => `${props.gap || 5}px`};

  .inside_wrapper {
    padding: ${(props) => (props.padding ? `${props.padding}px` : '12px 20px')};
  }

  @media (max-width: 500px) {
    .inside_wrapper {
      padding: ${(props) => (props.padding ? `${props.padding * 0.5}px` : '12px 20px')};
      padding-bottom: 20px;
    }
  }
`

export const BlockContentWrapper = styled.div`
  width: 100%;
  background-color: ${COLORS_MAP.dashboard.elements.layout.content};
`
