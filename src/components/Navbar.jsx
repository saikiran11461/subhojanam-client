import "../styles/navbar.css"
import logo from "../assets/logo.png"

function Navbar() {
  return (
     <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          <img src={logo} alt="Hare Krishna Logo" />
        </div>

        <div className="navbar__buttons">
          <button className="donate-btn">
             Donate Now
          </button>

          <button className="exempt-btn">
             80G Exempt
          </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar
