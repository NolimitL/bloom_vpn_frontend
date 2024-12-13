import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export interface IButtonStyledProps {
  /**
   * Setup button text without font transformation
   */
  normal?: boolean
}

export const Button = styled.button<IButtonStyledProps>`
  min-width: 200px;
  padding: 0.5em;
  ${(props) => (props.normal ? '' : `text-transform: uppercase;`)}
  align-self: center;
  transition-duration: 300ms;

  &:hover {
    &:enabled {
      background-color: #3f3f3f;
    }
  }

  &:disabled {
    color: ${COLORS_MAP.standard.fourthWhite};
  }
`

/**
 * App stylized button with border adn hover effect
 */
export const BorderedButton = styled(Button)`
  border: 0.5px solid #efefef;
`

export interface IS_ButtonProps {
  upper?: boolean
}

/**
 * Standard button without any styles, transparent and full width
 */
export const S_Button = styled.button<IS_ButtonProps>`
  width: 100%;
  padding: 1em;
  text-transform: ${(props) => props.upper && 'uppercase'};
  align-self: center;
  transition-duration: 200ms;
  transition-property: background-color;
  background-color: ${COLORS_MAP.dashboard.elements.button.background};

  &:hover {
    &:enabled {
      background: ${COLORS_MAP.dashboard.elements.button.hover};
    }
  }

  &:disabled {
    color: ${COLORS_MAP.dashboard.elements.button.disabled};
    cursor: auto;
  }
`
