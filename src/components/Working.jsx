import "../styles/working.css"
import { FaHandHoldingUsd, FaFire, FaTruck, FaSmile } from "react-icons/fa"

function Working() {
  return (
    <section className="how-section">

      <h2>How Your Donation Turns Into a Warm Meal</h2>
      <p className="sub">Simple. Efficient. Transparent.</p>

      <div className="steps">

        <div className="step">
          <div className="icon"><FaHandHoldingUsd /></div>
          <h3>You Click Donate</h3>
          <p>
            Your contribution is processed securely and an 80G tax receipt is generated instantly.
          </p>
        </div>

        <div className="step">
          <div className="icon"><FaFire /></div>
          <h3>We Procure & Cook</h3>
          <p>
            We buy premium rice, dal, and fresh vegetables. Meals are cooked in certified kitchens.
          </p>
        </div>

        <div className="step">
          <div className="icon"><FaTruck /></div>
          <h3>We Deliver Warmth</h3>
          <p>
            Customized vans rush the hot prasadam to government hospitals before lunchtime.
          </p>
        </div>

        <div className="step">
          <div className="icon"><FaSmile /></div>
          <h3>A Life is Touched</h3>
          <p>
            A hungry caregiver receives a nutritious meal, free of cost and full of love.
          </p>
        </div>

      </div>

      <div className="green-box">
        <div className="tick">✔</div>
        <p>
          100% of your donation goes directly to food procurement and distribution.
        </p>
      </div>

    </section>
  )
}

export default Working
