import { type UserLogin } from '../../types/types'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const validateLogin = ({ email, password }: UserLogin) => {
  const errors: UserLogin = {
    email: '',
    password: '',
    google_id: ''
  }

  // VALIDACIONES PARA EL EMAIL
  if (!emailRegex.test(email)) errors.email = 'Usa el formato correcto'
  if (email.length < 15) errors.email = 'Almenos 10 caracteres'
  if (email.length > 256) errors.email = 'Máximo 256 caracteres'
  if (email.length === 0) errors.email = ''

  // VALIDACIONES PARA LA CONTRASEÑA
  if (password.length < 8) errors.password = 'Almenos 8 caracteres'
  if (password.length > 100) errors.password = 'Maximo 100 caracteres'
  if (password.length === 0) errors.password = ''

  return errors
}
