import styled from 'styled-components'

export interface IProductElementProps extends HTMLElement {
  title: string
  subtitle: string
  period: string
  price: string
  currency: string
}

export function ProductElement(props: IProductElementProps): JSX.Element {
  const { title, subtitle, period, price, currency } = props

  return (
    <ProductWrapper>
      <C_TitleBlock>
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </C_TitleBlock>
      <PriceWrapper>
        {price}
        <span>{currency}</span>
      </PriceWrapper>
      <PeriodWrapper>{period}</PeriodWrapper>
    </ProductWrapper>
  )
}

const ProductWrapper = styled.div``

const C_TitleBlock = styled.div`
  .title {
  }

  .subtitle {
  }
`

const PriceWrapper = styled.div``

const PeriodWrapper = styled.div``
