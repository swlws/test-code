import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import User from '../pages/User'
import NotFound from '../pages/NotFound'

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
