import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Reservations", "/reservations"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Wishlist", "/wishlist"],
  ["Admin", "/admin"],
];

export default function Navbar() {
  const count = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { wishlist } = useWishlist();
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">U</span>
          <span>
            urban<span className="brand-accent"> cravings</span>
            <small>GOOD FOOD. GOOD MOOD.</small>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {label}
              {label === "Wishlist" && wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle dark/light mode"
          >
            {dark ? "☀" : "☾"}
          </button>
          <Link className="cart-link" to="/cart" aria-label={`Cart with ${count} items`}>
            Cart <span>{count}</span>
          </Link>
          {/* Hamburger – mobile only */}
          <button
            className={`hamburger-btn${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => isActive ? "drawer-link active" : "drawer-link"}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {label === "Wishlist" && wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Backdrop */}
      {menuOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}