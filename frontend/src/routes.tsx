import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login'
import RegisterPage from './pages/register'
import SchedulesPage from './pages/schedules'
import HomePage from './pages/home'
import ProfilePage from './pages/profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/schedules',
    element: <SchedulesPage />,
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
  },
])

export default router
