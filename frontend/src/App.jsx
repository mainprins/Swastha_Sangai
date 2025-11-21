import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

const App = ()=> {
 
  return (
    <>
     <Routes>
       <Route path='/login' element={<LoginPage/>}/>
     </Routes>
    </>
  )
}

export default App
