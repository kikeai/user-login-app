import Button from '../../Components/button/Button'
import Input from '../../Components/input/Input'
import { useState } from 'react'
import { type NewPassword } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import axios from 'axios'

const ChangePassword = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<NewPassword>({
    newPassword: '',
    confirmNewPassword: ''
  })
  const navigate = useNavigate()
  const { email } = useAppSelector(state => state.user)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setNewPassword({
      ...newPassword,
      [name]: value
    })
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/user/password', { email, newPassword: newPassword.newPassword })
      .then(res => {
        console.log(res.data)
        navigate('/user')
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Change Password</h1>
        <Input
        value={newPassword.newPassword}
        name='newPassword'
        type={visible ? 'text' : 'password'}
        placeholder='New password'
        onChange={handleChange}
        />
        <Input
        value={newPassword.confirmNewPassword}
        name='confirmNewPassword'
        type={visible ? 'text' : 'password'}
        placeholder='Repeat password'
        onChange={handleChange}
        />
        <p
        onClick={handleVisible}
        hidden={newPassword.newPassword === '' && newPassword.confirmNewPassword === ''}
        className='text-lg text-center font-semibold underline hover:cursor-pointer'>
          {visible ? 'Do not show' : 'Show Password'}
        </p>
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
          onClick={() => {}}
          stretch={false}
          />
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
