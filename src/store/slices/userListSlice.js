import { createSlice } from '@reduxjs/toolkit'

// 模拟初始用户数据
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138001', role: 'admin', createTime: '2024-01-01' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138002', role: 'user', createTime: '2024-01-02' },
  { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138003', role: 'user', createTime: '2024-01-03' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', role: 'user', createTime: '2024-01-04' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', phone: '13800138005', role: 'user', createTime: '2024-01-05' }
]

const initialState = {
  users: mockUsers,
  currentPage: 1,
  pageSize: 10,
  total: mockUsers.length,
  searchKeyword: '',
  editingUser: null
}

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    // 添加用户
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        createTime: new Date().toISOString().split('T')[0]
      }
      state.users.push(newUser)
      state.total = state.users.length
    },
    // 删除用户
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
      state.total = state.users.length
    },
    // 更新用户
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload }
      }
    },
    // 设置当前页
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    // 设置每页数量
    setPageSize: (state, action) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    // 设置搜索关键词
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
      state.currentPage = 1
    },
    // 设置正在编辑的用户
    setEditingUser: (state, action) => {
      state.editingUser = action.payload
    },
    // 清除编辑状态
    clearEditingUser: (state) => {
      state.editingUser = null
    }
  }
})

export const {
  addUser,
  deleteUser,
  updateUser,
  setCurrentPage,
  setPageSize,
  setSearchKeyword,
  setEditingUser,
  clearEditingUser
} = userListSlice.actions

export default userListSlice.reducer
