import { type UserRegister } from '../../types/types'

const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const usernameRegex = /^[a-zA-Z0-9_]+$/

function securePassword (password: string) {
  // Requisitos mínimos de seguridad de la password
  const tieneMayuscula = /[A-Z]/.test(password)
  const tieneMinuscula = /[a-z]/.test(password)
  const tieneNumero = /\d/.test(password)
  const tieneCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  // Verificar si la password cumple con los requisitos mínimos
  const complejidadBaja1 = tieneMinuscula && !tieneMayuscula && !tieneCaracterEspecial
  const complejidadBaja2 = tieneNumero && !tieneMayuscula && !tieneCaracterEspecial
  const complejidadBaja3 = tieneNumero && tieneMayuscula && !tieneCaracterEspecial && !tieneMinuscula
  const complejidadBaja4 = !tieneNumero && tieneMayuscula && !tieneCaracterEspecial && tieneMinuscula
  const complejidadBaja5 = tieneNumero && !tieneMayuscula && tieneCaracterEspecial && !tieneMinuscula
  const complejidadBaja6 = !tieneNumero && !tieneMayuscula && tieneCaracterEspecial && tieneMinuscula
  const complejidadMedia = tieneMinuscula && tieneNumero && tieneMayuscula && !tieneCaracterEspecial
  const complejidadMedia2 = tieneMinuscula && tieneNumero && !tieneMayuscula && tieneCaracterEspecial
  const complejidadMedia3 = tieneMinuscula && !tieneNumero && tieneMayuscula && tieneCaracterEspecial
  const complejidadMedia4 = !tieneMinuscula && tieneNumero && tieneMayuscula && tieneCaracterEspecial
  const complejidadAlta = tieneMinuscula && tieneNumero && tieneMayuscula && tieneCaracterEspecial

  return complejidadBaja1 || complejidadBaja2 || complejidadBaja3 || complejidadBaja4 || complejidadBaja5 || complejidadBaja6 ? 'Insegura' : complejidadMedia || complejidadMedia2 || complejidadMedia3 || complejidadMedia4 ? 'Aceptable' : complejidadAlta ? 'Segura' : ''
}

export const validateRegister = ({ name, email, username, password, confirmPassword }: UserRegister) => {
  const errors: UserRegister = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    google_id: '',
    image: ''
  }

  // VALIDACIONES PARA EL NOMBRE
  if (!nameRegex.test(name)) errors.name = 'No uses símbolos especiales o números'
  if (name.length < 4) errors.name = 'Almenos 4 letras'
  if (name.length > 20) errors.name = 'Máximo 20 letras'
  if (name.length === 0) errors.name = ''

  // VALIDACIONES PARA EL EMAIL
  if (!emailRegex.test(email)) errors.email = 'Usa el formato correcto'
  if (email.length < 15) errors.email = 'Almenos 10 caracteres'
  if (email.length > 256) errors.email = 'Máximo 256 caracteres'
  if (email.length === 0) errors.email = ''

  // VALIDACIONES PARA EL USERNAME
  if (!usernameRegex.test(username)) errors.username = 'No uses símbolos especiales'
  if (username.length < 4) errors.username = 'Almenos 4 letras'
  if (username.length > 20) errors.username = 'Máximo 20 letras'
  if (username.length === 0) errors.username = ''

  // VALIDACIONES PARA LA CONTRASEÑA
  if (password.length < 8) errors.password = 'Almenos 8 caracteres'
  if (password.length >= 8) errors.password = securePassword(password)
  if (password.length === 0) errors.password = ''

  // VALIDACIONES PARA LA VALIDACIÓN DE CONTRASEÑA
  if (confirmPassword !== password) errors.confirmPassword = 'Las contraseñas deben coincidir'
  if (confirmPassword.length === 0) errors.confirmPassword = ''

  return errors
}
