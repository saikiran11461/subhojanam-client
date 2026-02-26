import { CheckCircle, Heart, Utensils, ArrowLeft, Download } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import "../styles/thankyou.css";
import logo from "../assets/logo.png"

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();

  const paymentDetails = {
    transactionId: searchParams.get("txn") || "TXN2026021998765",
    amount: searchParams.get("amount") || "1,100",
    name: searchParams.get("name") || "Devotee",
    email: searchParams.get("email") || "devotee@example.com",
    date: searchParams.get("date") || new Date().toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric",
    }),
    seva: "Subhojanam Seva",
    method: searchParams.get("method") || "UPI",
  };

  const details = [
    { label: "Transaction ID", value: paymentDetails.transactionId },
    { label: "Donor Name", value: paymentDetails.name },
    { label: "Email", value: paymentDetails.email },
    { label: "Seva", value: paymentDetails.seva },
    { label: "Payment Method", value: paymentDetails.method },
    { label: "Date", value: paymentDetails.date },
  ];

  return (
    <div className="thankyou-page">
      <div className="thankyou-top-bar" />

      <div className="thankyou-container">
        <div className="thankyou-logo">
          <img src={logo} width={100} alt="Subhojanam Logo" />
        </div>

        <div className="thankyou-heading">
          <h1>Hare Krishna! 🙏</h1>
          <p className="subtitle">Thank You for Your Generous Donation</p>
        </div>

        <div className="message-card">
          <div className="message-card-header">
            <div className="message-card-icon">
              <Utensils />
            </div>
            <div>
              <h2 className="message-card-title">Subhojanam Seva</h2>
              <p className="message-card-text">
                Your contribution will help provide <strong>free nutritious meals</strong> to those in need through the Hare Krishna Movement's Subhojanam Seva program.
              </p>
            </div>
          </div>
          <div className="quote-box">
            <p>"Annadānam Mahādānam" — The gift of food is the greatest gift.</p>
          </div>
        </div>

        <div className="amount-card">
          <p className="amount-label">Amount Donated</p>
          <p className="amount-value">₹{paymentDetails.amount}</p>
          <p className="amount-blessing">May Lord Krishna bless you abundantly</p>
        </div>

        <div className="payment-details-card">
          <h3 className="payment-details-title">Payment Details</h3>
          {details.map((item) => (
            <div key={item.label} className="payment-detail-row">
              <span className="payment-detail-label">{item.label}</span>
              <span className="payment-detail-value">{item.value}</span>
            </div>
          ))}
          <div className="payment-total">
            <span className="payment-total-label">Total Amount</span>
            <span className="payment-total-value">₹{paymentDetails.amount}</span>
          </div>
        </div>

        <div className="thankyou-actions">
          <button className="btn-download" onClick={() => window.print()}>
            <Download />
            Download Receipt
          </button>
          <a href="/" className="btn-back">
            <ArrowLeft />
            Back to Home
          </a>
        </div>

        <p className="thankyou-footer">
          A confirmation email has been sent to {paymentDetails.email}.<br />
          For queries, contact{" "}
          <a href="mailto:seva@harekrishna.org">seva@harekrishna.org</a>
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
