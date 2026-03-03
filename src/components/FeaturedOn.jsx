import "../styles/featured.css"

function FeaturedOn() {
  const logos = [
    { src: "https://storage.googleapis.com/subhojanam/timesofindia.png", alt: "The Times of India", className: "" },
    { src: "https://storage.googleapis.com/subhojanam/thehindu-logo.svg", alt: "The Hindu", className: "" },
    { src: "https://storage.googleapis.com/subhojanam/indian-express-logo-png_seeklogo-381588.png", alt: "The Indian Express", className: "indian-express-logo" },
    { src: "https://storage.googleapis.com/subhojanam/eenadu-logo.png", alt: "Eenadu", className: "" }
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