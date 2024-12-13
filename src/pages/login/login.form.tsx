import { useForm } from 'react-hook-form'
import { ILoginData } from '~/pages/login/login.interface'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { Input } from '~/components/inputs/Input'
import { IFormBase } from '~/components/forms/interfaces/form.base.interface'
import { BorderedButton } from '~/components/buttons/Button'
import { validateEmail } from '~/backbone/validators/email.validators'
import { useNavigate } from 'react-router-dom'
import { RowButton } from '~/components/buttons/RowButton'
import styled from 'styled-components'

type LoginFormPropsType = IFormBase<ILoginData>

export function LoginForm(props: LoginFormPropsType): JSX.Element {
  const { onSubmit } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginData>()
  const navigate = useNavigate()

  function onHandleSubmit(data: ILoginData) {
    onSubmit(data)
  }

  function toSignup() {
    navigate('/signup')
  }

  function resetPassword() {
    navigate('/reset/request/email')
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
      <Input
        label="Email"
        type="email"
        placeholder="Please enter your email"
        isError={!!errors?.email}
        errorText={errors?.email?.message}
        {...register('email', {
          validate: validateEmail,
          required: true,
        })}
      />
      <C_PasswordWrapper>
        <Input
          label="Password"
          type="password"
          placeholder="Please enter your password"
          isError={!!errors?.password}
          errorText={errors?.password?.message}
          {...register('password', {
            required: true,
          })}
        />
        <RowButton type="button" onClick={resetPassword} className="reset_link">
          Reset password
        </RowButton>
      </C_PasswordWrapper>
      <BorderedButton type="submit">Login</BorderedButton>
      <RowButton type="button" onClick={toSignup}>
        Don't have an account? Sign up
      </RowButton>
    </FormWrapper>
  )
}

const C_PasswordWrapper = styled.div`
  .reset_link {
    display: block;
    margin-top: 5px;
    margin-left: 4px;
  }
`
