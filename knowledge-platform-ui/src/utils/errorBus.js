const listeners = new Set()

export const subscribeGlobalError = (listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const publishGlobalError = (error) => {
  const message = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred.'
  listeners.forEach((listener) => {
    try {
      listener(message)
    } catch (e) {
      console.error('Global error listener failed', e)
    }
  })
}
