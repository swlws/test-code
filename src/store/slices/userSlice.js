import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = !!action.payload
      if (action.payload) {
        localStorage.setItem('token', action.payload)
      } else {
        localStorage.removeItem('token')
      }
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})

export const { setUserInfo, setToken, logout } = userSlice.actions
export default userSlice.reducer
