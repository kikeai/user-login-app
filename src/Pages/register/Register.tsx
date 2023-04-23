import { useEffect, useState } from 'react'
import Button from '../../Components/button/Button'
import Input from '../../Components/input/Input'
// import InputImage from '../../Components/input/inputImage'
import { type UserRegister } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/features/userSlice'
import Spin from '../../Components/Spin'
import { gapi } from 'gapi-script'
import GoogleLogin, { type GoogleLoginResponse, type GoogleLoginResponseOffline } from 'react-google-login'
import GoogleIcon from '../../Components/google'
import { validateRegister } from './validateRegister'

const Register = () => {
  const dispatch = useAppDispatch()
  const [errorSubmit, setErrorSubmit] = useState('')
  const [loading, setLoading] = useState(false)
  const imageDefault = 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
  const [registerUser, setRegisterUser] = useState<UserRegister>({
    email: '',
    name: '',
    username: '',
    password: '',
    image: imageDefault,
    google_id: null,
    confirmPassword: ''
  })
  const [registerErrors, setRegisterErrors] = useState<UserRegister>({
    email: '',
    name: '',
    username: '',
    password: '',
    image: '',
    google_id: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const clientId = '833193992893-qq29j6ko42krni07a8nts6m1gcou74jq.apps.googleusercontent.com'

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target
    setErrorSubmit('')
    setRegisterUser({
      ...registerUser,
      [name]: value
    })
    setRegisterErrors(validateRegister({
      ...registerUser,
      [name]: value
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (Object.values(registerUser).some(x => x === '') || Object.values(registerErrors).some(x => x !== '' && x !== 'Insegura' && x !== 'Aceptable' && x !== 'Segura')) {
      return null
    } else {
      setLoading(true)
      axios.post('http://localhost:3001/user', {
        name: registerUser.name.trim(),
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
          console.log(err)
        })
    }
  }

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    if (typeof response === 'object' && response !== null && 'profileObj' in response) {
      setLoading(true)
      axios.post('http://localhost:3001/user', {
        name: response.profileObj.name,
        email: response.profileObj.email,
        username: response.profileObj.name.split(' ')[0] + new Date().toString().split(' ')[4].split(':').join(''),
        password: '',
        image: response.profileObj.imageUrl,
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
        <h1 className='font-black text-center text-3xl italic'>Register</h1>
        <p className='flex text-gray-700 font-semibold'>Are you already singup?<i onClick={() => navigate('/login')} className='text-blue-700 ml-1 font-semibold underline hover:cursor-pointer'>login here</i></p>
        <Input
        value={registerUser.name}
        name='name'
        type='text'
        error={registerErrors.name}
        placeholder='Your name'
        onChange={handleChange}
        />
        <Input
        value={registerUser.email}
        name='email'
        type='email'
        error={registerErrors.email}
        placeholder='Your email'
        onChange={handleChange}
        />
        <Input
        value={registerUser.username}
        name='username'
        type='text'
        error={registerErrors.username}
        placeholder='Username'
        onChange={handleChange}
        />
        <Input
        value={registerUser.password}
        name='password'
        type='password'
        error={registerErrors.password}
        placeholder='Create password'
        onChange={handleChange}
        />
        <Input
        value={registerUser.confirmPassword}
        name='confirmPassword'
        type='password'
        error={registerErrors.confirmPassword}
        placeholder='Repeat password'
        onChange={handleChange}
        />
        <Spin visible={loading} />
        <p className={`font-semibold text-sm text-red-700 bg-red-200 rounded p-1 ${errorSubmit === '' ? 'hidden' : ''}`}>{errorSubmit}</p>
        <Button
        type='submit'
        text='Registrarse'
        onClick={() => {
          if (Object.values(registerUser).some(x => x === '')) setErrorSubmit('*Llena todos los campos')
          else if (Object.values(registerErrors).some(x => x !== 'Insegura' && x !== 'Aceptable' && x !== 'Segura' && x !== '')) setErrorSubmit('*Rectifica la información')
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
            Registrarse con Google
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        />
      </form>
    </div>
  )
}

export default Register
