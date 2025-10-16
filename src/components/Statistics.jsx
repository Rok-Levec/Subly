import './Statistics.css'

function Statistics({ subscriptions }) {
  const calculateMonthlyCost = () => {
    return subscriptions.reduce((total, sub) => {
      const cost = parseFloat(sub.cost) || 0
      return total + (sub.billingPeriod === 'monthly' ? cost : cost / 12)
    }, 0)
  }

  const calculateYearlyCost = () => {
    return subscriptions.reduce((total, sub) => {
      const cost = parseFloat(sub.cost) || 0
      return total + (sub.billingPeriod === 'yearly' ? cost : cost * 12)
    }, 0)
  }

  const monthlyCost = calculateMonthlyCost()
  const yearlyCost = calculateYearlyCost()

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-label">Total Subscriptions</div>
        <div className="stat-value">{subscriptions.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Monthly Cost</div>
        <div className="stat-value">${monthlyCost.toFixed(2)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Yearly Cost</div>
        <div className="stat-value">${yearlyCost.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Statistics
