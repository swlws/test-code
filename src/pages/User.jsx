import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo, setToken, logout } from '../store/slices/userSlice'
import './User.css'

function User() {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const handleLogin = () => {
    // 模拟登录
    const mockUser = {
      id: 1,
      name: formData.name || '测试用户',
      email: formData.email || 'test@example.com'
    }
    const mockToken = 'mock_token_' + Date.now()
    
    dispatch(setToken(mockToken))
    dispatch(setUserInfo(mockUser))
    
    setFormData({ name: '', email: '' })
    alert('登录成功！')
  }

  const handleLogout = () => {
    dispatch(logout())
    alert('已退出登录')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="user">
      <h1>用户中心</h1>

      {!isAuthenticated ? (
        <div className="login-form">
          <h2>登录</h2>
          <div className="form-group">
            <label htmlFor="name">用户名:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="请输入用户名"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">邮箱:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="请输入邮箱"
            />
          </div>
          <button onClick={handleLogin} className="login-button">
            登录
          </button>
        </div>
      ) : (
        <div className="user-info">
          <h2>用户信息</h2>
          <div className="info-card">
            <div className="info-item">
              <strong>用户ID:</strong> {userInfo?.id}
            </div>
            <div className="info-item">
              <strong>用户名:</strong> {userInfo?.name}
            </div>
            <div className="info-item">
              <strong>邮箱:</strong> {userInfo?.email}
            </div>
            <div className="info-item">
              <strong>登录状态:</strong> <span className="status-active">已登录</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            退出登录
          </button>
        </div>
      )}

      <div className="redux-info">
        <h3>Redux状态管理示例</h3>
        <p>这个页面演示了如何使用Redux进行全局状态管理：</p>
        <ul>
          <li>使用 <code>useSelector</code> 获取状态</li>
          <li>使用 <code>useDispatch</code> 派发动作</li>
          <li>状态变化会自动更新所有使用该状态的组件</li>
        </ul>
      </div>
    </div>
  )
}

export default User
