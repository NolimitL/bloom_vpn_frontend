import { PageLayout } from '~/components/layouts/page/page.layout'
import { FormBlock } from '~/components/forms/FormBlock'
import { FormTitle } from '~/components/forms/FormTitle'
import { Logo } from '~/components/logo/Logo'
import { IPasswordResetRequestData } from '~/pages/password-reset/password-reset.interface'
import { PasswordResetRequestForm } from '~/pages/password-reset/request/password-reset.request.form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNetwork } from '~/backbone/hooks/network.hook'
import { BorderedButton } from '~/components/buttons/Button'
import styled from 'styled-components'
import { ReactComponent as IconSuccess } from '~/assets/icons/icon-circle-success.svg'

export function PasswordResetRequestPage(): JSX.Element {
  const navigate = useNavigate()
  const network = useNetwork()
  const [requested, setRequested] = useState<boolean>(false)

  async function onFormSubmit(data: IPasswordResetRequestData) {
    const succeeded = await network.requestPasswordResetLink(data)
    if (succeeded) {
      setRequested(true)
    } else {
      // TODO show notification
    }
  }

  function toLogin() {
    navigate('/login')
  }

  return (
    <PageLayout>
      <Logo />
      <FormBlock>
        {!requested ? (
          <>
            <FormTitle>Enter to your email to get reset link</FormTitle>
            <PasswordResetRequestForm onSubmit={onFormSubmit} />
          </>
        ) : (
          <C_StyledWrapper>
            <>
              <div>
                <IconSuccess />
              </div>
              <div className="__title">Link is sent! Check your email.</div>
            </>
            <BorderedButton type="button" onClick={toLogin}>
              To Login
            </BorderedButton>
          </C_StyledWrapper>
        )}
      </FormBlock>
    </PageLayout>
  )
}

const C_StyledWrapper = styled.div`
  .__title {
    font-size: 16px;
    margin: 20px 0 25px;
  }
`
