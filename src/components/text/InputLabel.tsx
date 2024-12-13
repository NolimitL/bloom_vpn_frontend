import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'
import { IInputProps } from '~/components/inputs/Input'

export interface ILabelProps extends IInputProps {
  left?: string
}

export const InputLabel = styled.div<ILabelProps>`
  color: ${({ isError }) => (isError ? COLORS_MAP.errors.font : COLORS_MAP.standard.font)};
  text-align: left;
  font-size: 16px;
  margin-left: 0.25em;
`
