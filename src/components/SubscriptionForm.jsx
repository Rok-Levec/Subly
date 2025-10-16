import { useState, useEffect } from 'react'
import './SubscriptionForm.css'

function SubscriptionForm({ subscription, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingPeriod: 'monthly',
    category: 'Entertainment',
    nextBillingDate: '',
    description: '',
  })

  useEffect(() => {
    if (subscription) {
      setFormData(subscription)
    }
  }, [subscription])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.cost) {
      alert('Please fill in required fields')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="form-overlay">
      <div className="subscription-form">
        <h2>{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Netflix, Spotify, etc."
                required
              />
            </div>
            <div className="form-group">
              <label>Cost *</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="9.99"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Billing Period</label>
              <select
                name="billingPeriod"
                value={formData.billingPeriod}
                onChange={handleChange}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Productivity">Productivity</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Music">Music</option>
                <option value="Cloud Storage">Cloud Storage</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Next Billing Date</label>
            <input
              type="date"
              name="nextBillingDate"
              value={formData.nextBillingDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional notes about this subscription"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {subscription ? 'Update' : 'Add'} Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscriptionForm
