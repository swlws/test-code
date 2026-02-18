import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from './store/slices/appSlice'
import { logout } from './store/slices/userSlice'
import './App.css'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.app.theme)
  const userInfo = useSelector((state) => state.user.userInfo)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      dispatch(logout())
      navigate('/login')
    }
  }

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>React Web应用</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                首页
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                关于
              </Link>
            </li>
            <li>
              <Link to="/user" className={location.pathname === '/user' ? 'active' : ''}>
                用户中心
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/user-management" className={location.pathname === '/user-management' ? 'active' : ''}>
                  用户管理
                </Link>
              </li>
            )}
          </ul>
          <div className="nav-actions">
            {userInfo && <span className="user-name">{userInfo.name || '用户'}</span>}
            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-nav-button" title="退出登录">
                退出
              </button>
            )}
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© 2026 React Web应用. 使用 React + Redux + React Router 构建</p>
      </footer>
    </div>
  )
}

export default App
