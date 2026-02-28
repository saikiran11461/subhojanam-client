import "../styles/moments.css"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"

function Moments() {
  const scrollToDonation = () => {
    const donationSection = document.querySelector('.main-section')
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="moments">

      <h2>Moments of Care & Compassion</h2>
      <p>Every meal served is a smile shared.</p>

      <div className="slider">
        <div className="slide-track">

          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />

          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />

        </div>
      </div>

      <button className="meal-btn" onClick={scrollToDonation}>
        Sponsor a Meal Like This (₹500) →
      </button>

    </section>
  )
}

export default Moments
