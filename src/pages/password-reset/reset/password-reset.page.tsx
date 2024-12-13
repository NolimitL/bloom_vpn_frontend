import { PageLayout } from '~/components/layouts/page/page.layout'
import { FormBlock } from '~/components/forms/FormBlock'
import { FormTitle } from '~/components/forms/FormTitle'
import { Logo } from '~/components/logo/Logo'
import { useNavigate } from 'react-router-dom'
import { PasswordResetForm } from '~/pages/password-reset/reset/password-reset.form'
import { useNetwork } from '~/backbone/hooks/network.hook'
import { useEffect, useState } from 'react'
import { IResetPassword } from '~/pages/password-reset/password-reset.interface'
import { Loading } from '~/components/animation/Loading'

export function PasswordResetPage(): JSX.Element {
  const navigate = useNavigate()
  const network = useNetwork()
  const [tokenValid, setTokenValid] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [token, setToken] = useState<string>(null)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const tokenStr = query.get('token')
    setToken(tokenStr)
    ;(async () => {
      if (tokenStr) {
        await network.verifyResetToken({
          token: tokenStr,
        })
      } else {
        setTokenValid(false)
      }
      setLoading(false)
    })()
  }, [])

  async function onFormSubmit(data: IResetPassword) {
    try {
      await network.resetPassword({
        token: token,
        password: data.password,
      })
      navigate('/login')
      // TODO show successful notification
    } catch (error) {
      // TODO show failure notification
    }
  }

  return (
    <PageLayout>
      <Logo />
      <FormBlock>
        {!loading ? (
          tokenValid ? (
            <>
              <FormTitle>Create a new password</FormTitle>
              <PasswordResetForm onSubmit={onFormSubmit} />
            </>
          ) : (
            <div>Token is not valid.</div>
          )
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </FormBlock>
    </PageLayout>
  )
}
