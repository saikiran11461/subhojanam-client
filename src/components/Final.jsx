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

      <p className="cta-sub">
        Hunger doesn't wait for tomorrow. Your ₹500 can save a family
        from despair right now.
      </p>

      <p className="cta-quote">
        “The gift of food is the highest charity.” — Mahabharata
      </p>

      <button className="cta-btn" onClick={scrollToDonation}>
        Donate ₹500 & Feed Them →
      </button>

    </section>
  )
}

export default Final
