import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, setToken } from '../../store/slices/userSlice'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 如果已登录，重定向到首页
  if (isAuthenticated) {
    navigate('/')
    return null
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 简单的表单验证
    if (!formData.username.trim()) {
      setError('请输入用户名')
      setLoading(false)
      return
    }

    if (!formData.password.trim()) {
      setError('请输入密码')
      setLoading(false)
      return
    }

    try {
      // 模拟登录API调用
      // 实际项目中应该调用真实的API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟登录成功
      const mockUser = {
        id: Date.now(),
        name: formData.username,
        email: `${formData.username}@example.com`,
        role: 'admin'
      }
      const mockToken = 'token_' + Date.now()
      
      dispatch(setToken(mockToken))
      dispatch(setUserInfo(mockUser))
      
      // 登录成功后跳转到首页
      navigate('/')
    } catch (err) {
      setError('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>用户登录</h1>
          <p>欢迎回来，请登录您的账户</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="login-footer">
          <p>提示：任意用户名和密码即可登录（演示模式）</p>
        </div>
      </div>
    </div>
  )
}

export default Login
