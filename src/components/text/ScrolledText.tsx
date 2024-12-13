import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'

export interface IScrolledTextStyledProps {
  isHighlighted?: boolean
}

/**
 * This element's used mostly to wrap values to scroll text on a line.
 *
 * @constructor
 */
export const ScrolledText = styled.span<IScrolledTextStyledProps>`
  max-width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  padding: 0 5px;
  background-color: ${(props) =>
    props.isHighlighted ? COLORS_MAP.dashboard.elements.content.value : ''};
`
