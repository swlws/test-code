import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../store/slices/appSlice'
import { logout } from '../../store/slices/userSlice'
import './Menu.css'

function Menu() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.app.theme)
  const userInfo = useSelector((state) => state.user.userInfo)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  // 菜单项配置
  const menuItems = [
    {
      key: 'home',
      label: '首页',
      path: '/',
      icon: '🏠'
    },
    {
      key: 'about',
      label: '关于',
      path: '/about',
      icon: 'ℹ️'
    },
    {
      key: 'user',
      label: '用户中心',
      path: '/user',
      icon: '👤',
      requireAuth: true
    },
    {
      key: 'user-management',
      label: '用户管理',
      icon: '👥',
      requireAuth: true,
      children: [
        {
          key: 'user-list',
          label: '用户列表',
          path: '/user-management',
          icon: '📋'
        },
        {
          key: 'add-user',
          label: '添加用户',
          path: '/user-management?action=add',
          icon: '➕'
        }
      ]
    }
  ]

  // 过滤菜单项（根据登录状态）
  const filteredMenuItems = menuItems.filter(item => {
    if (item.requireAuth && !isAuthenticated) {
      return false
    }
    return true
  })

  // 初始化展开状态：如果有激活的子菜单项，自动展开父菜单
  const getInitialExpandedState = () => {
    const expanded = {}
    menuItems.forEach(item => {
      if (item.children) {
        // 检查是否有子菜单项激活（用于自动展开）
        const hasActive = item.children.some(child => {
          if (child.path) {
            const targetPath = child.path.split('?')[0]
            const currentPath = location.pathname
            if (targetPath === '/') {
              return currentPath === '/'
            }
            // 精确匹配或作为前缀（后面跟斜杠）
            return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
          }
          return false
        })
        expanded[item.key] = hasActive
      }
    })
    return expanded
  }

  const [expandedMenus, setExpandedMenus] = useState(getInitialExpandedState())

  // 监听路由变化，自动展开包含激活子菜单的父菜单
  useEffect(() => {
    const newExpanded = {}
    menuItems.forEach(item => {
      if (item.children) {
        const hasActive = item.children.some(child => {
          if (child.path) {
            const targetPath = child.path.split('?')[0]
            const currentPath = location.pathname
            if (targetPath === '/') {
              return currentPath === '/'
            }
            // 精确匹配或作为前缀（后面跟斜杠）
            return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
          }
          return false
        })
        newExpanded[item.key] = hasActive || expandedMenus[item.key] || false
      }
    })
    // 只有当展开状态真正改变时才更新
    const hasChanged = Object.keys(newExpanded).some(
      key => newExpanded[key] !== expandedMenus[key]
    )
    if (hasChanged) {
      setExpandedMenus(prev => ({ ...prev, ...newExpanded }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // 切换子菜单展开/收起
  const toggleSubMenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // 检查路径是否精确匹配
  const isActive = (path) => {
    const currentPath = location.pathname
    const targetPath = path.split('?')[0] // 移除查询参数
    
    // 首页需要精确匹配
    if (targetPath === '/') {
      return currentPath === '/'
    }
    
    // 其他路径需要精确匹配，不能只是前缀匹配
    // 例如：/user 不应该匹配 /user-management
    return currentPath === targetPath || currentPath.startsWith(targetPath + '/')
  }

  // 检查是否有子菜单项激活（仅用于展开父菜单，不用于高亮）
  const hasActiveChild = (children) => {
    if (!children) return false
    return children.some(child => {
      if (child.path) {
        return isActive(child.path)
      }
      return false
    })
  }

  // 处理菜单项点击
  const handleMenuItemClick = (item) => {
    if (item.action === 'toggleTheme') {
      dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
      return
    }
    if (item.children) {
      toggleSubMenu(item.key)
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      dispatch(logout())
      navigate('/login')
    }
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="menu-brand">
          <h2>React Web应用</h2>
        </div>
        {userInfo && (
          <div className="menu-user-info">
            <span className="user-avatar">👤</span>
            <span className="user-name">{userInfo.name || '用户'}</span>
          </div>
        )}
      </div>

      <nav className="menu-nav">
        <ul className="menu-list">
          {filteredMenuItems.map((item) => (
            <li key={item.key} className="menu-item">
              {item.children ? (
                <>
                  <div
                    className="menu-item-link"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className={`menu-arrow ${expandedMenus[item.key] ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {expandedMenus[item.key] && (
                    <ul className="submenu-list">
                      {item.children.map((child) => (
                        <li key={child.key} className="submenu-item">
                          {child.action ? (
                            <div
                              className={`submenu-link ${child.action === 'toggleTheme' && theme === 'dark' ? 'active' : ''}`}
                              onClick={() => handleMenuItemClick(child)}
                            >
                              <span className="submenu-icon">{child.icon}</span>
                              <span className="submenu-label">{child.label}</span>
                            </div>
                          ) : (
                            <Link
                              to={child.path}
                              className={`submenu-link ${isActive(child.path.split('?')[0]) ? 'active' : ''}`}
                            >
                              <span className="submenu-icon">{child.icon}</span>
                              <span className="submenu-label">{child.label}</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`menu-item-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="menu-footer">
        {isAuthenticated && (
          <button onClick={handleLogout} className="menu-logout-button">
            <span className="menu-icon">🚪</span>
            <span>退出登录</span>
          </button>
        )}
        <div className="menu-theme-toggle">
          <button
            onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
            className="theme-toggle-button"
            title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
