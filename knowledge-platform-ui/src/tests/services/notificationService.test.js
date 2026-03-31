import apiClient from '../../services/apiClient'
import { getUserNotifications, markNotificationRead, deleteNotification } from '../../services/notificationService'

jest.mock('../../services/apiClient', () => ({ get: jest.fn(), put: jest.fn(), delete: jest.fn() }))

describe('notificationService', () => {
  beforeEach(() => jest.clearAllMocks())

  it('fetches notifications for a user', () => {
    getUserNotifications('user-1')
    expect(apiClient.get).toHaveBeenCalledWith('/notifications/users/user-1')
  })

  it('marks a notification as read', () => {
    markNotificationRead('note-1')
    expect(apiClient.put).toHaveBeenCalledWith('/notifications/note-1/read')
  })

  it('deletes a notification', () => {
    deleteNotification('note-1')
    expect(apiClient.delete).toHaveBeenCalledWith('/notifications/note-1')
  })
})
