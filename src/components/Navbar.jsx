import "../styles/navbar.css"
import logo from "../assets/logo.png"

function Navbar() {
  const scrollToDonation = () => {
    const donationSection = document.querySelector('.main-section')
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
     <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          <img src={logo} alt="Hare Krishna Logo" />
        </div>

        <div className="navbar__buttons">
          <button className="donate-btn" onClick={scrollToDonation}>
             Donate Now
          </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar
