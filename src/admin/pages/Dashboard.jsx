import { useEffect, useState } from "react"
import { IndianRupee, Users, TrendingUp, Calendar } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Dashboard.css"

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [topDonors, setTopDonors] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      const [statsData, transactionsData, donorsData, trendsData] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getRecentTransactions(5),
        adminAPI.getTopDonors(5),
        adminAPI.getMonthlyTrends()
      ])

      setStats(statsData.stats)
      setRecentTransactions(transactionsData.transactions)
      setTopDonors(donorsData.donors)
      setMonthlyData(trendsData.monthlyData)
      
      setError(null)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={fetchDashboardData}>Retry</button>
        </div>
      </div>
    )
  }

  const statsConfig = [
    {
      icon: IndianRupee,
      label: "Total Donations",
      value: `₹${stats?.totalDonations?.value?.toLocaleString() || 0}`,
      change: stats?.totalDonations?.change || "+0%",
      changeType: stats?.totalDonations?.changeType || "positive",
      color: "#0A97EF"
    },
    {
      icon: Users,
      label: "Total Donors",
      value: stats?.totalDonors?.value?.toLocaleString() || "0",
      change: stats?.totalDonors?.change || "+0%",
      changeType: stats?.totalDonors?.changeType || "positive",
      color: "#10b981"
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: `₹${stats?.thisMonth?.value?.toLocaleString() || 0}`,
      change: stats?.thisMonth?.change || "+0%",
      changeType: stats?.thisMonth?.changeType || "positive",
      color: "#f59e0b"
    },
    {
      icon: Calendar,
      label: "Today",
      value: `₹${stats?.today?.value?.toLocaleString() || 0}`,
      change: stats?.today?.change || "+0%",
      changeType: stats?.today?.changeType || "positive",
      color: "#8b5cf6"
    }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your donations today.</p>
      </div>

      <div className="stats-grid">
        {statsConfig.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon size={24} style={{ color: stat.color }} />
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className={`stat-change ${stat.changeType}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-transactions-card">
          <div className="card-header">
            <h2>Recent Transactions</h2>
            <a href="/admin/transactions" className="view-all-link">View All</a>
          </div>
          <div className="transactions-table-container">
            {recentTransactions.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No transactions yet
              </p>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Donor Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="txn-id">{txn.id}</td>
                      <td className="donor-name">{txn.name}</td>
                      <td className="donor-email">{txn.email}</td>
                      <td className="amount">₹{txn.amount.toLocaleString()}</td>
                      <td className="date">{formatDate(txn.date)}</td>
                      <td>
                        <span className={`status-badge ${txn.status.toLowerCase()}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="dashboard-card top-donors-card">
          <div className="card-header">
            <h2>Top Donors</h2>
          </div>
          <div className="top-donors-list">
            {topDonors.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No donors yet
              </p>
            ) : (
              topDonors.map((donor, index) => (
                <div key={index} className="donor-item">
                  <div className="donor-rank">{index + 1}</div>
                  <div className="donor-info">
                    <p className="donor-name">{donor.name}</p>
                    <p className="donor-stats">{donor.donations} donations</p>
                  </div>
                  <div className="donor-amount">₹{donor.amount.toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card monthly-chart-card">
        <div className="card-header">
          <h2>Monthly Donation Trends</h2>
        </div>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {monthlyData.map((data, index) => {
              const maxAmount = Math.max(...monthlyData.map(d => d.amount), 1)
              const height = (data.amount / maxAmount) * 100
              
              return (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${height || 5}%` }}
                    data-value={`₹${data.amount.toLocaleString()}`}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
