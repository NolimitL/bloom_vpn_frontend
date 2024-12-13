import { Provider } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from '~/store/config'

const { store, persistor } = configureStore()

import { PrivateRoute } from '~/components/private-route/PrivateRoute'
import { SignUpPage } from '~/pages/signup/signup.page'
import { LoginPage } from '~/pages/login/login.page'
import { DashboardPage } from '~/pages/dashboard/dashboard.page'
import { SettingsPage } from '~/pages/settings/settings.page'
import { PaymentsPage } from '~/pages/payments/payments.page'
import { SubscriptionsPage } from '~/pages/subscriptions/subscriptions.page'
import { ConfirmEmailPage } from '~/pages/confirm-email/confirm-email.page'
import { PasswordResetRequestPage } from '~/pages/password-reset/request/password-reset.request.page'
import { PasswordResetPage } from '~/pages/password-reset/reset/password-reset.page'
import { DownloadPage } from '~/pages/download/download.page'
import { IpLookupWrapper } from '~/components/wrappers/ip-lookup.wrapper'

export function App(): JSX.Element {
  return (
    <>
      {/*@ts-ignore fixme later*/}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IpLookupWrapper />
          <Router>
            <Routes>
              {/* Public routers */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/confirm/email" element={<ConfirmEmailPage />} />
              <Route path="/download-app" element={<DownloadPage />} />

              {/* Reset password routers*/}
              <Route path="/reset/request/email" element={<PasswordResetRequestPage />} />
              <Route path="/reset/password" element={<PasswordResetPage />} />

              {/* Private routes protected by authorization */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Route by undefined request or redirect at 404 error */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  )
}
