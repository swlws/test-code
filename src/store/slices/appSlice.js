import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  theme: 'light', // light | dark
  language: 'zh-CN'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})

export const { setLoading, setTheme, setLanguage } = appSlice.actions
export default appSlice.reducer
