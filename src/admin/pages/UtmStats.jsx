import { useEffect, useState } from "react";
import adminAPI from "../../services/adminApi";

function UtmStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="utm-stats-page">
      <h2>UTM Source Analytics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
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
            {stats.length === 0 ? (
              <tr><td colSpan={3}>No data</td></tr>
            ) : (
              stats.map(row => (
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
  );
}

export default UtmStats;
