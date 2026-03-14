import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  selected: null,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.list = action.payload
      state.status = 'succeeded'
    },
    setSelectedUser(state, action) {
      state.selected = action.payload
    },
    setUsersError(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setUsers, setSelectedUser, setUsersError } = userSlice.actions
export default userSlice.reducer
