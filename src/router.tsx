import { createBrowserRouter } from 'react-router'
import { AppShell } from '@/app/layout/app-shell'
import { ErrorPage } from '@/app/layout/error-page'
import DashboardPage from '@/routes/dashboard/page'
import UsersPage from '@/routes/users/page'
import SettingsPage from '@/routes/settings/page'
import LoginPage from '@/routes/login/page'

/**
 * Every route in the app lives here. One file, so the whole surface is readable
 * in one go. Add a route by adding an entry and a `src/routes/<name>/page.tsx`.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
])
