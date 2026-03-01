import { Routes, Route, Navigate } from "react-router-dom"
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
import Login from "./admin/pages/Login.jsx"
import Register from "./admin/pages/Register.jsx"
import AdminLayout from "./admin/components/AdminLayout.jsx"
import Dashboard from "./admin/pages/Dashboard.jsx"
import Transactions from "./admin/pages/Transactions.jsx"
import Subscriptions from "./admin/pages/Subscriptions.jsx"
import Donors from "./admin/pages/Donors.jsx"
import Analytics from "./admin/pages/Analytics.jsx"
import Settings from "./admin/pages/Settings.jsx"
import HospitalsSection from "./components/HospitalsSection.jsx"
import FeaturedOn from "./components/FeaturedOn.jsx"

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken")
  
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

function Home() {
  return (
    <>
      <Top />
      <Navbar />
      <Hero />
      <DonationSection />
      {/* <SpecialSeva /> */}
      <Moments />
      <QuoteSection />
      <Impact />
      <Working />
      <VideoSection />
      <MealSection />
      <AboutSection />
      {/* <HospitalsSection /> */}
      {/* <TrustSection /> */}
      <StoriesSection />
      <FeaturedOn />
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
      <Route path="/admin/login" element={<Login />} />
      <Route path="/x7k9m2p5q8w3" element={<Register />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="donors" element={<Donors />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
