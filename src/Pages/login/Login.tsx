import Input from '../../Components/input/Input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type UserLogin } from '../../types/types'
import Button from '../../Components/button/Button'
import axios from 'axios'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/features/userSlice'
import GoogleLogin, { type GoogleLoginResponse, type GoogleLoginResponseOffline } from 'react-google-login'
import GoogleIcon from '../../Components/google'
import { gapi } from 'gapi-script'
import Spin from '../../Components/Spin'

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [loginUser, setLoginUser] = useState<UserLogin>({
    email: '',
    password: '',
    google_id: null
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const clientId = '833193992893-qq29j6ko42krni07a8nts6m1gcou74jq.apps.googleusercontent.com'

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
    setLoading(true)
    axios.post('http://localhost:3001/user/login', loginUser)
      .then(res => {
        dispatch(setUser(res.data))
        navigate('/user')
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    if (typeof response === 'object' && response !== null && 'profileObj' in response) {
      setLoading(true)
      axios.post('http://localhost:3001/user/login', {
        email: response.profileObj.email,
        password: '',
        google_id: response.profileObj.googleId
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
  }

  const onFailure = (error: any) => {
    console.log(error)
  }

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId
      })
    }
    gapi.load('client:auth2', start)
  }, [])

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
        <Spin visible={loading} />
        <Button
        type='submit'
        text='Iniciar Sesión'
        onClick={() => {}}
        stretch={true}
        />
        <GoogleLogin
        clientId={clientId}
        render={renderProps => (
          <button
          className='flex justify-center gap-2 w-4/5 border-2 border-black rounded-xl font-semibold py-2 px-6 transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-70 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black'
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
            <GoogleIcon />
            Iniciar sesión con Google
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        />
      </form>
    </div>
  )
}

export default Login
