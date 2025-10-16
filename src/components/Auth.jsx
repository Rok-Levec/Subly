import { useState } from 'react'
import './Auth.css'

function Auth({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    if (isLogin) {
      const success = onLogin(username, password)
      if (!success) {
        setError('Invalid username or password')
      }
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      const success = onRegister(username, password)
      if (!success) {
        setError('Username already exists')
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Subly</h1>
        <p className="subtitle">Track your subscriptions</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Auth
