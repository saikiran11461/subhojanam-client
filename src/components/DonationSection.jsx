import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, FileText, Check } from "lucide-react";
import "../styles/donation.css";

function DonationSection() {

  const [type, setType] = useState("one");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    occasion: "",
    sevaDate: "",
    dob: "",
    certificate: false,
    updates: true
  });

  const donationOptions = [
    { amount: 500, meals: 20 },
    { amount: 1000, meals: 40 },
    { amount: 2500, meals: 100, popular: true },
    { amount: 5000, meals: 200 }
  ];

  const navigate = useNavigate();

  const handleSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setSelectedAmount(null);
    setCustomAmount("");
  };

  const finalAmount = selectedAmount || Number(customAmount);
  const meals = finalAmount ? Math.floor(finalAmount / 25) : 0;

  const handlePayment = async () => {

    if (!formData.name || !formData.email || !formData.mobile) {
      alert("Please fill all required fields");
      return;
    }

    if (!finalAmount || finalAmount <= 0) {
      alert("Invalid donation amount");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        type === "one"
          ? "create-order"
          : "create-subscription";

      const response = await fetch(
        `http://localhost:2345/api/payment/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            amount: finalAmount
          })
        }
      );

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!data.key) {
        alert("Payment initialization failed");
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        currency: "INR",
        name: "Subhojanam",
        description:
          type === "one"
            ? "One-time Donation"
            : "Monthly Donation",

        ...(type === "one"
          ? {
              amount: finalAmount * 100,
              order_id: data.orderId
            }
          : {
              subscription_id: data.subscriptionId
            }),

        handler: function (response) {
          setShowForm(false);

          const params = new URLSearchParams({
            txn:
              response.razorpay_payment_id ||
              response.razorpay_subscription_id ||
              "TXN123456",
            amount: String(finalAmount),
            name: formData.name,
            email: formData.email,
            method: "Razorpay",
            type: type === "one" ? "One-Time" : "Monthly"
          });

          navigate(`/thankyou?${params.toString()}`);
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile
        },

        theme: {
          color: "#0A97EF"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);

    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <section className="main-section">
        <div className="box">

          <h2>Support Subhojanam Seva</h2>
          <p>Every meal brings comfort to caregivers watching over their loved ones</p>

          <div className="toggle">
            <button
              className={type === "one" ? "active" : ""}
              onClick={() => handleTypeChange("one")}
            >
              One-time Donation
            </button>

            <button
              className={type === "monthly" ? "active" : ""}
              onClick={() => handleTypeChange("monthly")}
            >
              Monthly Donation
            </button>
          </div>

          <div className="cards">
            {donationOptions.map((item) => (
              <div
                key={item.amount}
                className={`card 
                  ${selectedAmount === item.amount ? "selected" : ""}
                  ${item.popular ? "special" : ""}
                `}
                onClick={() => handleSelect(item.amount)}
              >
                {item.popular && <div className="tag">MOST DONATED</div>}
                <h3>₹{item.amount.toLocaleString()}</h3>
                <p>
                  {type === "monthly"
                    ? `Serve ${item.meals} Meals Every Month`
                    : `Serve ${item.meals} Hot Meals`}
                </p>
                <span>@ ₹25 per meal</span>
              </div>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter custom amount (₹)"
            className="input-box"
            value={customAmount}
            onChange={handleCustomChange}
          />

          {finalAmount > 0 && (
            <p className="meal-info">
              This will serve {meals} hot meals {type === "monthly" ? "every month" : ""}
            </p>
          )}

          <button
            className="big-btn"
            disabled={!finalAmount}
            onClick={() => setShowForm(true)}
          >
            Donate Now & Feed a Soul →
          </button>

          <div className="small-info">
            <span className="info-item">
              <span className="info-icon-circle">
                <Lock className="info-icon" size={11} />
              </span>
              Secure Payment
            </span>
            <span className="info-separator">•</span>
            <span className="info-item">
              <span className="info-icon-circle">
                <FileText className="info-icon" size={11} />
              </span>
              80G Tax Exempt
            </span>
            <span className="info-separator">•</span>
            <span className="info-item">
              <span className="info-icon-circle">
                <Check className="info-icon" size={11} />
              </span>
              100% to Food
            </span>
          </div>

        </div>
      </section>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>

            <h3>Complete Your Seva</h3>

            <div className="form-grid">

              <input type="text" name="name" placeholder="Full Name *" className="form-field" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address *" className="form-field" onChange={handleChange} />
              <input type="tel" name="mobile" placeholder="Mobile Number *" className="form-field" onChange={handleChange} />

              <select name="occasion" className="form-field" onChange={handleChange}>
                <option value="">Occasion (Optional)</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Memorial</option>
                <option>Other</option>
              </select>

              <div className="date-row">
                <div className="date-field-wrapper">
                  <label className="date-label">Seva Date</label>
                  <input type="date" name="sevaDate" className="form-field" onChange={handleChange} />
                </div>
                <div className="date-field-wrapper">
                  <label className="date-label">Date of Birth</label>
                  <input type="date" name="dob" className="form-field" onChange={handleChange} />
                </div>
              </div>

              <div className="amount-display-box">
                <div className="amount-label">Donation Amount</div>
                <div className="amount-value">₹{finalAmount.toLocaleString()}</div>
                <div className="meal-message">
                  ❤️ Your donation will feed {meals} caregivers today
                </div>
              </div>

              <label className="checkbox-row">
                <input type="checkbox" name="certificate" onChange={handleChange} />
                <span>I would like to receive 80(G) Certificate</span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="updates" defaultChecked onChange={handleChange} />
                <span>I wish to receive updates from Subhojanam</span>
              </label>

            </div>

            <button
              className="big-btn modal-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Proceed to Pay ₹${finalAmount.toLocaleString()} 🔒`}
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default DonationSection;
