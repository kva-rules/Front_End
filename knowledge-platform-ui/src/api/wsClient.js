import { WS_URL } from '../constants'

export function createWsClient(onOpen, onMessage, onError, onClose) {
  const socket = new WebSocket(WS_URL)
  socket.onopen = onOpen
  socket.onmessage = onMessage
  socket.onerror = onError
  socket.onclose = onClose
  return socket
}

export default createWsClient
