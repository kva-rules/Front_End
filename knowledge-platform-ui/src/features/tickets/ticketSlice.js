import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
  status: 'idle',
  error: null,
}

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload
      state.status = 'succeeded'
    },
    addTicket(state, action) {
      state.tickets.unshift(action.payload)
    },
    setTicketError(state, action) {
      state.error = action.payload
      state.status = 'failed'
    },
  },
})

export const { setTickets, addTicket, setTicketError } = ticketSlice.actions
export default ticketSlice.reducer
