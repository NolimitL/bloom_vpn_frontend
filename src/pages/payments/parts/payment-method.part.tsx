import { BlockLayout } from '~/components/layouts/block/block.layout'
import styled from 'styled-components'

export function PaymentMethodPart(): JSX.Element {
  return (
    <BlockLayout title="Payment methods" subtitle="Manage your payments">
      <PaymentMethodsWrapper>Only crypto is available</PaymentMethodsWrapper>
    </BlockLayout>
  )
}

const PaymentMethodsWrapper = styled.div`
  width: 100%;
`
