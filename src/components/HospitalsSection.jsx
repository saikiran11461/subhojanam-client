import "../styles/hospitals.css"
import { FaHospital } from "react-icons/fa"

function HospitalsSection() {
  return (
    <section className="hospitals-section">

      <h2 className="hospitals-title">
        SERVING AT MAJOR GOVERNMENT HOSPITALS
      </h2>

      <div className="hospitals-container">

        <div className="hospital-card">
          <FaHospital className="hospital-icon" />
          <span>KGH Govt Hospital</span>
        </div>

        <div className="hospital-card">
          <FaHospital className="hospital-icon" />
          <span>Tata Memorial Hospital</span>
        </div>

        <div className="hospital-card">
          <FaHospital className="hospital-icon" />
          <span>Government General hospital</span>
        </div>

      </div>

    </section>
  )
}

export default HospitalsSection