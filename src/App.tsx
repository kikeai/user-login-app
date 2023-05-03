import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/login/Login'
import User from './Pages/user/User'
import Register from './Pages/register/Register'
import LandingPage from './Pages/landingPage/LandingPage'
import ChangePassword from './Pages/changePassword/ChangePassword'
import ChangeUsername from './Pages/changeUsername/ChangeUsername'
axios.defaults.baseURL = 'https://user-login-app-api.vercel.app/'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path='/user/changepassword' element={<ChangePassword />} />
        <Route path='/user/changeusername' element={<ChangeUsername />} />
      </Routes>
    </div>
  )
}

export default App
