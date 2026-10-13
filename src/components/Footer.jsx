import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand">
            <span className="brand-mark">U</span>
            urban cravings
          </Link>
          <p>Made with care. Served with a smile.<br />Good food. Great mood.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" className="footer-social-btn">📸</a>
            <a href="#" aria-label="Twitter" className="footer-social-btn">𝕏</a>
            <a href="#" aria-label="Facebook" className="footer-social-btn">🫂</a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Visit us</h4>
          <p>Anna Nagar, Chennai<br />Tamil Nadu, India</p>
          <p>Mon–Sun · 11 AM – 10 PM</p>
          <p>+91 98765 43210</p>
          <p>hello@urbancravings.example</p>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Urban Cravings · React Training Project</small>
        <div className="footer-badges">
          <span>⚛ React</span>
          <span>🔀 React Router</span>
          <span>🗄 Redux</span>
        </div>
      </div>
    </footer>
  );
}