import Input from '../../Components/input/Input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type UserLogin } from '../../types/types'
import Button from '../../Components/button/Button'
import axios from 'axios'
import GoogleLogin, { type GoogleLoginResponse, type GoogleLoginResponseOffline } from 'react-google-login'
import GoogleIcon from '../../Components/google'
import { gapi } from 'gapi-script'
import Spin from '../../Components/Spin'
import { validateLogin } from './validateLogin'

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorSubmit, setErrorSubmit] = useState('')
  const [loginUser, setLoginUser] = useState<UserLogin>({
    email: '',
    password: '',
    google_id: null
  })
  const [errorLoginUser, setErrorLoginUser] = useState<UserLogin>({
    email: '',
    password: '',
    google_id: null
  })
  const navigate = useNavigate()
  const clientId = '833193992893-qq29j6ko42krni07a8nts6m1gcou74jq.apps.googleusercontent.com'

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    setErrorSubmit('')
    setLoginUser({
      ...loginUser,
      [name]: value
    })
    setErrorLoginUser(validateLogin({
      ...loginUser,
      [name]: value
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (Object.values(loginUser).some(x => x === '') || Object.values(errorLoginUser).some(x => x !== '')) {
      return
    }
    setLoading(true)
    axios.post('/user/login', loginUser, { withCredentials: true })
      .then(res => {
        setLoading(false)
        navigate('/user')
      })
      .catch(err => {
        setErrorSubmit(err.response.data.error)
        setLoading(false)
      })
  }

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    if (typeof response === 'object' && response !== null && 'profileObj' in response) {
      setLoading(true)
      axios.post('/user/login', {
        email: response.profileObj.email,
        password: '',
        google_id: response.profileObj.googleId
      }, { withCredentials: true })
        .then(res => {
          setLoading(false)
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
        error={errorLoginUser.email}
        name='email'
        type='email'
        placeholder='Your email'
        onChange={handleChange}
        />
        <Input
        value={loginUser.password}
        error={errorLoginUser.password}
        name='password'
        type='password'
        placeholder='Your password'
        onChange={handleChange}
        />
        <p className={`font-semibold text-sm text-red-700 bg-red-200 rounded p-1 ${errorSubmit === '' ? 'hidden' : ''}`}>{errorSubmit}</p>
        <Spin visible={loading} />
        <Button
        type='submit'
        text='Iniciar Sesión'
        onClick={() => {
          if (Object.values(loginUser).some(x => x === '')) setErrorSubmit('*Llena todos los campos')
          else if (Object.values(errorLoginUser).some(x => x !== '')) setErrorSubmit('*Rectifica la información')
        }}
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
