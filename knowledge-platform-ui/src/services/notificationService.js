import apiClient from './apiClient'

export const getUserNotifications = (userId) => apiClient.get(`/notifications/users/${userId}`)
export const markNotificationRead = (notificationId) => apiClient.put(`/notifications/${notificationId}/read`)
export const deleteNotification = (notificationId) => apiClient.delete(`/notifications/${notificationId}`)
