import { useForm } from 'react-hook-form'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { Input } from '~/components/inputs/Input'
import { IFormBase } from '~/components/forms/interfaces/form.base.interface'
import { BorderedButton } from '~/components/buttons/Button'
import { validateEmail } from '~/backbone/validators/email.validators'
import { useNavigate } from 'react-router-dom'
import { RowButton } from '~/components/buttons/RowButton'
import { IPasswordResetRequestData } from '~/pages/password-reset/password-reset.interface'

type PasswordResetRequestFormPropsType = IFormBase<IPasswordResetRequestData>

export function PasswordResetRequestForm(props: PasswordResetRequestFormPropsType): JSX.Element {
  const { onSubmit } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IPasswordResetRequestData>()
  const navigate = useNavigate()

  function onHandleSubmit(data: IPasswordResetRequestData) {
    onSubmit(data)
  }

  function abortRequest() {
    navigate('/login')
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
      <BorderedButton type="submit">Request to reset</BorderedButton>
      <RowButton type="button" onClick={abortRequest}>
        Remember the password?&nbsp;&nbsp;Go back
      </RowButton>
    </FormWrapper>
  )
}
