import "../styles/Quote.css"
import prabhu from "../assets/prabhu.jpg"

function QuoteSection() {
  return (
    <section className="quote-section">

      <div className="quote-box">

        <div className="left">
          <img src={prabhu} alt="Srila Prabhupada" />
        </div>

        <div className="right">
          <div className="quote-mark">“</div>

          <p className="quote-text">
            No one within a ten-mile radius of our center should go hungry.
          </p>

          <h3>Srila Prabhupada</h3>
          <span>
            Founder-Acharya of Worldwide Hare Krishna Movement
          </span>
        </div>

      </div>

    </section>
  )
}

export default QuoteSection
