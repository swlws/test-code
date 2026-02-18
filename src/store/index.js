import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'

// 配置Redux Store
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export default store
