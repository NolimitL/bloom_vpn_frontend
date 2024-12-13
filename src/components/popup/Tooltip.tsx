import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export interface ITooltipStyledProps {
  position: 'center' | 'left' | 'right'
}

export interface ITooltipProps extends ITooltipStyledProps {
  text: string
}

/**
 * Common component for tooltip. It has to be used only inside the relative components.
 * Otherwise, it goes away.
 * @param props
 * @constructor
 */
export function Tooltip(props: ITooltipProps): JSX.Element {
  const { text, position = 'center' } = props

  return <ToolTipWrapper position={position}>{text}</ToolTipWrapper>
}

const ToolTipWrapper = styled.div<ITooltipStyledProps>`
  position: absolute;
  font-size: 13px;
  padding: 10px 12px;
  background-color: ${COLORS_MAP.standard.tooltip};
  ${(props) => {
    switch (props.position) {
      case 'center':
        return 'left: 50%;'
      case 'left':
        return 'left: 0;'
      case 'right':
        return 'right: 0;'
    }
  }}
`
