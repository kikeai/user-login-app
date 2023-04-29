import Button from '../../Components/button/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CloudButton from '../../Components/button/cloudButton'
import axios from 'axios'
import Loading from '../../Components/Loading'
import Spin from '../../Components/Spin'

const User = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    image: ''
  })
  const [newImage, setNewimage] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  // const { name, email, username, image, logged } = useAppSelector(state => state.user)

  const logOut = () => {
    axios.get('http://localhost:3001/cookie/delete', { withCredentials: true })
      .then(res => {
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get('http://localhost:3001/user', { withCredentials: true })
      .then(res => {
        const { email, name, username, image } = res.data
        setUser({
          name,
          email,
          username,
          image
        })
        setLoading(false)
      })
      .catch(error => {
        if (error.response.data.error === 'Token expirado') {
          logOut()
        } else {
          console.error(error)
          navigate('/')
        }
      })
  }, [])

  useEffect(() => {
    if (newImage !== '') {
      axios.put('http://localhost:3001/user/image', { newImage })
        .then(res => {
          console.log(res.data)
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
  }, [user.image])

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
          <img className='w-36 rounded-full border-2 border-black' src={user.image} alt="profile" />
          <CloudButton seter={setNewimage} setLoading={setImgLoading} />
        </div>
        <p className='flex justify-center items-center text-gray-700 text-xl font-bold mt-4'>{`@${user.username}`}</p>
        <h2 className='text-4xl text-black font-black text-center italic'>{user.name}</h2>
        <p className='text-gray-700 text-lg font-semibold'>{user.email}</p>
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
        onClick={logOut}
        className='text-lg underline font-semibold hover:cursor-pointer mt-6'>Log out</p>
      </div>
    </div>
  )
}

export default User
