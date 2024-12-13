import styled from 'styled-components'
import { SvgComponent } from '~/common/types/defined.types'

export interface IContentTitleLayoutProps {
  title: string

  subtitle?: string

  icon?: SvgComponent
}

export function ContentTitleLayout(props: IContentTitleLayoutProps): JSX.Element {
  const { title, subtitle, icon: Icon } = props

  return (
    <TitleWrapper>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <div className="title">
        {title}
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  width: 100%;
  padding: 12px;
  line-height: 2em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 10px;

  .title {
    font-size: 20px;
  }
  .subtitle {
    font-size: 14px;
  }

  @media (max-width: 800px) {
    margin-bottom: 0;
    .title {
      font-size: 18px;
    }
    .subtitle {
      font-size: 12px;
    }
  }

  @media (max-width: 500px) {
    .title {
      font-size: 16px;
    }
  }
`

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  min-width: 30px;
  min-height: 30px;
`
