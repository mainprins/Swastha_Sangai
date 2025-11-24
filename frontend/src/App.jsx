import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './app.css';


const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!user ? <LoginPage onLogin={(email) => setUser(email)} /> : <Navigate to="/homepage" />}
      />
      <Route 
        path="/homepage" 
        element={user ? <HomePage userEmail={user} /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
