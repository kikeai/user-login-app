import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type userState, type State } from '../../types/types'

const initialState: State = {
  name: '',
  username: '',
  email: '',
  image: '',
  logged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      const { name, email, image, username } = action.payload
      state.name = name
      state.username = username
      state.email = email
      state.image = image
      state.logged = true
    },
    logOut: (state) => {
      state.name = ''
      state.username = ''
      state.email = ''
      state.image = ''
      state.logged = false
    }
  }
})

export default userSlice.reducer
export const { setUser, logOut } = userSlice.actions
