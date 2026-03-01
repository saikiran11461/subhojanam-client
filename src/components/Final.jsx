import "../styles/final.css"

function Final() {
  const scrollToDonation = () => {
    const donationSection = document.querySelector('.main-section')
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="final-cta">

      <h2>Someone is Waiting for You</h2>

      <div className="cta-content">
        <p className="cta-highlight">
          Hunger doesn't wait for tomorrow.
        </p>
        <p className="cta-text">
          Your ₹500 can save a family from despair right now. Every meal you provide brings hope, strength, and dignity to those waiting by hospital bedsides.
        </p>
      </div>

      <p className="cta-quote">
        "The gift of food is the highest charity." — Mahabharata
      </p>

      <button className="cta-btn" onClick={scrollToDonation}>
        Donate ₹500 & Feed Them →
      </button>

    </section>
  )
}

export default Final
