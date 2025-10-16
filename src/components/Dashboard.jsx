import { useState, useEffect } from 'react'
import './Dashboard.css'
import SubscriptionForm from './SubscriptionForm'
import SubscriptionList from './SubscriptionList'
import Statistics from './Statistics'

function Dashboard({ user, onLogout }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Load subscriptions for current user
    const key = `subscriptions_${user.id}`
    const saved = localStorage.getItem(key)
    if (saved) {
      setSubscriptions(JSON.parse(saved))
    }

    // Load history
    const historyKey = `history_${user.id}`
    const savedHistory = localStorage.getItem(historyKey)
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [user.id])

  const saveSubscriptions = (subs) => {
    const key = `subscriptions_${user.id}`
    localStorage.setItem(key, JSON.stringify(subs))
    setSubscriptions(subs)
  }

  const addToHistory = (action, subscription) => {
    const historyEntry = {
      id: Date.now(),
      action,
      subscription: { ...subscription },
      timestamp: new Date().toISOString(),
    }
    const newHistory = [historyEntry, ...history].slice(0, 50) // Keep last 50 entries
    const historyKey = `history_${user.id}`
    localStorage.setItem(historyKey, JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  const handleAddSubscription = (subscription) => {
    const newSub = {
      ...subscription,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    const newSubscriptions = [...subscriptions, newSub]
    saveSubscriptions(newSubscriptions)
    addToHistory('added', newSub)
    setShowForm(false)
  }

  const handleEditSubscription = (subscription) => {
    const updatedSubscriptions = subscriptions.map(sub =>
      sub.id === subscription.id ? subscription : sub
    )
    saveSubscriptions(updatedSubscriptions)
    addToHistory('updated', subscription)
    setEditingSubscription(null)
    setShowForm(false)
  }

  const handleDeleteSubscription = (id) => {
    const subToDelete = subscriptions.find(sub => sub.id === id)
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id)
    saveSubscriptions(updatedSubscriptions)
    if (subToDelete) {
      addToHistory('deleted', subToDelete)
    }
  }

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingSubscription(null)
  }

  // Filter subscriptions based on search and filter
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPeriod = filterPeriod === 'all' || sub.billingPeriod === filterPeriod
    return matchesSearch && matchesPeriod
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Subly</h1>
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <Statistics subscriptions={subscriptions} />

      <div className="controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Periods</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="add-button"
        >
          + Add Subscription
        </button>
      </div>

      {showForm && (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={editingSubscription ? handleEditSubscription : handleAddSubscription}
          onCancel={handleCancelForm}
        />
      )}

      <SubscriptionList
        subscriptions={filteredSubscriptions}
        onEdit={handleEdit}
        onDelete={handleDeleteSubscription}
      />

      {history.length > 0 && (
        <div className="history-section">
          <h2>Recent Activity</h2>
          <div className="history-list">
            {history.slice(0, 10).map(entry => (
              <div key={entry.id} className="history-item">
                <span className={`action-badge ${entry.action}`}>
                  {entry.action}
                </span>
                <span className="history-name">{entry.subscription.name}</span>
                <span className="history-time">
                  {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
