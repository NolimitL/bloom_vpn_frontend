import { HTMLAttributes, useCallback } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { SvgComponent } from '~/common/types/defined.types'
import { COLORS_MAP } from '~/styles/colors.map'

export interface ISidebarItem extends HTMLAttributes<HTMLDivElement> {
  /**
   * Item always must be named
   */
  id: string

  /**
   * icon-link - tag 'a' will be used. A prop linkTo is required
   * icon-button - tag 'button' will be used. A prop onClick is required
   */
  type: 'i-link' | 'i-button'

  /**
   * String label that will be use as text under either the button or a link
   */
  label: string

  /**
   * Icon component
   */
  icon?: SvgComponent

  /**
   * url to use in Link
   */
  linkTo?: string

  /**
   * onAction handler to use with type button
   * @param id
   */
  onAction?: (id?: string) => void

  /**
   * Custom class to item wrapper
   */
  // className?: string
}

export function SidebarItem(props: ISidebarItem): JSX.Element {
  const { id, type, label, onAction, icon: Icon, linkTo, ...restProps } = props

  const onClickHandler = useCallback(() => onAction(id), [onAction])
  const { pathname } = useLocation()

  return (
    <ItemWrapper className={linkTo && linkTo == pathname ? 'active' : ''} {...restProps}>
      {type === 'i-button' && (
        <ItemButton className="item" onClick={onClickHandler}>
          {Icon && (
            <IconWrapper>
              <Icon />
            </IconWrapper>
          )}
          {label && <div className="item_label">{label}</div>}
        </ItemButton>
      )}
      {type === 'i-link' && (
        <ItemLink className="item" to={linkTo}>
          {Icon && (
            <IconWrapper>
              <Icon />
            </IconWrapper>
          )}
          {label && <div className="item_label">{label}</div>}
        </ItemLink>
      )}
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  background: ${COLORS_MAP.dashboard.elements.sidebar.items.primary};
  border-top: 1px solid ${COLORS_MAP.standard.transparent};
  border-bottom: 1px solid ${COLORS_MAP.standard.transparent};
  background-clip: padding-box;

  &.active {
    background: ${COLORS_MAP.dashboard.elements.sidebar.items.active};
    border-right: 5px solid ${COLORS_MAP.dashboard.elements.sidebar.items.activeBorder};

    &:hover {
      background: ${COLORS_MAP.dashboard.elements.sidebar.items.active};
    }
  }

  &:hover {
    background: ${COLORS_MAP.dashboard.elements.sidebar.items.hover};
  }

  .item {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    column-gap: 10%;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 20px;
  }

  @media (max-width: 800px) {
    .item {
      padding: 15px 0;
      justify-content: center;
      .item_label {
        display: none;
      }
    }
  }

  @media (max-width: 500px) {
    &:not(:first-child) {
      border-top: 2px solid ${COLORS_MAP.standard.fourthWhite};
    }
    &:nth-last-child(2) {
      border-bottom: 2px solid ${COLORS_MAP.standard.fourthWhite};
    }
    .item {
      padding: 15px;
      justify-content: flex-start;
      .item_label {
        display: block;
      }
    }
  }
`

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
`

const ItemButton = styled.button``

const ItemLink = styled(NavLink)``
