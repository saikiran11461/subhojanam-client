import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";
import "../styles/footer.css";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Stories", href: "#stories" },
  { label: "Transparency", href: "#transparency" },
  { label: "FAQ", href: "#faq" },
  { label: "Donate", href: "#donate" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/iskconvizag", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/iskconvizag", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/iskconvizag", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/iskconvizag", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Subhojanam</h3>
            <p className="footer-subtitle">ISKCON Hospital Feeding Program</p>
            <div className="footer-contact-item">
              <MapPin />
              <span>
                KGH Down Rd, beside orthopedic ward,<br />
                Maharani Peta, Visakhapatnam,<br />
                AP 530002
              </span>
            </div>
            <div className="footer-contact-item">
              <Mail />
              <span>info@subhojanam.org</span>
            </div>
            <div className="footer-contact-item">
              <Phone />
              <span>+91 891 000 0000</span>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="footer-social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="footer-social-icon"
                >
                  <social.icon />
                </a>
              ))}
            </div>
            <a href="#donate" className="footer-donate-btn">
              Donate Now
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ISKCON Visakhapatnam — Subhojanam Seva</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
