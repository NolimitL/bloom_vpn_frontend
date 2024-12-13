import { Logo } from '~/components/logo/Logo'
import { FormBlock } from '~/components/forms/FormBlock'
import { FormTitle } from '~/components/forms/FormTitle'
import { PageLayout } from '~/components/layouts/page/page.layout'
import { useDispatch } from 'react-redux'
import { registerUser } from '~/store/particles/user/actions'
import { ISignupData } from '~/pages/signup/signup.interface'
import { SignupFrom } from '~/pages/signup/signup.form'
import { useNavigate } from 'react-router-dom'

export function SignUpPage(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onFormSubmit(data: ISignupData) {
    dispatch(registerUser(data))
    navigate('/login')
  }

  return (
    <PageLayout>
      <Logo />
      <FormBlock>
        <FormTitle>Login to your account</FormTitle>
        <SignupFrom onSubmit={onFormSubmit} />
      </FormBlock>
    </PageLayout>
  )
}
