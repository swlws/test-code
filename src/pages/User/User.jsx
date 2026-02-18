import { useSelector } from 'react-redux'
import './User.css'

function User() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <div className="user">
        <h1>用户中心</h1>
        <div className="not-logged-in">
          <p>请先登录</p>
        </div>
      </div>
    )
  }

  return (
    <div className="user">
      <h1>用户中心</h1>

      <div className="user-info">
        <h2>个人信息</h2>
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
            <strong>角色:</strong> {userInfo?.role === 'admin' ? '管理员' : '普通用户'}
          </div>
          <div className="info-item">
            <strong>登录状态:</strong> <span className="status-active">已登录</span>
          </div>
        </div>
      </div>

      <div className="redux-info">
        <h3>Redux状态管理示例</h3>
        <p>这个页面演示了如何使用Redux进行全局状态管理：</p>
        <ul>
          <li>使用 <code>useSelector</code> 获取状态</li>
          <li>状态变化会自动更新所有使用该状态的组件</li>
          <li>用户信息存储在全局状态中，可以在任何组件中访问</li>
        </ul>
      </div>
    </div>
  )
}

export default User
