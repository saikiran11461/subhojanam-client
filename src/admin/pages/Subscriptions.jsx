import { useState, useEffect } from "react"
import { Calendar, AlertCircle, CheckCircle, XCircle, RefreshCw, Search, Clock, TrendingUp } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Subscriptions.css"

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([])
  const [stats, setStats] = useState(null)
  const [reviewList, setReviewList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      const [subsData, statsData, reviewData] = await Promise.all([
        adminAPI.getAllSubscriptions(),
        adminAPI.getSubscriptionStats(),
        adminAPI.getSubscriptionsForReview()
      ])

      setSubscriptions(subsData.data || [])
      setStats(statsData.stats || {})
      setReviewList(reviewData.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching subscriptions:", err)
      setError("Failed to load subscriptions")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async (id) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) {
      return
    }

    try {
      setCancelingId(id)
      const response = await adminAPI.cancelSubscription(id)
      
      setSubscriptions(prevSubs => 
        prevSubs.map(sub => 
          sub._id === id 
            ? { ...sub, status: 'cancelled', razorStatus: 'cancelled' }
            : sub
        )
      )
      
      await fetchAllData()
      alert("Subscription cancelled successfully")
    } catch (err) {
      console.error("Error cancelling subscription:", err)
      alert("Failed to cancel subscription")
    } finally {
      setCancelingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subscriptionId?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = 
      filterStatus === "all" || 
      sub.razorStatus === filterStatus || 
      (sub.razorStatus === "sync_error" && filterStatus === "sync_error")

    return matchesSearch && matchesFilter
  })

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'status-active'
      case 'cancelled': return 'status-cancelled'
      case 'pending': return 'status-pending'
      case 'halted': return 'status-halted'
      case 'sync_error': return 'status-error'
      default: return 'status-default'
    }
  }

  return (
    <div className="subscriptions-page">
      <div className="page-header">
        <div>
          <h1>Subscriptions Management</h1>
          <p>Manage recurring donations and subscriptions</p>
        </div>
        <button className="refresh-btn" onClick={fetchAllData} disabled={loading}>
          <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="subscriptions-stats">
        <div className="stat-card stat-active">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <p>Active Subscriptions</p>
            <h3>{stats?.active || 0}</h3>
          </div>
        </div>

        <div className="stat-card stat-cancelled">
          <div className="stat-icon">
            <XCircle />
          </div>
          <div className="stat-content">
            <p>Cancelled</p>
            <h3>{stats?.cancelled || 0}</h3>
          </div>
        </div>

        <div className="stat-card stat-halted">
          <div className="stat-icon">
            <AlertCircle />
          </div>
          <div className="stat-content">
            <p>Halted</p>
            <h3>{stats?.halted || 0}</h3>
          </div>
        </div>

        <div className="stat-card stat-total">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <p>Total Subscriptions</p>
            <h3>{stats?.total || 0}</h3>
          </div>
        </div>
      </div>

      {reviewList.length > 0 && (
        <div className="review-alert">
          <AlertCircle size={20} />
          <div>
            <strong>Action Required:</strong>
            <p>{reviewList.length} subscription(s) need review</p>
          </div>
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or subscription ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="halted">Halted</option>
            <option value="sync_error">Sync Error</option>
          </select>
        </div>
      </div>

      {loading && subscriptions.length === 0 ? (
        <div className="loading-state">
          <RefreshCw className="spinning" size={32} />
          <p>Loading subscriptions...</p>
        </div>
      ) : filteredSubscriptions.length === 0 ? (
        <div className="empty-state">
          <Calendar size={48} />
          <h3>No Subscriptions Found</h3>
          <p>There are no subscriptions matching your criteria</p>
        </div>
      ) : (
        <div className="subscriptions-table-wrapper">
          <table className="subscriptions-table">
            <thead>
              <tr>
                <th>Donor Details</th>
                <th>Amount</th>
                <th>Razor Status</th>
                <th>Paid Count</th>
                <th>Remaining</th>
                <th>Next Charge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub._id}>
                  <td>
                    <div className="donor-cell">
                      <div className="donor-avatar">
                        {sub.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="donor-info">
                        <p className="donor-name">{sub.name}</p>
                        <p className="donor-email">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="amount">₹{sub.amount?.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(sub.razorStatus || sub.status)}`}>
                      {sub.razorStatus || sub.status || 'unknown'}
                    </span>
                  </td>
                  <td className="count-cell">
                    <span className="count-number">
                      {sub.paidCount !== undefined ? sub.paidCount : 0}
                    </span>
                  </td>
                  <td className="count-cell">
                    <span className="count-number">
                      {sub.remainingCount !== undefined ? sub.remainingCount : 12}
                    </span>
                  </td>
                  <td className="date-cell">
                    {formatTimestamp(sub.nextChargeAt)}
                  </td>
                  <td className="action-cell">
                    {(sub.razorStatus === 'active' || sub.status === 'active') ? (
                      <button
                        className="btn-cancel"
                        onClick={() => handleCancelSubscription(sub._id)}
                        disabled={cancelingId === sub._id}
                      >
                        {cancelingId === sub._id ? (
                          <>
                            <RefreshCw size={14} className="spinning" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle size={14} />
                            Cancel
                          </>
                        )}
                      </button>
                    ) : (sub.razorStatus === 'cancelled' || sub.status === 'cancelled') ? (
                      <button className="btn-cancelled" disabled>
                        Cancelled
                      </button>
                    ) : (
                      <span className="no-action">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Subscriptions
