import { useState, useEffect } from "react"
import { FileText, Search, Download, Calendar, Phone, Mail, User, IndianRupee, CheckCircle } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Receipts.css"

function Receipts() {
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    try {
      setLoading(true)
      // Get all paid donations with amount >= 1
      const response = await adminAPI.getAllDonations()
      
      // Filter for paid donations with receipts
      const paidDonations = response.donations.filter(
        donation => donation.status === 'paid' && donation.amount >= 1 && donation.receiptNumber
      )
      
      setReceipts(paidDonations)
    } catch (err) {
      console.error("Error fetching receipts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReceipt = async (donationId, donorName, receiptNumber) => {
    try {
      setDownloadingId(donationId)
      
      const response = await fetch(`https://subhojanam-server-2-927388163068.asia-south1.run.app/api/payment/download-receipt/${donationId}`)
      
      if (!response.ok) {
        throw new Error('Failed to download receipt')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Receipt_${receiptNumber}_${donorName}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading receipt:', error)
      alert('Failed to download receipt. Please try again.')
    } finally {
      setDownloadingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatReceiptNumber = (number) => {
    if (!number) return 'N/A'
    return `HKMI|${new Date().getFullYear()}|D/VSP|${String(number).padStart(5, '0')}`
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.mobile?.includes(searchTerm) ||
      receipt.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(receipt.receiptNumber)?.includes(searchTerm)

    const matchesDate = !dateFilter || 
      new Date(receipt.receiptGeneratedAt).toLocaleDateString('en-CA').includes(dateFilter)

    return matchesSearch && matchesDate
  })

  if (loading) {
    return (
      <div className="receipts-page">
        <div className="loading-state">
          <p>Loading receipts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="receipts-page">
      <div className="page-header">
        <div className="header-content">
          <FileText size={32} />
          <div>
            <h1>Donation Receipts</h1>
            <p>Manage and download donation receipts</p>
          </div>
        </div>
      </div>

      <div className="receipts-stats">
        <div className="stat-card">
          <FileText size={24} />
          <div>
            <p>Total Receipts</p>
            <h3>{receipts.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <IndianRupee size={24} />
          <div>
            <p>Total Amount</p>
            <h3>₹{receipts.reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, mobile, email, or receipt number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="date-filter">
          <Calendar size={18} />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Filter by date"
          />
        </div>
      </div>

      {filteredReceipts.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No Receipts Found</h3>
          <p>There are no receipts matching your search criteria</p>
        </div>
      ) : (
        <div className="receipts-grid">
          {filteredReceipts.map((receipt) => (
            <div key={receipt._id} className="receipt-card">
              <div className="receipt-header">
                <div className="receipt-number">
                  <FileText size={20} />
                  <span>{formatReceiptNumber(receipt.receiptNumber)}</span>
                </div>
                <span className="status-badge paid">
                  <CheckCircle size={14} />
                  Paid
                </span>
              </div>

              <div className="receipt-body">
                <div className="donor-info">
                  <div className="info-row">
                    <User size={16} />
                    <span className="donor-name">{receipt.name}</span>
                  </div>
                  <div className="info-row">
                    <Phone size={16} />
                    <span>{receipt.mobile}</span>
                  </div>
                  <div className="info-row">
                    <Mail size={16} />
                    <span>{receipt.email || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <IndianRupee size={16} />
                    <span className="amount">₹{receipt.amount.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <Calendar size={16} />
                    <span>{formatDate(receipt.receiptGeneratedAt)}</span>
                  </div>
                  {receipt.certificate && (
                    <div className="info-row certificate-req">
                      <CheckCircle size={16} />
                      <span>80G Certificate Requested</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="receipt-footer">
                <button
                  className="btn-download"
                  onClick={() => handleDownloadReceipt(receipt._id, receipt.name, receipt.receiptNumber)}
                  disabled={downloadingId === receipt._id}
                >
                  {downloadingId === receipt._id ? (
                    <>Downloading...</>
                  ) : (
                    <>
                      <Download size={16} />
                      Download Receipt
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Receipts
