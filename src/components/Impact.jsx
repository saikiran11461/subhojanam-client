import "../styles/impact.css"
import { FaUtensils, FaHospital, FaHandsHelping } from "react-icons/fa"
import { GiMeditation } from "react-icons/gi"

function Impact() {
  return (
    <section className="impact-section">

      <h2>Our Impact — In Lives Changed</h2>
      <p className="impact-sub">
        Behind every number is a story of hunger turned into hope
      </p>

      <div className="impact-cards">

        <div className="impact-card">
          <div className="circle"><FaUtensils /></div>
          <h3>3,65,000+</h3>
          <h4>Stomachs Filled with Hope</h4>
          <p>Ensuring no one sleeps hungry on our watch.</p>
        </div>

        <div className="impact-card">
          <div className="circle"><FaHospital /></div>
          <h3>15+</h3>
          <h4>Beacons of Care</h4>
          <p>Reaching the heartbroken in the darkest corridors.</p>
        </div>

        <div className="impact-card">
          <div className="circle"><FaHandsHelping /></div>
          <h3>2,500+</h3>
          <h4>Hands Serving with Love</h4>
          <p>United by empathy, driven by the spirit of seva.</p>
        </div>

        <div className="impact-card">
          <div className="circle"><GiMeditation /></div>
          <h3>100%</h3>
          <h4>Pure Devotion</h4>
          <p>Every grain offered to the Divine before it's served.</p>
        </div>

      </div>

    </section>
  )
}

export default Impact
