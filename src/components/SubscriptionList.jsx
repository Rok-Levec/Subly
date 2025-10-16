import './SubscriptionList.css'

function SubscriptionList({ subscriptions, onEdit, onDelete }) {
  if (subscriptions.length === 0) {
    return (
      <div className="empty-state">
        <h2>No subscriptions yet</h2>
        <p>Add your first subscription to start tracking your costs</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="subscription-list">
      <div className="subscriptions-grid">
        {subscriptions.map(sub => (
          <div key={sub.id} className="subscription-card">
            <div className="card-header">
              <div>
                <h3>{sub.name}</h3>
                <span className="category-badge">{sub.category}</span>
              </div>
              <div className="card-cost">
                ${parseFloat(sub.cost).toFixed(2)}
                <span className="billing-period">/{sub.billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
            </div>

            {sub.description && (
              <p className="description">{sub.description}</p>
            )}

            <div className="card-details">
              <div className="detail-item">
                <span className="detail-label">Next Billing:</span>
                <span className="detail-value">{formatDate(sub.nextBillingDate)}</span>
              </div>
            </div>

            <div className="card-actions">
              <button 
                onClick={() => onEdit(sub)}
                className="edit-button"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Delete ${sub.name}?`)) {
                    onDelete(sub.id)
                  }
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionList
