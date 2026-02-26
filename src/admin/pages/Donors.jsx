import { useState, useEffect } from "react"
import { Search, Mail, Phone, MapPin, Calendar } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Donors.css"

function Donors() {
  const [donors, setDonors] = useState([])
  const [stats, setStats] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonors()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const fetchDonors = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAllDonors({
        search: searchTerm,
        limit: 20
      })

      setDonors(response.donors)
      setError(null)
    } catch (err) {
      console.error("Error fetching donors:", err)
      setError("Failed to load donors")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDonorStats()
      setStats(response.stats)
    } catch (err) {
      console.error("Error fetching stats:", err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN')
  }

  const isActiveThisMonth = (lastDonation) => {
    const lastDate = new Date(lastDonation)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return lastDate > thirtyDaysAgo
  }

  return (
    <div className="donors-page">
      <div className="page-header">
        <div>
          <h1>Donors Management</h1>
          <p>View and manage your donor community</p>
        </div>
      </div>

      <div className="donors-stats">
        <div className="stat-box">
          <p>Total Donors</p>
          <h3>{stats?.totalDonors || 0}</h3>
        </div>
        <div className="stat-box">
          <p>Active This Month</p>
          <h3>{stats?.activeThisMonth || 0}</h3>
        </div>
        <div className="stat-box">
          <p>Total Contributions</p>
          <h3>₹{(stats?.totalContributions || 0).toLocaleString()}</h3>
        </div>
      </div>

      <div className="search-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search donors by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading donors...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          <p>{error}</p>
          <button onClick={fetchDonors}>Retry</button>
        </div>
      ) : (
        <>
          <div className="donors-grid">
            {donors.map((donor) => (
              <div key={donor.id} className="donor-card">
                <div className="donor-card-header">
                  <div className="donor-avatar">{donor.name.charAt(0)}</div>
                  <div className="donor-info">
                    <h3>{donor.name}</h3>
                    <div className="donor-contact">
                      <span><Mail size={14} /> {donor.email}</span>
                      <span><Phone size={14} /> {donor.mobile}</span>
                    </div>
                  </div>
                </div>

                <div className="donor-card-body">
                  <div className="donor-stat">
                    <p>Total Donations</p>
                    <h4>₹{donor.totalDonations.toLocaleString()}</h4>
                  </div>
                  <div className="donor-stat">
                    <p>Number of Donations</p>
                    <h4>{donor.donations}</h4>
                  </div>
                </div>

                <div className="donor-card-footer">
                  <div className="donor-meta">
                    <span><Calendar size={14} /> Joined {formatDate(donor.joinedDate)}</span>
                  </div>
                  <div className="last-donation">
                    Last donation: {formatDate(donor.lastDonation)}
                  </div>
                </div>

                <div className="donor-actions">
                  <button className="view-details-btn">View Details</button>
                  <button className="contact-btn">Contact</button>
                </div>
              </div>
            ))}
          </div>

          {donors.length === 0 && (
            <div className="no-results">
              <p>No donors found matching your search criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Donors
