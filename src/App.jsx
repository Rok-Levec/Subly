import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (username, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true
    }
    return false
  }

  const handleRegister = (username, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return false
    }
    
    // Add new user
    const newUser = { username, password, id: Date.now() }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Auto-login after registration
    setCurrentUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return true
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Auth onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
