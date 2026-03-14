import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rankings: [],
  status: 'idle',
  error: null,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setRankings(state, action) {
      state.rankings = action.payload
      state.status = 'succeeded'
    },
    setLeaderboardError(state, action) {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setRankings, setLeaderboardError } = leaderboardSlice.actions
export default leaderboardSlice.reducer
