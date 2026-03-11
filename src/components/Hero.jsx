import "../styles/hero.css"

function Hero() {
  const handleClick = () => {
    const donationSection = document.getElementById("donation-section");
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero" onClick={handleClick} style={{ cursor: "pointer" }}>
    </section>
  );
}

export default Hero
