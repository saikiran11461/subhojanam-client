import "../styles/special.css"

function SpecialSeva() {
  const scrollToDonation = () => {
    const donationSection = document.querySelector('.main-section')
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="special-section">

      <h2>Celebrate Your Special Day with Seva</h2>

      <p>
        Turn your Birthday or Anniversary into an act of compassion
      </p>

      <p>
        Sponsor prasadam meals and spread blessings to families in need
      </p>

      <div className="special-buttons">
        <button className="outline-btn" onClick={scrollToDonation}>
         Sponsor for Birthday 
        </button>

        <button className="outline-btn" onClick={scrollToDonation}>
          Sponsor Anniversary Seva
        </button>
      </div>

    </section>
  )
}

export default SpecialSeva
