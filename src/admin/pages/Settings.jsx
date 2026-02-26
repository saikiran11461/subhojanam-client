import { useState, useEffect } from "react"
import { Save, Target, Bell, Mail, Building2, FileText } from "lucide-react"
import adminAPI from "../../services/adminApi"
import "../styles/Settings.css"

function Settings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getSettings()
      setSettings(response.settings)
    } catch (err) {
      console.error("Error fetching settings:", err)
      setMessage({ type: 'error', text: 'Failed to load settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const handleDoublyNestedChange = (parent, child, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [field]: value
        }
      }
    }))
  }

  const handleSaveGeneral = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        organizationName: settings.organizationName,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        address: settings.address
      })
      setMessage({ type: 'success', text: 'General settings saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSaveDonationGoals = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        donationGoals: settings.donationGoals,
        minimumDonationAmount: settings.minimumDonationAmount,
        maximumDonationAmount: settings.maximumDonationAmount,
        currency: settings.currency
      })
      setMessage({ type: 'success', text: 'Donation settings saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSaveNotifications = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        notifications: settings.notifications
      })
      setMessage({ type: 'success', text: 'Notification settings saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSaveEmail = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        emailTemplate: settings.emailTemplate
      })
      setMessage({ type: 'success', text: 'Email settings saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSaveBankDetails = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        bankDetails: settings.bankDetails
      })
      setMessage({ type: 'success', text: 'Bank details saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSaveReceipt = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSettings({
        receiptSettings: settings.receiptSettings
      })
      setMessage({ type: 'success', text: 'Receipt settings saved successfully!' })
    } catch (err) {
      console.error("Error saving settings:", err)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (loading) {
    return (
      <div className="settings-page">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="settings-page">
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          <p>Failed to load settings</p>
          <button onClick={fetchSettings}>Retry</button>
        </div>
      </div>
    )
  }
  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your application settings and preferences</p>
        </div>
      </div>

      {message && (
        <div className={`message ${message.type}`} style={{
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`
        }}>
          {message.text}
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header">
            <Building2 size={20} />
            <h2>General Settings</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Organization Name</label>
              <input 
                type="text" 
                value={settings.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input 
                type="email" 
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Phone</label>
              <input 
                type="tel" 
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea 
                rows="3" 
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              ></textarea>
            </div>
            <button className="save-btn" onClick={handleSaveGeneral} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <Target size={20} />
            <h2>Donation Goals & Limits</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Monthly Target (₹)</label>
              <input 
                type="number" 
                value={settings.donationGoals?.monthlyTarget}
                onChange={(e) => handleDoublyNestedChange('donationGoals', 'monthlyTarget', null, parseInt(e.target.value))}
              />
              <small style={{ color: '#666' }}>Set monthly donation goal</small>
            </div>
            <div className="form-group">
              <label>Yearly Target (₹)</label>
              <input 
                type="number" 
                value={settings.donationGoals?.yearlyTarget}
                onChange={(e) => handleDoublyNestedChange('donationGoals', 'yearlyTarget', null, parseInt(e.target.value))}
              />
              <small style={{ color: '#666' }}>Set annual donation goal</small>
            </div>
            <div className="form-group">
              <label>Minimum Donation Amount (₹)</label>
              <input 
                type="number" 
                value={settings.minimumDonationAmount}
                onChange={(e) => handleInputChange('minimumDonationAmount', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Maximum Donation Amount (₹)</label>
              <input 
                type="number" 
                value={settings.maximumDonationAmount}
                onChange={(e) => handleInputChange('maximumDonationAmount', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select 
                value={settings.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <button className="save-btn" onClick={handleSaveDonationGoals} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <Building2 size={20} />
            <h2>Bank Account Details</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Account Name</label>
              <input 
                type="text" 
                value={settings.bankDetails?.accountName}
                onChange={(e) => handleNestedChange('bankDetails', 'accountName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input 
                type="text" 
                value={settings.bankDetails?.accountNumber}
                onChange={(e) => handleNestedChange('bankDetails', 'accountNumber', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input 
                type="text" 
                value={settings.bankDetails?.ifscCode}
                onChange={(e) => handleNestedChange('bankDetails', 'ifscCode', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bank Name</label>
              <input 
                type="text" 
                value={settings.bankDetails?.bankName}
                onChange={(e) => handleNestedChange('bankDetails', 'bankName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input 
                type="text" 
                value={settings.bankDetails?.branch}
                onChange={(e) => handleNestedChange('bankDetails', 'branch', e.target.value)}
              />
            </div>
            <button className="save-btn" onClick={handleSaveBankDetails} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <Bell size={20} />
            <h2>Email Notifications</h2>
          </div>
          <div className="settings-form">
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Donation Notifications</h4>
                <p>Receive email when a new donation is made</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications?.donationNotifications}
                  onChange={(e) => handleNestedChange('notifications', 'donationNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Daily Summary</h4>
                <p>Get a daily summary of all donations</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications?.dailySummary}
                  onChange={(e) => handleNestedChange('notifications', 'dailySummary', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Monthly Reports</h4>
                <p>Receive monthly analytics and reports</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications?.monthlyReports}
                  onChange={(e) => handleNestedChange('notifications', 'monthlyReports', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Low Inventory Alert</h4>
                <p>Get notified when resources are running low</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications?.lowInventoryAlert}
                  onChange={(e) => handleNestedChange('notifications', 'lowInventoryAlert', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button className="save-btn" onClick={handleSaveNotifications} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <Mail size={20} />
            <h2>Donor Communication</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Thank You Email Template</label>
              <textarea 
                rows="6" 
                value={settings.emailTemplate?.thankYouTemplate}
                onChange={(e) => handleNestedChange('emailTemplate', 'thankYouTemplate', e.target.value)}
              ></textarea>
              <small style={{ color: '#666' }}>
                Available placeholders: [Donor Name], [Amount], [Date]
              </small>
            </div>
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Auto-send Thank You Emails</h4>
                <p>Automatically send thank you emails after donation</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailTemplate?.autoSend}
                  onChange={(e) => handleNestedChange('emailTemplate', 'autoSend', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button className="save-btn" onClick={handleSaveEmail} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <FileText size={20} />
            <h2>Receipt Settings</h2>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Receipt Prefix</label>
              <input 
                type="text" 
                value={settings.receiptSettings?.prefix}
                onChange={(e) => handleNestedChange('receiptSettings', 'prefix', e.target.value)}
                placeholder="SUB"
              />
              <small style={{ color: '#666' }}>
                Example: SUB-2024-0001
              </small>
            </div>
            <div className="form-group">
              <label>Starting Number</label>
              <input 
                type="number" 
                value={settings.receiptSettings?.startNumber}
                onChange={(e) => handleNestedChange('receiptSettings', 'startNumber', parseInt(e.target.value))}
              />
            </div>
            <div className="toggle-group">
              <div className="toggle-info">
                <h4>Include Organization Logo</h4>
                <p>Add logo to receipts and documents</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.receiptSettings?.includeOrgLogo}
                  onChange={(e) => handleNestedChange('receiptSettings', 'includeOrgLogo', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button className="save-btn" onClick={handleSaveReceipt} disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
