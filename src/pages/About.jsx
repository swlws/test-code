import { useSelector } from 'react-redux'
import './About.css'

function About() {
  const theme = useSelector((state) => state.app.theme)
  const language = useSelector((state) => state.app.language)
  const userInfo = useSelector((state) => state.user.userInfo)

  return (
    <div className="about">
      <h1>关于我们</h1>
      
      <section className="about-section">
        <h2>项目信息</h2>
        <p>这是一个完整的React Web应用模板，集成了以下功能：</p>
        <ul>
          <li>React 18 - 现代化的UI框架</li>
          <li>Redux Toolkit - 全局状态管理</li>
          <li>React Router v6 - 路由管理</li>
          <li>Axios - HTTP请求封装</li>
          <li>Vite - 快速的构建工具</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>当前状态</h2>
        <div className="state-info">
          <div className="state-item">
            <strong>主题:</strong> {theme === 'light' ? '浅色' : '深色'}
          </div>
          <div className="state-item">
            <strong>语言:</strong> {language}
          </div>
          <div className="state-item">
            <strong>用户状态:</strong> {userInfo ? '已登录' : '未登录'}
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>技术栈</h2>
        <div className="tech-stack">
          <div className="tech-item">React</div>
          <div className="tech-item">Redux Toolkit</div>
          <div className="tech-item">React Router</div>
          <div className="tech-item">Axios</div>
          <div className="tech-item">Vite</div>
          <div className="tech-item">ESLint</div>
        </div>
      </section>
    </div>
  )
}

export default About
