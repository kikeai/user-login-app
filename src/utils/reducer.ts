import { useReducer } from 'react'
import { type Action, type State } from '../types/types'

export const initialState: State = {
  name: '',
  username: '',
  email: '',
  image: '',
  logged: false
}

export function reducer (state = initialState, action: Action) {
  const { type } = action

  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        name: 'q onda gente'
      }
    default:
      return state
  }
}

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const userLogin = () => {
    dispatch({ type: 'USER_LOGIN', payload: '' })
  }

  return {
    state,
    userLogin
  }
}

export default useStore
