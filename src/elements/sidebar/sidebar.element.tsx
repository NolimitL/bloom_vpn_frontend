import { ISidebarItem, SidebarItem } from '~/elements/sidebar/sidebar.item'
import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'
import { useDispatch } from 'react-redux'
import { logoutUser } from '~/store/particles/user/actions'
import { ReactComponent as LogoutIcon } from '~/assets/icons/icon-logout.svg'
import { Profile } from '~/elements/sidebar/profile/profile.element'
import { useNavigate } from 'react-router-dom'
import { COMMON_STYLED_CONFIG } from '~/styles/common.styled.config'
import { useState } from 'react'
import { useWindowSize } from '~/backbone/hooks/window-size.hook'

export interface INavbarProps {
  items: Array<ISidebarItem>
}

export function Sidebar(props: INavbarProps): JSX.Element {
  const { items } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true)
  const { width } = useWindowSize()

  function onHandleLogout() {
    dispatch(logoutUser())
    navigate('/login')
  }

  function onContentClick(e: any) {
    e.preventDefault()
    if (width <= 500) {
      setMenuIsOpen(!menuIsOpen)
    }
  }

  return (
    <SidebarWrapper onClick={onContentClick} className={!menuIsOpen && 'closed'}>
      <PlateBlock>
        {width <= 500 && (
          <BurgerMenu>
            <div className="middle" />
          </BurgerMenu>
        )}
      </PlateBlock>
      <SidebarContent>
        <Profile />
        {items.map((item, idx) => {
          return <SidebarItem key={idx} {...item} />
        })}
        <SidebarItem
          key="logout"
          id="logout"
          label="Logout"
          type="i-button"
          className="logout"
          onAction={() => onHandleLogout()}
          icon={LogoutIcon}
        />
      </SidebarContent>
    </SidebarWrapper>
  )
}

const SidebarContent = styled.div`
  width: 100%;
  height: calc(100% - ${COMMON_STYLED_CONFIG.NavBarHeight}px);
  display: flex;
  flex-flow: column nowrap;
  background-color: ${COLORS_MAP.dashboard.elements.sidebar.background};
  transition: all 300ms ease-in-out;

  .logout {
    margin-top: auto;
  }

  @media (max-width: 500px) {
    width: 50%;
    min-width: 150px;
  }
`

const PlateBlock = styled.div`
  width: 100%;
  height: ${COMMON_STYLED_CONFIG.NavBarHeight}px;
  background-color: ${COLORS_MAP.dashboard.elements.sidebar.background};
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  transition: all 150ms linear 100ms;

  @media (max-width: 500px) {
    width: 50%;
  }
`

const BurgerMenu = styled.div`
  width: 50px;
  height: 100%;
  position: relative;
  padding: 5px 6.5px;
  margin-right: 5px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 35px;
    height: 1px;
    background-color: ${COLORS_MAP.standard.font};
  }
  &:before {
    top: 13px;
  }
  &:after {
    bottom: 13px;
  }
  .middle {
    position: absolute;
    top: calc(50% - 0.5px);
    width: 35px;
    height: 1px;
    background-color: ${COLORS_MAP.standard.font};
  }
`

const SidebarWrapper = styled.div`
  width: 20%;
  height: 100%;
  min-width: 150px;
  max-width: 300px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 1px;

  @media (max-width: 800px) {
    min-width: ${COMMON_STYLED_CONFIG.Tablet.SideBarWidth}px;
    width: ${COMMON_STYLED_CONFIG.Tablet.SideBarWidth}px;
  }

  @media (max-width: 500px) {
    position: absolute;
    z-index: 10;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    backdrop-filter: blur(7px);
    transition: backdrop-filter 100ms ease-in-out, transform 150ms linear 100ms;
  }

  &.closed {
    backdrop-filter: blur(0px);
    transform: translateX(-100%);

    ${SidebarContent} {
      transition: transform 150ms ease-in-out 100ms;
      transform: translateX(-100%);
    }

    ${PlateBlock} {
      transition: width 150ms linear 100ms;
      width: calc(100% + 50px);

      ${BurgerMenu} {
        z-index: 10;
        margin-right: 0;
      }
    }
  }
`
