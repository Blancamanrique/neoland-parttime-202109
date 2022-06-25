import './App.css'
import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'
import Home from './components/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import {validators} from 'commons'

const {validateToken} = validators

function App() {
  const navigate = useNavigate()

  try {
    validateToken(sessionStorage.token)
  } catch(error) {
    delete sessionStorage.token
  }
  const { token } = sessionStorage
  const [loggedIn, setLoggedIn] = useState(!!token)

  const handleShowLogin = () => navigate('/login')

  const handleOnLoggedIn = () => {
    setLoggedIn(true) //token? true --> la ruta "/" me pinta <Home />
    navigate('/')
  }
  
  const handleLogout = () => setLoggedIn(false) //token? false --> la ruta "/" me pinta <Landing />

  return <Routes>
    <Route path='/*' element={loggedIn ? <Home onLoggedOut={handleLogout} /> : <Landing />} />
    <Route path='register' element={loggedIn? <Navigate to="/" /> : <Register onRegistered={handleShowLogin}/>}/>
    <Route path='login' element={loggedIn? <Navigate to="/" /> : <Login onLoggedIn={handleOnLoggedIn} />} />
  </Routes>
}

export default App;