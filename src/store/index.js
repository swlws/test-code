import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'
import userListReducer from './slices/userListSlice'

// 配置Redux Store
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    userList: userListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export default store
