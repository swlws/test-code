import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addUser,
  deleteUser,
  updateUser,
  setCurrentPage,
  setPageSize,
  setSearchKeyword,
  setEditingUser,
  clearEditingUser
} from '../../store/slices/userListSlice'
import './UserManagement.css'

function UserManagement() {
  const dispatch = useDispatch()
  const { users, currentPage, pageSize, total, searchKeyword, editingUser } = useSelector(
    (state) => state.userList
  )

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user'
  })
  const [formErrors, setFormErrors] = useState({})

  // 过滤用户列表
  const filteredUsers = useMemo(() => {
    if (!searchKeyword.trim()) {
      return users
    }
    const keyword = searchKeyword.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.includes(keyword)
    )
  }, [users, searchKeyword])

  // 分页计算
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return filteredUsers.slice(start, end)
  }, [filteredUsers, currentPage, pageSize])

  const totalPages = Math.ceil(filteredUsers.length / pageSize)

  // 表单验证
  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = '请输入用户名'
    }
    if (!formData.email.trim()) {
      errors.email = '请输入邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '邮箱格式不正确'
    }
    if (!formData.phone.trim()) {
      errors.phone = '请输入手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '手机号格式不正确'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // 打开添加用户模态框
  const handleAddUser = () => {
    setFormData({ name: '', email: '', phone: '', role: 'user' })
    setFormErrors({})
    setShowModal(true)
    dispatch(clearEditingUser())
  }

  // 打开编辑用户模态框
  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    })
    setFormErrors({})
    dispatch(setEditingUser(user))
    setShowModal(true)
  }

  // 保存用户（添加或更新）
  const handleSaveUser = () => {
    if (!validateForm()) {
      return
    }

    if (editingUser) {
      // 更新用户
      dispatch(updateUser({ ...editingUser, ...formData }))
    } else {
      // 添加用户
      dispatch(addUser(formData))
    }

    setShowModal(false)
    setFormData({ name: '', email: '', phone: '', role: 'user' })
    setFormErrors({})
    dispatch(clearEditingUser())
  }

  // 删除用户
  const handleDeleteUser = (userId) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      dispatch(deleteUser(userId))
      // 如果删除后当前页没有数据，跳转到上一页
      if (paginatedUsers.length === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1))
      }
    }
  }

  // 处理搜索
  const handleSearch = (e) => {
    dispatch(setSearchKeyword(e.target.value))
    dispatch(setCurrentPage(1))
  }

  // 处理分页
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  const handlePageSizeChange = (e) => {
    dispatch(setPageSize(Number(e.target.value)))
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>用户管理</h1>
        <button onClick={handleAddUser} className="add-button">
          + 添加用户
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索用户名、邮箱或手机号..."
            value={searchKeyword}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="page-size-selector">
          <label>每页显示：</label>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>手机号</th>
              <th>角色</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-data">
                  {searchKeyword ? '没有找到匹配的用户' : '暂无用户数据'}
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role === 'admin' ? '管理员' : '普通用户'}
                    </span>
                  </td>
                  <td>{user.createTime}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="edit-button"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete-button"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            上一页
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            下一页
          </button>
          <span className="page-info">
            第 {currentPage} / {totalPages} 页，共 {filteredUsers.length} 条记录
          </span>
        </div>
      )}

      {/* 添加/编辑用户模态框 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUser ? '编辑用户' : '添加用户'}</h2>
              <button
                className="modal-close"
                onClick={() => {
                  setShowModal(false)
                  setFormErrors({})
                  dispatch(clearEditingUser())
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">用户名 *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && (
                  <span className="error-message">{formErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">邮箱 *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && (
                  <span className="error-message">{formErrors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">手机号 *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && (
                  <span className="error-message">{formErrors.phone}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="role">角色</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowModal(false)
                  setFormErrors({})
                  dispatch(clearEditingUser())
                }}
              >
                取消
              </button>
              <button className="save-button" onClick={handleSaveUser}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
