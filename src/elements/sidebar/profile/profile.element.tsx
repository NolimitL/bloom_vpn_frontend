import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/root.reducer'
import { ReactComponent as IconProfile } from '~/assets/icons/icon-profile.svg'
import { COLORS_MAP } from '~/styles/colors.map'
import { PhotoWrapper } from '~/components/photo/Photo'

export function Profile(): JSX.Element {
  const { firstName, lastName, photo, isVerified } = useSelector(
    ({ userState }: RootState) => userState
  )

  return (
    <ProfileWrapper className="pf-wrapper">
      <C_PhotoWrapper>
        {photo ? (
          <div>
            <img src={photo} alt="profile photo" />
          </div>
        ) : (
          <IconProfile />
        )}
      </C_PhotoWrapper>
      <NameWrapper>
        {firstName && lastName ? firstName + ' ' + lastName : '--- ---'}
        {!isVerified && <div className="verified">Not verified</div>}
      </NameWrapper>
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: 15px;
`

const C_PhotoWrapper = styled(PhotoWrapper)`
  @media (max-width: 800px) {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
`

const NameWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 0 3px;

  .verified {
    font-size: 12px;
    color: ${COLORS_MAP.warning.font};
  }

  @media (max-width: 800px) {
    font-size: 12px;
    .verified {
      font-size: 10px;
    }
  }
`
