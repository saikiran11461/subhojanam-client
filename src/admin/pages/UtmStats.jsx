import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, IndianRupee, Search } from "lucide-react";
import adminAPI from "../../services/adminApi";
import "../styles/UtmStats.css";

function UtmStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUtmStats();
  }, []);

  const fetchUtmStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUtmStats();
      setStats(response.stats || []);
      setError(null);
    } catch (err) {
      setError("Failed to load UTM stats");
    } finally {
      setLoading(false);
    }
  };

  // Summary cards
  const totalDonations = stats.reduce((sum, s) => sum + (s.count || 0), 0);
  const totalAmount = stats.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const topSource = stats.length > 0 ? stats[0]._id || "(none)" : "-";

  // Filtered stats
  const filteredStats = search.trim()
    ? stats.filter(row => (row._id || "(none)").toLowerCase().includes(search.trim().toLowerCase()))
    : stats;

  return (
    <div className="utm-stats-page">
      <div className="utm-header">
        <div>
          <h1>UTM Analytics</h1>
          <p>Track donation performance by UTM source for marketing insights</p>
        </div>
        <div className="utm-search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search UTM source..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="utm-summary-cards">
        <div className="utm-card">
          <div className="utm-card-icon" style={{ background: '#e3f2fd' }}>
            <BarChart3 size={24} style={{ color: '#0A97EF' }} />
          </div>
          <div>
            <p>Total Sources</p>
            <h3>{stats.length}</h3>
          </div>
        </div>
        <div className="utm-card">
          <div className="utm-card-icon" style={{ background: '#d1fae5' }}>
            <Users size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <p>Total Donations</p>
            <h3>{totalDonations}</h3>
          </div>
        </div>
        <div className="utm-card">
          <div className="utm-card-icon" style={{ background: '#fef3c7' }}>
            <IndianRupee size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <p>Total Amount</p>
            <h3>₹{totalAmount.toLocaleString()}</h3>
          </div>
        </div>
        <div className="utm-card">
          <div className="utm-card-icon" style={{ background: '#ede9fe' }}>
            <TrendingUp size={24} style={{ color: '#7c3aed' }} />
          </div>
          <div>
            <p>Top Source</p>
            <h3>{topSource}</h3>
          </div>
        </div>
      </div>

      <div className="utm-table-section">
        <h2>Source Breakdown</h2>
        {loading ? (
          <div className="utm-loading">Loading...</div>
        ) : error ? (
          <div className="utm-error">{error}</div>
        ) : (
          <table className="utm-stats-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Donations</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredStats.length === 0 ? (
                <tr><td colSpan={3}>No data</td></tr>
              ) : (
                filteredStats.map(row => (
                  <tr key={row._id || "unknown"}>
                    <td>{row._id || "(none)"}</td>
                    <td>{row.count}</td>
                    <td>₹{row.totalAmount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UtmStats;
