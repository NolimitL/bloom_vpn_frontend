import { Logo } from '~/components/logo/Logo'
import { PageLayout } from '~/components/layouts/page/page.layout'
import { Loading } from '~/components/animation/Loading'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BorderedButton } from '~/components/buttons/Button'
import { confirmEmail } from '~/store/particles/user/actions'
import { ReactComponent as IconSuccess } from '~/assets/icons/icon-circle-success.svg'
import { ReactComponent as IconFailure } from '~/assets/icons/icon-circle-failure.svg'
import { RowButton } from '~/components/buttons/RowButton'
import { useNavigate } from 'react-router-dom'

export function ConfirmEmailPage(): JSX.Element {
  const query = new URLSearchParams(location.search)
  const token = query.get('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [verified, setVerified] = useState<boolean>()
  useEffect(() => {
    if (token) {
      ;(async () => {
        const { data: isConfirmed } = (await dispatch(confirmEmail(token))) as any
        setVerified(isConfirmed)
      })()
    } else {
      setVerified(false)
    }
  }, [token])

  return (
    <PageLayout>
      <Logo />
      <ContentWrapper>
        {typeof verified !== 'boolean' ? (
          <>
            <IconWrapper className="__loading">
              <Loading />
            </IconWrapper>
            <div className="process__title">Email is verifying...</div>
          </>
        ) : verified ? (
          <>
            <IconWrapper>
              <IconSuccess />
            </IconWrapper>
            <div className="process__title">Congrats! Email is verified.</div>
            <BorderedButton type="button" onClick={() => navigate('/login')}>
              Login
            </BorderedButton>
          </>
        ) : (
          <>
            <IconWrapper>
              <IconFailure />
            </IconWrapper>
            <div className="process__title">
              Your email is not verified.
              <br />
              <RowButton type="button" onClick={() => navigate('/login')}>
                Login
              </RowButton>
              &nbsp;and request to confirm.
            </div>
          </>
        )}
      </ContentWrapper>
    </PageLayout>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .process__title {
    width: 100%;
    margin: 30px 0;
    text-align: center;
    line-height: 1.5em;
  }
`

const IconWrapper = styled.div`
  &.__loading {
    margin-top: -10px;
  }
`
