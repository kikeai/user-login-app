import Button from '../../Components/button/Button'
import Input from '../../Components/input/Input'
import { useState } from 'react'
import { type NewPassword } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validate } from './ValidateChangePassword'
import Spin from '../../Components/Spin'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [responseSubmit, setResponseSubmit] = useState('')
  const [newPassword, setNewPassword] = useState<NewPassword>({
    newPassword: '',
    confirmNewPassword: ''
  })
  const [errorNewPassword, setErrorNewPassword] = useState<NewPassword>({
    newPassword: '',
    confirmNewPassword: ''
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setErrorSubmit('')
    setResponseSubmit('')
    setNewPassword({
      ...newPassword,
      [name]: value
    })
    setErrorNewPassword(validate({
      ...newPassword,
      [name]: value
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (Object.values(newPassword).some(x => x === '') || Object.values(errorNewPassword).some(x => x !== '' && x !== 'Insegura' && x !== 'Aceptable' && x !== 'Segura')) {
      return
    }
    setLoading(true)
    axios.put('/user/password', { newPassword: newPassword.newPassword }, { withCredentials: true })
      .then(res => {
        setResponseSubmit(res.data.message)
        setLoading(false)
      })
      .catch(err => {
        setErrorSubmit(err.response.data.error)
        setLoading(false)
      })
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Change Password</h1>
        <Input
        value={newPassword.newPassword}
        name='newPassword'
        error={errorNewPassword.newPassword}
        type='password'
        placeholder='New password'
        onChange={handleChange}
        />
        <Input
        value={newPassword.confirmNewPassword}
        name='confirmNewPassword'
        error={errorNewPassword.confirmNewPassword}
        type='password'
        placeholder='Repeat password'
        onChange={handleChange}
        />
        <Spin visible={loading} />
        <p className={`font-semibold text-sm text-green-700 bg-green-200 rounded p-1 ${responseSubmit === '' ? 'hidden' : ''}`}>{responseSubmit}</p>
        <p className={`font-semibold text-sm text-red-700 bg-red-200 rounded p-1 ${errorSubmit === '' ? 'hidden' : ''}`}>{errorSubmit}</p>
        <div className='flex gap-4'>
          <Button
          type='button'
          text='Come back'
          onClick={() => navigate('/user')}
          stretch={false}
          />
          <Button
          type='submit'
          text='Change'
          onClick={() => {
            if (Object.values(newPassword).some(x => x === '')) setErrorSubmit('*Llena todos los campos')
            else if (Object.values(errorNewPassword).some(x => x !== '' && x !== 'Insegura' && x !== 'Aceptable' && x !== 'Segura')) setErrorSubmit('*Rectifica la información')
          }}
          stretch={false}
          />
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
