import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Top from "./components/Top"
import DonationSection from "./components/DonationSection"
import SpecialSeva from "./components/SpecialSeva"
import Moments from "./components/Moments"
import QuoteSection from "./components/QuoteSection"
import Impact from "./components/Impact"
import Working from "./components/Working"
import VideoSection from "./components/VideoSection.jsx"
import MealSection from "./components/MealSection.jsx"
import AboutSection from "./components/AboutSection.jsx"
import TrustSection from "./components/TrustSection.jsx"
import StoriesSection from "./components/StoriesSection.jsx"
import Final from "./components/Final.jsx"
import FAQsection from "./components/FAQsection.jsx"
import Footer from "./components/Footer.jsx"
import ThankYouPage from "./components/Thankyoupage.jsx"

function Home() {
  return (
    <>
      <Top />
      <Navbar />
      <Hero />
      <DonationSection />
      <SpecialSeva />
      <Moments />
      <QuoteSection />
      <Impact />
      <Working />
      <VideoSection />
      <MealSection />
      <AboutSection />
      <TrustSection />
      <StoriesSection />
      <Final />
      <FAQsection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thankyou" element={<ThankYouPage />} />
    </Routes>
  )
}

export default App
