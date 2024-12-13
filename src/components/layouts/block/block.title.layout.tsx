import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export interface IBlockLabelLayoutProps {
  title?: string

  subtitle?: string
}

export function BlockTitleLayout(props: IBlockLabelLayoutProps): JSX.Element {
  const { title = '', subtitle } = props

  return (
    <TitleWrapper>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  width: 100%;
  background-color: ${COLORS_MAP.dashboard.elements.layout.label};
  line-height: 2em;
  padding: 12px 20px;

  .title {
    font-size: 16px;
  }

  .subtitle {
    font-size: 12px;
    line-height: 1rem;
  }
`
