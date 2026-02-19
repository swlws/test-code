import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Menu from './components/Menu/Menu'
import './App.css'

function App() {
  const theme = useSelector((state) => state.app.theme)

  return (
    <div className={`app ${theme}`}>
      <Menu />
      <div className="app-content">
        <main className="app-main">
          <Outlet />
        </main>
        <footer className="app-footer">
          <p>© 2026 React Web应用. 使用 React + Redux + React Router 构建</p>
        </footer>
      </div>
    </div>
  )
}

export default App
