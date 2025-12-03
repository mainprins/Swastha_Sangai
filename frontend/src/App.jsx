import { useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import './app.css';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import FitnessProfile from './pages/FitnessProfile';


const App = () => {
  
  return (
    <>
    
       <ToastContainer />
       <Routes>
      <Route 
        path="/login" 
        element={<LoginPage />}
      />
      <Route 
        path="/" 
        element={<LandingPage />}
      />
      <Route 
        path="/email-verify" 
        element={<EmailVerify />}
      />
      <Route 
        path="/reset-password" 
        element={<ResetPassword />}
      />
      <Route path='/home' element={<HomePage />}>
        <Route path="fitness-profile" element={<FitnessProfile />} />
      </Route>
    </Routes>
    </>
   
  )
}

export default App
