import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export function Navbar(): JSX.Element {
  return <NavbarWrapper></NavbarWrapper>
}

const NavbarWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${COLORS_MAP.dashboard.elements.navbar.background};
`
