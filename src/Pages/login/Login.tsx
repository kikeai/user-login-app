import Input from '../../Components/input/Input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type UserLogin } from '../../types/types'
import Button from '../../Components/button/Button'
import axios from 'axios'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/features/userSlice'

const Login = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [loginUser, setLoginUser] = useState<UserLogin>({
    email: '',
    password: '',
    google_id: null
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    setLoginUser({
      ...loginUser,
      [name]: value
    })
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('hola mundo!!')
    axios.post('http://localhost:3001/user/login', loginUser)
      .then(res => {
        console.log(res.data)
        dispatch(setUser(res.data))
        navigate('/user')
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Login</h1>
        <p className='flex text-gray-700 font-semibold'>You no have account?<i onClick={() => navigate('/register')} className='text-blue-700 ml-1 font-semibold underline hover:cursor-pointer'>sing up here</i></p>
        <Input
        value={loginUser.email}
        name='email'
        type='email'
        placeholder='Your email'
        onChange={handleChange}
        />
        <Input
        value={loginUser.password}
        name='password'
        type={visible ? 'text' : 'password'}
        placeholder='Your password'
        onChange={handleChange}
        />
        <p
        onClick={handleVisible}
        hidden={loginUser.password === ''}
        className='text-lg text-center font-semibold underline hover:cursor-pointer'>
          {visible ? 'Do not show' : 'Show Password'}
        </p>
        <Button
        type='submit'
        text='Login'
        onClick={() => {}}
        stretch={true}
        />
      </form>
    </div>
  )
}

export default Login
