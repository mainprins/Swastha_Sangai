import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './app.css';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';


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
        element={<HomePage />}
      />
      <Route 
        path="/email-verify" 
        element={<EmailVerify />}
      />
      <Route 
        path="/reset-password" 
        element={<ResetPassword />}
      />
    </Routes>
    </>
   
  )
}

export default App
