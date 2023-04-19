import { useState } from 'react'
import Button from '../../Components/button/Button'
import Input from '../../Components/input/Input'
// import InputImage from '../../Components/input/inputImage'
import { type UserRegister } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/features/userSlice'
import Spin from '../../Components/Spin'

const Register = () => {
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registerUser, setRegisterUser] = useState<UserRegister>({
    email: '',
    name: '',
    username: '',
    password: '',
    image: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
    google_id: null,
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    setRegisterUser({
      ...registerUser,
      [name]: value
    })
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post('http://localhost:3001/user', {
      name: registerUser.name,
      email: registerUser.email,
      username: registerUser.username,
      password: registerUser.password,
      image: registerUser.image,
      google_id: registerUser.google_id
    })
      .then(res => {
        setLoading(false)
        dispatch(setUser(res.data))
        navigate('/user')
      })
      .catch(err => {
        setLoading(false)
        console.log(err.response?.data.error)
      })
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Register</h1>
        <p className='flex text-gray-700 font-semibold'>Are you already singup?<i onClick={() => navigate('/login')} className='text-blue-700 ml-1 font-semibold underline hover:cursor-pointer'>login here</i></p>
        <Input
        value={registerUser.name}
        name='name'
        type='text'
        placeholder='Your name'
        onChange={handleChange}
        />
        <Input
        value={registerUser.email}
        name='email'
        type='email'
        placeholder='Your email'
        onChange={handleChange}
        />
        <Input
        value={registerUser.username}
        name='username'
        type='text'
        placeholder='Username'
        onChange={handleChange}
        />
        <Input
        value={registerUser.password}
        name='password'
        type={visible ? 'text' : 'password'}
        placeholder='Create password'
        onChange={handleChange}
        />
        <Input
        value={registerUser.confirmPassword}
        name='confirmPassword'
        type={visible ? 'text' : 'password'}
        placeholder='Repeat password'
        onChange={handleChange}
        />
        <p
        onClick={handleVisible}
        hidden={registerUser.password === ''}
        className='text-lg text-center font-semibold underline hover:cursor-pointer'>
          {visible ? 'Do not show' : 'Show Password'}
        </p>
        <Spin visible={loading} />
        <Button
        type='submit'
        text='Register'
        onClick={() => {}}
        stretch={true}
        />
      </form>
    </div>
  )
}

export default Register
