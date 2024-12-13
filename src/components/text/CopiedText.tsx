import { HTMLAttributes, PropsWithChildren, useRef } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import styled from 'styled-components'
import { ReactComponent as IconCopy } from '~/assets/icons/icon-copy.svg'
import { COLORS_MAP } from '~/styles/colors.map'
import { IScrolledTextStyledProps, ScrolledText } from '~/components/text/ScrolledText'

export interface ICopiedTextProps
  extends IScrolledTextStyledProps,
    HTMLAttributes<HTMLSpanElement> {
  withIcon?: boolean
}

export function CopiedText(props: PropsWithChildren<ICopiedTextProps>): JSX.Element {
  const { children, withIcon = false, isHighlighted = false, ...restProps } = props

  const ref = useRef(null)
  const clipboard = useClipboard({
    copiedTimeout: 3000,
    onSuccess: () => {
      // TODO show notification
    },
  })

  async function handleOnCopy(): Promise<void> {
    if (ref.current) {
      const text = ref.current.outerText || ''
      try {
        clipboard.copy(text)
      } catch (error) {
        console.error(`Something went wrong. Unable to copy. ${error}`)
      }
    }
  }

  return (
    <>
      <ContentWrapper
        ref={ref}
        onClick={() => handleOnCopy()}
        isHighlighted={isHighlighted}
        {...restProps}
      >
        <>{children}</>
      </ContentWrapper>
      {withIcon && (
        <IconWrapper>
          <IconStyled />
        </IconWrapper>
      )}
    </>
  )
}

const ContentWrapper = styled(ScrolledText)`
  &:hover {
    background: ${COLORS_MAP.dashboard.elements.content.valueHover};
  }
`

const IconWrapper = styled.div`
  height: 1em;
  width: 1em;
`

const IconStyled = styled(IconCopy)`
  height: 1em;
  width: 1em;
  line-height: 1em;
  vertical-align: middle;
  margin-bottom: 2px;
`
