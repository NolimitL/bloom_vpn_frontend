import { SvgComponent } from '~/common/types/defined.types'
import styled from 'styled-components'

export interface IRadio {
  title?: string
  name: string
  value: string
  image?: SvgComponent
  checked?: boolean
}

export function Radio(props: IRadio): JSX.Element {
  const { image: Image, checked, name, value, title } = props

  function handleChange(e) {
    // const { name, value } = e.target
  }

  return (
    <div>
      {Image && <Image />}
      {title && <label>{title}</label>}
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
    </div>
  )
}

export const RadioInput = styled.input<{ disabled?: boolean }>`
  //position: absolute;
  //opacity: 0;

  &:checked {
    display: block;
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    height: 9px;
    width: 9px;
    border-radius: 50%;

    background-color: ${({ disabled }) => disabled && '#919699'};
  }
`
