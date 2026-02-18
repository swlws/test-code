import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../store/slices/appSlice'
import { http } from '../utils/request'
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.app.loading)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // 示例：使用HTTP请求模块
  const fetchData = async () => {
    try {
      dispatch(setLoading(true))
      setError(null)
      // 这里使用一个公开的测试API
      const response = await http.get('https://jsonplaceholder.typicode.com/posts/1')
      setData(response)
    } catch (err) {
      setError(err.message || '请求失败')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="home">
      <h1>欢迎来到首页</h1>
      <p>这是一个使用 React + Redux + React Router 构建的Web应用示例</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>🚀 React 18</h3>
          <p>使用最新的React特性构建用户界面</p>
        </div>
        <div className="feature-card">
          <h3>📦 Redux Toolkit</h3>
          <p>强大的全局状态管理解决方案</p>
        </div>
        <div className="feature-card">
          <h3>🛣️ React Router</h3>
          <p>声明式的路由配置和导航</p>
        </div>
        <div className="feature-card">
          <h3>🌐 Axios</h3>
          <p>封装好的HTTP请求模块，支持拦截器</p>
        </div>
      </div>

      <div className="demo-section">
        <h2>HTTP请求示例</h2>
        <button onClick={fetchData} disabled={loading} className="demo-button">
          {loading ? '加载中...' : '获取数据'}
        </button>
        
        {error && (
          <div className="error-message">
            <p>错误: {error}</p>
          </div>
        )}
        
        {data && (
          <div className="data-display">
            <h3>获取到的数据：</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
