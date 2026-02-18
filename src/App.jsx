import { Outlet, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from './store/slices/appSlice'
import './App.css'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.app.theme)
  const userInfo = useSelector((state) => state.user.userInfo)

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
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
                用户
              </Link>
            </li>
          </ul>
          <div className="nav-actions">
            {userInfo && <span className="user-name">{userInfo.name || '用户'}</span>}
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
