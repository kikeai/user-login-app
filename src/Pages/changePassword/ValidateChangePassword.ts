import { type NewPassword } from '../../types/types'
import { securePassword } from '../register/validateRegister'

export const validate = ({ newPassword, confirmNewPassword }: NewPassword) => {
  const errors = {
    newPassword: '',
    confirmNewPassword: ''
  }

  // VALIDACIONES PARA LA CONTRASEÑA
  if (newPassword.length < 8) errors.newPassword = 'Almenos 8 caracteres'
  if (newPassword.length >= 8) errors.newPassword = securePassword(newPassword)
  if (newPassword.length === 0) errors.newPassword = ''

  // VALIDACIONES PARA LA VALIDACIÓN DE CONTRASEÑA
  if (confirmNewPassword !== newPassword) errors.confirmNewPassword = 'Las contraseñas deben coincidir'
  if (confirmNewPassword.length === 0) errors.confirmNewPassword = ''

  return errors
}
