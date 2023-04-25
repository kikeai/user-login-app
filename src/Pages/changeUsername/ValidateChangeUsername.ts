const usernameRegex = /^[a-zA-Z0-9_]+$/

export const validate = (newUsername: string) => {
  let errorNewUsername = ''
  if (!usernameRegex.test(newUsername)) errorNewUsername = 'No uses símbolos especiales'
  if (newUsername.length < 4) errorNewUsername = 'Almenos 4 caracteres'
  if (newUsername.length > 20) errorNewUsername = 'Máximo 20 caracteres'
  if (newUsername.length === 0) errorNewUsername = ''
  return errorNewUsername
}
