import { forwardRef } from 'react'

import MaskedInput from 'react-input-mask'

/**
 * @param mask
 * @param Component
 * @constructor
 * @example
 *  const DateInput = withMask('99/99/9999', Input)
 */
export function InputMasked<T>(mask: string, Component: (props: T) => JSX.Element): any {
  return forwardRef<typeof Component, T>((props, ref) => {
    return (
      <MaskedInput mask={mask} maskChar={null} ref={ref} {...props}>
        {/* @ts-ignore - "disabled" props get missed in MaskedInput component */}
        {(inputProps) => <Component disabled={props.disabled} {...inputProps} />}
      </MaskedInput>
    )
  })
}
