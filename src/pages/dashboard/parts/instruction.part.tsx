import { BlockLayout } from '~/components/layouts/block/block.layout'
import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import { StyledNavLink } from '~/components/links/Link'

export function InstructionPart(): JSX.Element {
  const {
    userState: { isVerified },
  } = useSelector((root: RootState) => root)

  return (
    <BlockLayout title="Setup instruction" subtitle="Follow these steps to simple setup your VPN">
      <InstructionWrapper>
        <ol className="actions-list">
          <li className={isVerified ? 'success' : ''}>Verify your email</li>
          <li>
            Choose <StyledNavLink to="/payments">product plan</StyledNavLink>
          </li>
          {/*<li>Connect your payment method</li>*/}
          <li>
            <StyledNavLink to="/download-app" target="_blank">
              Download the app
            </StyledNavLink>
          </li>
          <li>Copy access key to the app</li>
        </ol>
      </InstructionWrapper>
    </BlockLayout>
  )
}

const InstructionWrapper = styled.div`
  width: 100%;
  line-height: 2em;
  > .actions-list {
    list-style: inside decimal;
    > li {
      &.success {
        color: ${COLORS_MAP.status.success};
      }
    }
  }
`
