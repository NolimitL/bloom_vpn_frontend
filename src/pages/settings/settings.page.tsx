import { ContentLayout } from '~/components/layouts/content/content.layout'
import { BlockLayout } from '~/components/layouts/block/block.layout'
import { ContentTitleLayout } from '~/components/layouts/content/content.title.layout'
import { SidebarItems } from '~/static/sidebar.items.static'
import { SettingsForm } from '~/pages/settings/settings.form'
import { useDispatch, useSelector } from 'react-redux'
import { IUpdateUserData, IUpdateUserPasswordData } from '~/pages/settings/settings.interface'
import { updateUser, updateUserPassword } from '~/store/particles/user/actions'
import { RootState } from '~/store/root.reducer'
import { formatSlashStringDataToISO8601 } from '~/backbone/utils/formatDate.util'

export function SettingsPage(): JSX.Element {
  const { userState } = useSelector((root: RootState) => root)
  const dispatch = useDispatch()

  function onSettingSubmit(data: IUpdateUserData) {
    const updateData: IUpdateUserData = {}
    const dataKeys = Object.keys(data)

    Object.keys(userState).forEach((key) => {
      if (dataKeys.includes(key) && userState[key] !== data[key]) {
        updateData[key] = data[key]
        if (key == 'birthdate') {
          updateData[key] = formatSlashStringDataToISO8601(data[key])
        }
      }
    })
    if (Object.keys(updateData).length !== 0) {
      dispatch((updateUser as any)(updateData)) // Avoid TS2554 error.
    }
  }

  async function onPasswordSubmit(data: IUpdateUserPasswordData) {
    dispatch(updateUserPassword(data))
  }

  return (
    <>
      <ContentTitleLayout
        title="Settings page"
        subtitle="Manage your personal data"
        icon={SidebarItems.find((item) => item.id == 'settings').icon}
      />
      <ContentLayout stable>
        <BlockLayout padding={20}>
          <SettingsForm
            onSubmit={onSettingSubmit}
            onPasswordSubmit={onPasswordSubmit}
            initialData={{
              email: userState.email,
              firstName: userState.firstName,
              lastName: userState.lastName,
              birthdate: userState.birthdate,
              phoneNumber: userState.phoneNumber,
            }}
            photo={userState.photo}
          />
        </BlockLayout>
      </ContentLayout>
    </>
  )
}
