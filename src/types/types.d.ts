export interface ButtonProps {
  text: string
  type: 'button' | 'reset' | 'submit'
  onClick: React.MouseEventHandler<HTMLButtonElement>
  stretch: boolean
}

type TypesInput = 'number' | 'text' | 'password' | 'search' | 'button' | 'email' | 'file'

export interface InputProps {
  value: string
  name: string
  placeholder: string
  type: TypesInput
  onChange: React.ChangeEventHandler<HTMLInputElement>
  error: string
}

export interface UserLogin {
  email: string
  password: string
  google_id: string | null
}

export interface UserRegister {
  email: string
  name: string
  username: strign
  password: string
  image: string
  google_id: string | null
  confirmPassword: string
}

export interface NewPassword {
  newPassword: string
  confirmNewPassword: string
}

export interface State {
  name: string
  username: string
  email: string
  image: string
  logged: boolean
}

export interface userState extends Omit<State, 'logged'> {}

export type ActionTypes =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'CHANGE_PASSWORD'
  | 'CHANGE_USERNAME'
  | 'CHANGE_IMAGE'
  | 'USER_SINGIN'
  | 'USER_SINGOUT'

export type Action =
  | { type: ActionTypes, payload: any }
