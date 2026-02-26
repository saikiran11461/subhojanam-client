import "../styles/featured.css"

import toi from "../assets/timesofindi.png"
import hindu from "../assets/thehindu-logo.svg"
import newIndian from "../assets/TheNewIndian.png"
import eenadu from "../assets/eenadu-logo.png"

function FeaturedOn() {
  return (
    <section className="featured-section">

      <h2 className="featured-title">
        Featured On
        <span className="underline"></span>
      </h2>

      <div className="featured-logos">
        <img height={200} src={toi} alt="The Times of India" />
        <img src={hindu} alt="The Hindu" />
        <img src={newIndian} alt="The New Indian Express" />
        <img src={eenadu} alt="Eenadu" />
      </div>

    </section>
  )
}

export default FeaturedOn