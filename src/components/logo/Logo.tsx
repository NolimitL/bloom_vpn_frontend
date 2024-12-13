import styled from 'styled-components'
import { ReactComponent as LogoSign } from '~/assets/Logo_white_S_trans.svg'
import { ReactComponent as LogoName } from '~/assets/Logo_name_white_trans.svg'

export interface ILogo {
  full?: boolean
  navbar?: boolean
}

export function Logo(props: ILogo): JSX.Element {
  const { full = true, navbar } = props

  return (
    <ImageWrapper className={navbar ? 'logo-navbar' : ''}>
      {full ? (
        <>
          <LogoSign className="logo-sign" />
          <LogoName className="logo-name" />
        </>
      ) : (
        <LogoSign className="logo-sign" />
      )}
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  &.logo-navbar {
  }

  .logo-sign {
    max-width: 80px;
  }

  .logo-name {
    max-width: 170px;
  }
`
