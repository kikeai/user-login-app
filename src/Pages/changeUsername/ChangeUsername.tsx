import Button from '../../Components/button/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/input/Input'
import axios from 'axios'
import { validate } from './ValidateChangeUsername'
import { useDebounce } from '../../utils/hooks/useDebounce'
import Spin from '../../Components/Spin'

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState('')
  const [errorNewUsername, setErrorNewUsername] = useState('')
  const [errorSubmit, setErrorSubmit] = useState('')
  const [responseSubmit, setResponseSubmit] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (newUsername === '' || errorNewUsername !== 'Usuario disponible') {
      return
    }
    setErrorSubmit('')
    setResponseSubmit('')
    setLoading(true)
    axios.put('/user/username', { newUsername }, { withCredentials: true })
      .then(res => {
        setResponseSubmit('Usuario actualizado correctamente')
        setNewUsername('')
        setErrorNewUsername('')
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setErrorSubmit(err.response.data.error)
        setLoading(false)
      })
  }

  const debounceUsername = useDebounce(newUsername, 1000)

  useEffect(() => {
    if (debounceUsername !== '' && debounceUsername.length >= 4) {
      axios.post('/user/checkusername', { username: debounceUsername })
        .then(res => {
          const { response } = res.data
          if (response === 'No Exist') {
            setErrorNewUsername('Usuario disponible')
          } else {
            setErrorNewUsername('Usuario no disponible')
          }
        })
        .catch(error => console.log(error))
    }
  }, [debounceUsername])

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center py-8 w-96 border-2 border-black rounded-2xl'>
        <h1 className='font-black text-center text-3xl italic'>Change Password</h1>
        <Input
        value={newUsername}
        error={errorNewUsername}
        name='newPassword'
        type='text'
        placeholder='New username'
        onChange={(e) => {
          setErrorSubmit('')
          setResponseSubmit('')
          setNewUsername(e.target.value)
          setErrorNewUsername(validate(e.target.value))
        }}
        />
        <Spin visible={loading} />
        <p className={`font-semibold text-sm text-green-700 bg-green-200 rounded p-1 ${responseSubmit === '' ? 'hidden' : ''}`}>{responseSubmit}</p>
        <p className={`font-semibold text-sm text-red-700 bg-red-200 rounded p-1 ${errorSubmit === '' ? 'hidden' : ''}`}>{errorSubmit}</p>
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
          onClick={() => {
            if (newUsername === '') setErrorSubmit('*Llena todos los campos')
            else if (errorNewUsername === '') setErrorSubmit('*Espera la disponibilidad del nuevo username')
            else if (errorNewUsername !== 'Usuario disponible') setErrorSubmit('*Rectifica la información')
          }}
          stretch={false}
          />
        </div>
      </form>
    </div>
  )
}

export default ChangeUsername
