import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { localFoods } from "../data";
import FoodCard from "../components/FoodCard";
import useCountUp from "../hooks/useCountUp";

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    avatar: "P",
    rating: 5,
    text: "The Margherita Pizza is absolutely heavenly! Fresh ingredients, crispy crust, and the service was impeccable. Urban Cravings is now our go-to spot.",
    location: "Chennai",
  },
  {
    id: 2,
    name: "Rahul M.",
    avatar: "R",
    rating: 5,
    text: "I booked a table for our anniversary and the team made it so special. The Paneer Tikka Wrap is a must-try. Will definitely return!",
    location: "Bangalore",
  },
  {
    id: 3,
    name: "Ananya K.",
    avatar: "A",
    rating: 5,
    text: "Best smoothies in the city! The ambiance is cozy and modern. The Chocolate Pancakes are pure comfort food. Highly recommended.",
    location: "Chennai",
  },
  {
    id: 4,
    name: "Dev R.",
    avatar: "D",
    rating: 4,
    text: "Great food, fast service, and a wonderful atmosphere. The Classic Burger is juicy and perfectly seasoned. My team loves it here.",
    location: "Hyderabad",
  },
];

function StatBlock({ value, suffix = "", label, prefix = "" }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="hero-stats-item">
      <strong>
        {prefix}{count}{suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const intervalRef = useRef(null);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function goTo(idx) {
    clearInterval(intervalRef.current);
    setActiveTestimonial(idx);
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }

  const t = testimonials[activeTestimonial];

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR NEW FAVOURITE SPOT</span>
          <h1>
            Good food.<br />
            <em>Great mood.</em>
          </h1>
          <p>
            Fresh flavours, feel-good favourites, and little moments worth sharing.
            Your table is waiting.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/menu">
              Explore the menu <span>↗</span>
            </Link>
            <Link className="button button-ghost" to="/reservations">
              Book a table
            </Link>
          </div>
          <div className="hero-stats">
            <StatBlock value={48} suffix="/5" label="Guest rating" prefix="4." />
            <StatBlock value={200} suffix="+" label="Happy guests daily" />
            <StatBlock value={25} suffix=" min" label="Average prep" />
            <StatBlock value={8} suffix="" label="Menu categories" />
          </div>
        </div>
        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90"
            alt="Freshly prepared restaurant meal"
          />
          <div className="floating-note">
            <span>✦</span>
            <div>
              <strong>Made fresh</strong>
              <small>Every single day</small>
            </div>
          </div>
          <div className="hero-circle">
            FRESH<br />&amp; TASTY
          </div>
        </div>
      </section>

      {/* ── Fan Favourites ── */}
      <section className="section section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</span>
            <h2>Fan favourites</h2>
            <p>Made with good ingredients and a whole lot of love.</p>
          </div>
          <Link className="text-link" to="/menu">View full menu ↗</Link>
        </div>
        <div className="food-grid">
          {localFoods.slice(0, 4).map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* ── Feature Band ── */}
      <section className="feature-band">
        <div className="feature-icon">✳</div>
        <div>
          <span className="eyebrow">MORE THAN JUST A MEAL</span>
          <h2>Good food brings us together.</h2>
          <p>
            Whether it's a quick lunch, a catch-up with friends, or a special
            celebration, there's always a seat for you.
          </p>
        </div>
        <Link className="button button-light" to="/reservations">
          Find your table
        </Link>
      </section>

      {/* ── Testimonials ── */}
      <section className="section section-pad testimonials-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT OUR GUESTS SAY</span>
            <h2>Loved by foodies.</h2>
            <p>Real experiences from our valued guests.</p>
          </div>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-card animate-fade" key={t.id}>
            <div className="testimonial-stars">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
            <blockquote className="testimonial-text">"{t.text}"</blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.avatar}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`dot-btn${idx === activeTestimonial ? " active" : ""}`}
                onClick={() => goTo(idx)}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section section-pad why-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHY URBAN CRAVINGS</span>
            <h2>Every detail matters.</h2>
          </div>
        </div>
        <div className="why-grid">
          {[
            { icon: "🌿", title: "Farm-Fresh Ingredients", desc: "We source locally and seasonally for the best flavour." },
            { icon: "👨‍🍳", title: "Expert Chefs", desc: "Our team brings decades of culinary experience to every plate." },
            { icon: "⚡", title: "Lightning Fast", desc: "Ready in 25 minutes or your next order is on us." },
            { icon: "💚", title: "Sustainable", desc: "Eco-friendly packaging and zero-waste kitchen practices." },
            { icon: "🎉", title: "Events & Catering", desc: "We bring the Urban Cravings experience to your event." },
            { icon: "📱", title: "Easy Ordering", desc: "Book a table or browse the menu from any device, anytime." },
          ].map(({ icon, title, desc }) => (
            <div className="why-card" key={title}>
              <div className="why-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <NewsletterBand />
    </>
  );
}

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="newsletter-band section-pad">
      <div className="newsletter-inner">
        <div>
          <span className="eyebrow" style={{ color: "#efb39a" }}>STAY IN THE LOOP</span>
          <h2>Get weekly specials &amp; offers.</h2>
          <p>Join 2,000+ food lovers. No spam, only good stuff.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          {status === "success" ? (
            <p className="newsletter-success">🎉 You're on the list! Check your inbox.</p>
          ) : (
            <>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className={status === "error" ? "input-error" : ""}
              />
              <button type="submit" className="button button-light">
                Subscribe ↗
              </button>
            </>
          )}
          {status === "error" && (
            <small className="newsletter-err">Please enter a valid email address.</small>
          )}
        </form>
      </div>
    </section>
  );
}