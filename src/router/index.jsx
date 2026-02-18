import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import User from '../pages/User/User'
import UserManagement from '../pages/UserManagement/UserManagement'
import NotFound from '../pages/NotFound/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'

// 路由配置
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        )
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        )
      },
      {
        path: 'user-management',
        element: (
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
