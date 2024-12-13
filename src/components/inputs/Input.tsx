import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react'
import { InputLabel } from '~/components/text/InputLabel'
import { ErrorText } from '~/components/text/ErrorText'
import styled from 'styled-components'
import { COLORS_MAP } from '~/styles/colors.map'
import { ReactComponent as EyeClose } from '/src/assets/eye-closed.svg'
import { ReactComponent as EyeOpen } from '~/assets/eye-opened.svg'

export interface IInputProps {
  /**
   * Label for input field
   */
  label?: string

  /**
   * Does the field have errors
   */
  isError?: boolean

  /**
   * Error message
   */
  errorText?: string

  /**
   * Disable the field input
   */
  disabled?: boolean

  /**
   * Show asterisks instead of letters
   */
  type?: HTMLInputTypeAttribute | string
}

export type TextFieldPropsUnited = IInputProps & InputHTMLAttributes<HTMLInputElement>

/**
 * Standard Input field component
 * @constructor
 */
export const Input = forwardRef<HTMLInputElement, TextFieldPropsUnited>(
  (props: IInputProps, ref) => {
    const { label, isError, errorText, type, ...otherProps } = props
    const [isPassShow, setIsPassShow] = useState<boolean>(false)

    return (
      <C_InputWrapper>
        {label && (
          <InputLabel isError={isError} className="input_label">
            {label}
          </InputLabel>
        )}
        <C_InputField
          ref={ref}
          isError={isError}
          type={type === 'password' ? (isPassShow ? 'text' : 'password') : type}
          {...otherProps}
        />
        {type === 'password' && (
          <C_EyeWrapper>
            <div onClick={() => setIsPassShow(!isPassShow)} className="eyes">
              {isPassShow ? <EyeClose /> : <EyeOpen />}
            </div>
          </C_EyeWrapper>
        )}
        {isError && <ErrorText>{errorText}</ErrorText>}
      </C_InputWrapper>
    )
  }
)

const C_InputWrapper = styled.div`
  width: 100%;
`

const C_InputField = styled.input<IInputProps>`
  width: 100%;
  background: transparent;
  padding: 0.5em;
  border-bottom: solid 0.5px ${COLORS_MAP.form.border};
  transition: border-bottom-color 150ms linear;

  // TODO finish input effects
  /*
  &:focus-within {
  }

  ::placeholder,
  ::-webkit-input-placeholder {
  }

  :-ms-input-placeholder {
  }

  :disabled {
  }
   */
`

export const C_EyeWrapper = styled.div`
  position: relative;
  width: 100%;
  .eyes {
    cursor: pointer;
    width: 25px;
    position: absolute;
    right: 10px;
    top: -30px;
  }
`
