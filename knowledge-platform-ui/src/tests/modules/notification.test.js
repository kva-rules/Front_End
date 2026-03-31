import { initNotificationSocket, closeNotificationSocket } from '../../services/notificationSocket'

describe('Notification module', () => {
  const mockSocket = {
    close: jest.fn(),
    send: jest.fn(),
    readyState: 1,
    onopen: null,
    onmessage: null,
    onerror: null,
    onclose: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    closeNotificationSocket()
    global.WebSocket = jest.fn(() => mockSocket)
  })

  it('connects to the WebSocket endpoint', () => {
    const onOpen = jest.fn()
    const socket = initNotificationSocket({ onOpen })
    expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:8080/ws/notifications')
    expect(socket).toBeDefined()
  })

  it('parses incoming JSON messages and invokes onMessage', () => {
    const onMessage = jest.fn()
    initNotificationSocket({ onMessage })
    mockSocket.onmessage({ data: JSON.stringify({ type: 'new-notification' }) })
    expect(onMessage).toHaveBeenCalledWith({ type: 'new-notification' })
  })

  it('closes and resets the socket', () => {
    initNotificationSocket({})
    closeNotificationSocket()
    expect(mockSocket.close).toHaveBeenCalled()
  })
})
