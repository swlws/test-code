# React Web应用

一个完整的React Web应用模板，集成了全局状态管理、路由配置和HTTP请求模块。

## 功能特性

- ✅ **React 18** - 使用最新的React特性
- ✅ **Redux Toolkit** - 强大的全局状态管理
- ✅ **React Router v6** - 声明式路由配置
- ✅ **Axios** - 封装好的HTTP请求模块，支持拦截器
- ✅ **Vite** - 快速的构建工具和开发服务器
- ✅ **ESLint** - 代码质量检查
- ✅ **深色/浅色主题切换** - 支持主题切换功能

## 项目结构

```
├── src/
│   ├── pages/          # 页面组件
│   │   ├── Home.jsx    # 首页
│   │   ├── About.jsx   # 关于页面
│   │   ├── User.jsx    # 用户中心
│   │   └── NotFound.jsx # 404页面
│   ├── store/          # Redux状态管理
│   │   ├── index.js    # Store配置
│   │   └── slices/     # Redux切片
│   │       ├── userSlice.js  # 用户状态
│   │       └── appSlice.js   # 应用状态
│   ├── router/         # 路由配置
│   │   └── index.jsx
│   ├── utils/          # 工具函数
│   │   └── request.js  # HTTP请求封装
│   ├── App.jsx         # 主应用组件
│   └── main.jsx        # 应用入口
├── package.json
├── vite.config.js
└── index.html
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 全局状态管理（Redux）

项目使用Redux Toolkit进行状态管理，包含两个主要切片：

1. **userSlice** - 用户相关状态
   - `userInfo` - 用户信息
   - `token` - 认证令牌
   - `isAuthenticated` - 登录状态

2. **appSlice** - 应用全局状态
   - `loading` - 加载状态
   - `theme` - 主题（light/dark）
   - `language` - 语言设置

使用示例：

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from './store/slices/appSlice'

function MyComponent() {
  const theme = useSelector((state) => state.app.theme)
  const dispatch = useDispatch()
  
  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }
  
  return <div>当前主题: {theme}</div>
}
```

### 路由配置

路由配置在 `src/router/index.jsx` 中，使用React Router v6：

```jsx
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'user', element: <User /> }
    ]
  }
])
```

### HTTP请求模块

HTTP请求模块封装在 `src/utils/request.js`，基于axios：

```jsx
import { http } from './utils/request'

// GET请求
const data = await http.get('/api/users', { params: { id: 1 } })

// POST请求
const result = await http.post('/api/users', { name: 'John', email: 'john@example.com' })

// PUT请求
await http.put('/api/users/1', { name: 'Jane' })

// DELETE请求
await http.delete('/api/users/1')
```

请求拦截器会自动添加认证token，响应拦截器会统一处理错误。

### 环境变量配置

创建 `.env` 文件（参考 `.env.example`）：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 技术栈

- **React** 18.2.0
- **React Router** 6.20.0
- **Redux Toolkit** 2.0.1
- **React Redux** 9.0.4
- **Axios** 1.6.2
- **Vite** 5.0.8

## 开发建议

1. 新增页面时，在 `src/pages/` 目录下创建组件，并在 `src/router/index.jsx` 中添加路由
2. 新增状态管理时，在 `src/store/slices/` 目录下创建新的slice
3. API请求统一使用 `src/utils/request.js` 中的 `http` 对象
4. 组件样式建议使用CSS模块或styled-components，本项目使用普通CSS文件

## License

MIT
