import styled from 'styled-components'
import { FC, HTMLAttributes } from 'react'
import { S_Button } from '~/components/buttons/Button'

export interface ICardStyledProps {
  disabled?: boolean
  /**
   * Occupies half of layout
   */
  half?: boolean
}

export interface ICardProps extends ICardStyledProps, HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
  /**
   * If buttonTitle is defined then the action switches to it,
   * by default the action applies to the full CardWrapper.
   */
  buttonTitle?: string
}

/**
 * Common card layout
 * @param props
 * @constructor
 */
export const Card: FC<ICardProps> = (props): JSX.Element => {
  const { children, onClick, buttonTitle, disabled, half, ...restProps } = props

  return (
    <>
      <CardWrapper
        disabled={disabled}
        onClick={buttonTitle ? () => null : onClick}
        className={half && 'half'}
        {...restProps}
      >
        {buttonTitle ? (
          <>
            {children}
            <S_Button className="card-button" onClick={onClick} disabled={disabled}>
              {buttonTitle}
            </S_Button>
          </>
        ) : (
          <>{children}</>
        )}
      </CardWrapper>
    </>
  )
}

const CardWrapper = styled.div<ICardStyledProps>`
  max-width: 250px;
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 1px;

  &.half {
    max-width: 50%;
    min-width: 300px;
  }

  @media (max-width: 500px) {
    &.half {
      width: 100%;
      max-width: 100%;
    }
  }
`

/**
 * @constructor
 */
export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  column-gap: 5px;
  row-gap: 5px;
  overflow-x: scroll;

  @media (max-width: 800px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`
