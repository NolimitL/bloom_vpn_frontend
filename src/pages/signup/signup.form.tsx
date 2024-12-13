import { useForm } from 'react-hook-form'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { Input } from '~/components/inputs/Input'
import { IFormBase } from '~/components/forms/interfaces/form.base.interface'
import { BorderedButton } from '~/components/buttons/Button'
import { validateEmail } from '~/backbone/validators/email.validators'
import { ISignupData } from '~/pages/signup/signup.interface'
import { validateName } from '~/backbone/validators/text.validators'
import styled from 'styled-components'
import { RowButton } from '~/components/buttons/RowButton'
import { useNavigate } from 'react-router-dom'
import { validatePassword } from '~/backbone/validators/password.validators'

type SignupFormPropsType = IFormBase<ISignupData>

export function SignupFrom(props: SignupFormPropsType): JSX.Element {
  const { onSubmit } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignupData>()
  const navigate = useNavigate()

  async function onHandleSubmit(data: ISignupData) {
    onSubmit(data)
  }

  function toLogin() {
    navigate('/login')
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
      <C_NameWrapper>
        <Input
          label="First name"
          type="text"
          placeholder="Your first name"
          isError={!!errors?.firstName}
          errorText={errors?.firstName?.message}
          {...register('firstName', {
            validate: validateName,
            required: true,
          })}
        />
        <Input
          label="Last name"
          type="text"
          placeholder="Your last name"
          isError={!!errors?.lastName}
          errorText={errors?.lastName?.message}
          {...register('lastName', {
            validate: validateName,
            required: true,
          })}
        />
      </C_NameWrapper>
      <Input
        label="Email"
        type="email"
        placeholder="Your email"
        isError={!!errors?.email}
        errorText={errors?.email?.message}
        {...register('email', {
          validate: validateEmail,
          required: true,
        })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Your password"
        isError={!!errors?.password}
        errorText={errors?.password?.message}
        {...register('password', {
          validate: validatePassword,
          required: true,
        })}
      />
      <C_Button type="submit">Sign up</C_Button>
      <RowButton type="button" onClick={toLogin}>
        Have an account? Login
      </RowButton>
    </FormWrapper>
  )
}

const C_NameWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  column-gap: 15px;
`

const C_Button = styled(BorderedButton)`
  margin-top: 10px;
`
