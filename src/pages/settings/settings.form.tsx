import styled from 'styled-components'
import { Input } from '~/components/inputs/Input'
import { validateEmail } from '~/backbone/validators/email.validators'
import { BorderedButton } from '~/components/buttons/Button'
import { IFormBase } from '~/components/forms/interfaces/form.base.interface'
import { IUpdateUserData, IUpdateUserPasswordData } from '~/pages/settings/settings.interface'
import { useForm } from 'react-hook-form'
import { FormWrapper } from '~/components/forms/FormWrapper'
import { ReactComponent as IconProfile } from '~/assets/icons/icon-profile.svg'
import { PhotoWrapper } from '~/components/photo/Photo'
import { validateName } from '~/backbone/validators/text.validators'
import { InputDate } from '~/components/inputs/InputDate'
import { validateBirthDate } from '~/backbone/validators/date.validators'
import { formatDataToSlashString } from '~/backbone/utils/formatDate.util'
import { COLORS_MAP } from '~/styles/colors.map'

export interface ISettingsFormProps extends IFormBase<IUpdateUserData> {
  onPasswordSubmit: (data: IUpdateUserPasswordData) => void

  photo: string
}

export function SettingsForm(props: ISettingsFormProps): JSX.Element {
  const { onSubmit, onPasswordSubmit, initialData, photo } = props
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IUpdateUserData>({
    defaultValues: {
      ...initialData,
      birthdate: formatDataToSlashString(initialData.birthdate) || null,
    },
  })

  const {
    handleSubmit: handlePasswordSubmit,
    register: passwordRegister,
    formState: { errors: passwordErrors },
  } = useForm<IUpdateUserPasswordData>()

  function onHandleSubmit(data: IUpdateUserData) {
    onSubmit(data)
  }

  function onHandlePasswordUpdate(data: IUpdateUserPasswordData) {
    onPasswordSubmit(data)
  }

  return (
    <SettingsFormsWrapper>
      <div className="image_info_section">
        <C_PhotoWrapper>
          {photo ? (
            <div>
              <img src={photo} alt="profile photo" />
            </div>
          ) : (
            <IconProfile />
          )}
        </C_PhotoWrapper>
        <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="name_section">
            <InputField
              label="First name"
              type="text"
              placeholder="Your first name"
              isError={!!errors?.firstName}
              errorText={errors?.firstName?.message}
              {...register('firstName', {
                validate: validateName,
              })}
            />
            <InputField
              label="Last name"
              type="text"
              placeholder="Your last name"
              isError={!!errors?.lastName}
              errorText={errors?.lastName?.message}
              {...register('lastName', {
                validate: validateName,
              })}
            />
          </div>
          <InputField
            label="Email"
            type="email"
            placeholder="Please enter your email"
            isError={!!errors?.email}
            errorText={errors?.email?.message}
            {...register('email', {
              validate: validateEmail,
            })}
          />
          <InputDate
            label="Birth date"
            name="birthdate"
            isError={!!errors?.birthdate}
            errorText={errors?.birthdate?.message}
            required={false}
            initDate={initialData.birthdate}
            onChangeDate={(date) => setValue('birthdate', formatDataToSlashString(date))}
            {...register('birthdate', {
              validate: (value) => (value !== null ? validateBirthDate(value) : true),
              required: false,
            })}
          />
          <C_BorderedButton type="submit">Save info</C_BorderedButton>
        </FormWrapper>
      </div>
      <FormWrapper onSubmit={handlePasswordSubmit(onHandlePasswordUpdate)}>
        <InputField
          label="Current password"
          type="password"
          placeholder="Enter current password"
          isError={!!passwordErrors?.password}
          errorText={passwordErrors?.password?.message}
          {...passwordRegister('password', {
            required: true,
          })}
        />
        <InputField
          label="New password"
          type="password"
          placeholder="Enter new password"
          isError={!!passwordErrors?.password}
          errorText={passwordErrors?.password?.message}
          {...passwordRegister('newPassword', {
            required: true,
          })}
        />
        <C_BorderedButton type="submit">Update password</C_BorderedButton>
      </FormWrapper>
    </SettingsFormsWrapper>
  )
}

/**
 * Custom Input field with hover effect
 */
const InputField = styled(Input)`
  font-size: 14px;
  padding: 0.4em 0.25em 0.3em;
  border-color: ${COLORS_MAP.standard.halfWhite};

  &:focus {
    border-bottom: solid 0.5px ${COLORS_MAP.form.border};
  }
`

const C_PhotoWrapper = styled(PhotoWrapper)`
  margin-top: 20px;
  margin-left: -20px;
  @media (max-width: 500px) {
    margin: 10px 0 0;
  }
`

const C_BorderedButton = styled(BorderedButton)`
  align-self: flex-end;
`

const SettingsFormsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 15px;

  .input_label {
    font-size: 14px;
  }

  .image_info_section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-items: center;

    .name_section {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      column-gap: 30px;
    }
  }

  @media (max-width: 500px) {
    row-gap: 40px;

    .image_info_section {
      grid-template-columns: 1fr;
      grid-row-gap: 30px;
    }
  }
`
