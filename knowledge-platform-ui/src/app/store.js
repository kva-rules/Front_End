import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import leaderboardReducer from '../features/leaderboard/leaderboardSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notifications: notificationReducer,
    leaderboard: leaderboardReducer,
    users: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
