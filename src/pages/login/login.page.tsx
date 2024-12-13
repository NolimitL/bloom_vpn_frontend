import { PageLayout } from '~/components/layouts/page/page.layout'
import { LoginForm } from '~/pages/login/login.form'
import { FormBlock } from '~/components/forms/FormBlock'
import { FormTitle } from '~/components/forms/FormTitle'
import { Logo } from '~/components/logo/Logo'
import { ILoginData } from '~/pages/login/login.interface'
import { useDispatch } from 'react-redux'
import { loginUser } from '~/store/particles/user/actions'
import { useNavigate } from 'react-router-dom'

export function LoginPage(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onFormSubmit(data: ILoginData) {
    await dispatch(loginUser(data))
    navigate('/dashboard')
  }

  return (
    <PageLayout>
      <Logo />
      <FormBlock>
        <FormTitle>Login to your account</FormTitle>
        <LoginForm onSubmit={onFormSubmit} />
      </FormBlock>
    </PageLayout>
  )
}
