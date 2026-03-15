class NotificationSocket {
  constructor(url, onMessage, onOpen, onError, onClose) {
    this.url = url
    this.onMessage = onMessage
    this.onOpen = onOpen
    this.onError = onError
    this.onClose = onClose
    this.socket = null
    this.reconnectInterval = 5000
  }

  connect() {
    if (this.socket) {
      this.socket.close()
    }

    this.socket = new WebSocket(this.url)

    this.socket.onopen = (event) => {
      this.onOpen?.(event)
    }

    this.socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        this.onMessage?.(payload)
      } catch (err) {
        console.error('Failed to parse notification message', err)
      }
    }

    this.socket.onerror = (event) => {
      console.error('WebSocket error', event)
      this.onError?.(event)
    }

    this.socket.onclose = (event) => {
      this.onClose?.(event)
      setTimeout(() => this.connect(), this.reconnectInterval)
    }
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket not open. Cannot send message.')
    }
  }

  close() {
    this.socket?.close()
    this.socket = null
  }
}

let notificationSocket = null

export const initNotificationSocket = (handlers = {}) => {
  if (!notificationSocket) {
    notificationSocket = new NotificationSocket(
      'ws://localhost:8080/ws/notifications',
      handlers.onMessage,
      handlers.onOpen,
      handlers.onError,
      handlers.onClose
    )
    notificationSocket.connect()
  }
  return notificationSocket
}

export const closeNotificationSocket = () => {
  notificationSocket?.close()
  notificationSocket = null
}
