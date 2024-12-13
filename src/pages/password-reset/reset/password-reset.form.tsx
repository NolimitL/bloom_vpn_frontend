import { useForm } from 'react-hook-form'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { Input } from '~/components/inputs/Input'
import { IFormBase } from '~/components/forms/interfaces/form.base.interface'
import { BorderedButton } from '~/components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { RowButton } from '~/components/buttons/RowButton'
import { validatePassword } from '~/backbone/validators/password.validators'
import { IResetPassword } from '~/pages/password-reset/password-reset.interface'

type PasswordResetFormPropsType = IFormBase<IResetPassword>

export function PasswordResetForm(props: PasswordResetFormPropsType): JSX.Element {
  const { onSubmit } = props
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>()
  const navigate = useNavigate()

  function onHandleSubmit(data: IResetPassword) {
    onSubmit(data)
  }

  function abortRequest() {
    navigate('/login')
  }

  const [password] = watch(['password'])

  return (
    <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
      <Input
        label="New password"
        type="password"
        placeholder="Enter new password"
        isError={!!errors?.password}
        errorText={errors?.password?.message}
        {...register('password', {
          validate: validatePassword,
          required: true,
        })}
      />
      <Input
        label="Repeat password"
        type="password"
        placeholder="Repeat new password"
        isError={!!errors?.repeat_password}
        errorText={errors?.repeat_password?.message}
        {...register('repeat_password', {
          validate: (v) => {
            if (v !== password) {
              return 'Repeat password has to be the same'
            }
            return true
          },
          required: true,
        })}
      />
      <BorderedButton type="submit">Reset password</BorderedButton>
      <RowButton type="button" onClick={abortRequest}>
        Remember the password?&nbsp;&nbsp;Login
      </RowButton>
    </FormWrapper>
  )
}
