import { useEffect, useState } from "react"
import { TrendingUp, Users, IndianRupee, Calendar } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Analytics.css"

function Analytics() {
  const [overview, setOverview] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])
  const [donationsByAmount, setDonationsByAmount] = useState([])
  const [topLocations, setTopLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      const [overviewData, trendsData, amountRangeData, locationsData] = await Promise.all([
        adminAPI.getAnalyticsOverview(),
        adminAPI.getMonthlyTrends(),
        adminAPI.getDonationsByAmountRange(),
        adminAPI.getTopLocations(5)
      ])

      setOverview(overviewData.overview)
      setMonthlyData(trendsData.monthlyData)
      setDonationsByAmount(amountRangeData.donationsByAmount)
      setTopLocations(locationsData.topLocations)
      setError(null)
    } catch (err) {
      console.error("Error fetching analytics:", err)
      setError("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="analytics-page">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          <p>{error}</p>
          <button onClick={fetchAnalyticsData}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Detailed insights into donation patterns and trends</p>
        </div>
        <div className="date-filter">
          <Calendar size={18} />
          <select>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="overview-card">
          <div className="overview-icon" style={{ backgroundColor: '#e3f2fd' }}>
            <TrendingUp size={24} style={{ color: '#0A97EF' }} />
          </div>
          <div>
            <p>Growth Rate</p>
            <h3>{overview?.growthRate || '+0%'}</h3>
            <span className="positive-trend">Compared to last month</span>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon" style={{ backgroundColor: '#d1fae5' }}>
            <IndianRupee size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <p>Average Donation</p>
            <h3>₹{(overview?.averageDonation || 0).toLocaleString()}</h3>
            <span className="positive-trend">+8.2% increase</span>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon" style={{ backgroundColor: '#fef3c7' }}>
            <Users size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <p>Returning Donors</p>
            <h3>{overview?.returningDonors || '0%'}</h3>
            <span className="positive-trend">+5.1% increase</span>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card monthly-trends">
          <div className="card-header">
            <h2>Monthly Donation Trends</h2>
          </div>
          <div className="chart-container">
            <div className="dual-axis-chart">
              {monthlyData.map((data, index) => {
                const maxAmount = Math.max(...monthlyData.map(d => d.amount))
                const maxDonations = Math.max(...monthlyData.map(d => d.donations))
                const amountHeight = (data.amount / maxAmount) * 100
                const donationsHeight = (data.donations / maxDonations) * 100
                
                return (
                  <div key={index} className="chart-item">
                    <div className="bars-group">
                      <div 
                        className="bar amount-bar" 
                        style={{ height: `${amountHeight}%` }}
                        data-value={`₹${(data.amount/1000).toFixed(0)}k`}
                      ></div>
                      <div 
                        className="bar count-bar" 
                        style={{ height: `${donationsHeight}%` }}
                        data-value={`${data.donations}`}
                      ></div>
                    </div>
                    <span className="chart-label">{data.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color amount-color"></div>
                <span>Amount</span>
              </div>
              <div className="legend-item">
                <div className="legend-color count-color"></div>
                <span>Count</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h2>Donations by Amount Range</h2>
          </div>
          <div className="range-distribution">
            {donationsByAmount.map((item, index) => (
              <div key={index} className="range-item">
                <div className="range-info">
                  <span className="range-label">{item.range}</span>
                  <span className="range-count">{item.count} donors</span>
                </div>
                <div className="range-bar-container">
                  <div 
                    className="range-bar" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                  <span className="range-percentage">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-card locations-card">
        <div className="card-header">
          <h2>Top Donor Locations</h2>
        </div>
        <div className="locations-grid">
          {topLocations.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No location data available
            </p>
          ) : (
            topLocations.map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-rank">{index + 1}</div>
                <div className="location-info">
                  <h4>{location.city || 'Unknown'}</h4>
                  <p>{location.donors} donors</p>
                </div>
                <div className="location-amount">₹{((location.amount || 0) / 1000).toFixed(0)}k</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics
