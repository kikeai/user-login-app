import Button from '../../Components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { logOut, setUser } from '../../store/features/userSlice'
import { useEffect, useState } from 'react'
import CloudButton from '../../Components/button/cloudButton'
import axios from 'axios'

const User = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [newImage, setNewimage] = useState('')
  const { name, email, username, image, logged } = useAppSelector(state => state.user)

  useEffect(() => {
    if (!logged) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (newImage !== '') {
      axios.put('http://localhost:3001/user/image', { email, newImage })
        .then(res => {
          dispatch(setUser(res.data))
        })
        .catch(err => console.error(err))
    }
    setNewimage('')
  }, [newImage])

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col items-center border-2 border-black rounded-2xl py-6 px-4'>
        <div className='relative'>
          <img className='w-36 rounded-full border-2 border-black' src={image} alt="profile" />
          <CloudButton seter={setNewimage} />
        </div>
        <p className='text-gray-700 text-xl font-bold mt-4'>{`@${username}`}</p>
        <h2 className='text-4xl text-black font-black text-center italic'>{name}</h2>
        <p className='text-gray-700 text-lg font-semibold'>{email}</p>
        <div className='flex gap-4 mt-6'>
          <Button
          type='button'
          text='Change username'
          onClick={() => navigate('/user/changeusername')}
          stretch={false}
          />
          <Button
          type='button'
          text='Change password'
          onClick={() => navigate('/user/changepassword')}
          stretch={false}
          />
        </div>
        <p
        onClick={() => {
          navigate('/')
          dispatch(logOut())
        }}
        className='text-lg underline font-semibold hover:cursor-pointer mt-6'>Log out</p>
      </div>
    </div>
  )
}

export default User
