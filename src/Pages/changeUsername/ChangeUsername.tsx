import Button from '../../Components/button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/input/Input'
import { useAppDispatch, useAppSelector } from '../../store/store'
import axios from 'axios'
import { setUser } from '../../store/features/userSlice'

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state.user)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/user/username', { email, newUsername })
      .then(res => {
        dispatch(setUser(res.data))
        navigate('/user')
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Change Password</h1>
        <Input
        value={newUsername}
        name='newPassword'
        type='text'
        placeholder='New username'
        onChange={(e) => setNewUsername(e.target.value)}
        />

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

export default ChangeUsername
