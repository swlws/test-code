import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    const { data } = response
    if (data.code === 200 || data.success) {
      return data
    }
    // 处理业务错误
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，可以跳转到登录页
          console.error('未授权，请重新登录')
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求地址不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求失败')
      }
    }
    return Promise.reject(error)
  }
)

// 封装请求方法
export const http = {
  get: (url, params) => {
    return request.get(url, { params })
  },
  post: (url, data) => {
    return request.post(url, data)
  },
  put: (url, data) => {
    return request.put(url, data)
  },
  delete: (url, params) => {
    return request.delete(url, { params })
  },
  patch: (url, data) => {
    return request.patch(url, data)
  }
}

export default request
