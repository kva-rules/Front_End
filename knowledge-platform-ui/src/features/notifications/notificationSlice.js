import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  unreadCount: 0,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.read).length
    },
    addNotification(state, action) {
      state.notifications.unshift(action.payload)
      state.unreadCount += 1
    },
    markAsRead(state, action) {
      const id = action.payload
      const item = state.notifications.find((n) => n.id === id)
      if (item && !item.read) {
        item.read = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
  },
})

export const { setNotifications, addNotification, markAsRead } = notificationSlice.actions
export default notificationSlice.reducer
