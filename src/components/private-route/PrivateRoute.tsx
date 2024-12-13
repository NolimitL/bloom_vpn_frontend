import { Outlet, Navigate } from 'react-router'
import { useEffect, useState } from 'react'
import { fetchUserData, logoutUser } from '~/store/particles/user/actions'
import { useDispatch } from 'react-redux'
import { Dashboard } from '~/elements/dashboard/dashboard.element'
import { IUser } from '~/store/interfaces/user.data.interface'
import { Logo } from '~/components/logo/Logo'
import { Loading } from '~/components/animation/Loading'
import { PageLayout } from '~/components/layouts/page/page.layout'
import styled from 'styled-components'

enum UserAuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

/**
 * Special router to protect routes by authorization
 * @constructor
 */
export function PrivateRoute(): JSX.Element {
  const [authStatus, setAuthStatus] = useState(UserAuthStatus.Loading)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const user = ((await dispatch(fetchUserData())) as unknown) as IUser

        if (user.id) {
          setAuthStatus(UserAuthStatus.SignedIn)
        } else {
          setAuthStatus(UserAuthStatus.SignedOut)
          dispatch(logoutUser())
        }
      } catch (error) {
        setAuthStatus(UserAuthStatus.SignedOut)
        dispatch(logoutUser())
      }
    })()
  }, [])

  return authStatus === UserAuthStatus.Loading ? (
    <PageLayout>
      <Logo />
      <ContentWrapper>
        <div>
          <Loading />
        </div>
        <div className="loading__title">Your data is loading...</div>
      </ContentWrapper>
    </PageLayout>
  ) : authStatus === UserAuthStatus.SignedIn ? (
    <Dashboard>
      <Outlet />
    </Dashboard>
  ) : (
    <Navigate to="/login" />
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  .loading__title {
    width: 100%;
    margin: 15px 0;
    text-align: center;
    line-height: 1.5em;
  }
`
