import { useForm } from 'react-hook-form'
import { ILoginData } from '~/pages/login/login.interface'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { Input } from '~/components/inputs/Input'
import styled from 'styled-components'
import { useState } from 'react'
import { BorderedButton } from '~/components/buttons/Button'

export interface IIntentionFormProps {
  onSubmit: (data: ILoginData) => Promise<string | void>
}

export interface IIntentionForm {
  email: string
}

export function IntentionForm(props: IIntentionFormProps): JSX.Element {
  const { onSubmit } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IIntentionForm>()

  const [message, setMessage] = useState<string>('')

  async function onHandleSubmit(data: ILoginData) {
    const message = await onSubmit(data)
    if (message) {
      setMessage(message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
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
          required: true,
        })}
      />
      {message && <Message>{message}</Message>}
      <BorderedButton type="submit">Get Access</BorderedButton>
    </FormWrapper>
  )
}

const Message = styled.div`
  font-size: 12px;
  padding: 0.2em 0.5em;
`
