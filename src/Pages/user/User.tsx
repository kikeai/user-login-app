import Button from '../../Components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { logOut, setUser } from '../../store/features/userSlice'
import { useEffect, useState } from 'react'
import CloudButton from '../../Components/button/cloudButton'
import axios from 'axios'
import Loading from '../../Components/Loading'
import Spin from '../../Components/Spin'

const User = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [newImage, setNewimage] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const { name, email, username, image, logged } = useAppSelector(state => state.user)

  useEffect(() => {
    if (!logged) {
      navigate('/login')
    } else {
      setTimeout(() => setLoading(false), 2000)
    }
  }, [])

  useEffect(() => {
    if (newImage !== '') {
      axios.put('http://localhost:3001/user/image', { email, newImage })
        .then(res => {
          dispatch(setUser(res.data))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [newImage])

  useEffect(() => {
    setTimeout(() => {
      setImgLoading(false)
    }, 2000)
  }, [image])

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className={`flex justify-center items-center fixed w-full h-screen bg-white z-50 top-0 ${loading ? '' : 'hidden'}`}>
        <Loading />
      </div>
      <div className='flex flex-col items-center border-2 border-black rounded-2xl py-6 px-4'>
        <div className='relative'>
          <div className={`flex justify-center items-center w-36 h-36 rounded-full z-30 absolute top-0 bg-white/70 ${imgLoading ? '' : 'hidden'}`}>
            <Spin visible={true} />
          </div>
          <img className='w-36 rounded-full border-2 border-black' src={image} alt="profile" />
          <CloudButton seter={setNewimage} setLoading={setImgLoading} />
        </div>
        <p className='text-gray-700 text-xl font-bold mt-4'>{`@${username}`}</p>
        <h2 className='text-4xl text-black font-black text-center italic'>{name}</h2>
        <p className='text-gray-700 text-lg font-semibold'>{email}</p>
        <div className='flex gap-4 mt-6'>
          <Button
          type='button'
          text='Cambiar username'
          onClick={() => navigate('/user/changeusername')}
          stretch={false}
          />
          <Button
          type='button'
          text='Cambiar contraseña'
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
