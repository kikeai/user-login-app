import { useNavigate } from 'react-router-dom'
import Button from '../../Components/button/Button'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <h1 className='text-6xl text-black font-black italic mb-6'>User App</h1>
      <div className='flex gap-6'>
        <Button
        type='button'
        text='Login'
        onClick={() => navigate('/login')}
        stretch={false}
        />
        <Button
        type='button'
        text='Register'
        onClick={() => navigate('/register')}
        stretch={false}
        />
        {/* <Button
        type='button'
        text='user'
        onClick={() => navigate('/user')}
        stretch={false}
        /> */}
      </div>
    </div>
  )
}

export default LandingPage
