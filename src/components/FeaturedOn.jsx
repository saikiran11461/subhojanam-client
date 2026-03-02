import "../styles/featured.css"

import toi from "../assets/newsimages/timesofindia.png"
import hindu from "../assets/newsimages/thehindu.webp"
import indianExpress from "../assets/newsimages/indian-express-logo-png_seeklogo-381588.png"
import eenadu from "../assets/newsimages/eenadu-logo.webp"

function FeaturedOn() {
  const logos = [
    { src: toi, alt: "The Times of India", className: "" },
    { src: hindu, alt: "The Hindu", className: "" },
    { src: indianExpress, alt: "The Indian Express", className: "indian-express-logo" },
    { src: eenadu, alt: "Eenadu", className: "" }
  ];

  return (
    <section className="featured-section">

      <h2 className="featured-title">
        Featured On
        <span className="underline"></span>
      </h2>

      <div className="featured-logos-wrapper">
        <div className="featured-logos">
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className={logo.className} />
          ))}
          {logos.map((logo, index) => (
            <img key={`duplicate-${index}`} src={logo.src} alt={logo.alt} className={logo.className} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default FeaturedOn