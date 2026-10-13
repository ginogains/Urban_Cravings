import { useRef, useState } from "react";

const FAQ = [
  { q: "Can I modify my reservation after booking?", a: "Yes! Simply contact us via email or phone at least 2 hours before your reservation time and we'll adjust accordingly." },
  { q: "Do you accommodate dietary restrictions?", a: "Absolutely. Please mention any allergies or dietary needs in the special requests field when booking, or call us directly." },
  { q: "Is there parking available?", a: "We have a dedicated parking zone and are also well-connected by public transport." },
  { q: "Can I book for large groups?", a: "Yes! For groups of 10 or more, please call us directly so we can make the best arrangements for your event." },
];

export default function Contact() {
  const emailRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name (min 2 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Please enter a subject.";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  }

  function submit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      if (errs.email) emailRef.current?.focus();
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <section className="contact-layout section-pad">
        <div>
          <span className="eyebrow">SAY HELLO</span>
          <h1>We'd love to<br /><em>hear from you.</em></h1>
          <p>Questions, feedback, or just want to tell us about your favourite dish? Drop us a note.</p>
          <div className="contact-details">
            <div className="contact-detail-row">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Visit us</strong>
                <p>Urban Cravings, Anna Nagar, Chennai, Tamil Nadu</p>
              </div>
            </div>
            <div className="contact-detail-row">
              <div className="contact-icon">🕐</div>
              <div>
                <strong>Opening hours</strong>
                <p>Every day · 11:00 AM – 10:00 PM</p>
              </div>
            </div>
            <div className="contact-detail-row">
              <div className="contact-icon">📧</div>
              <div>
                <strong>Email</strong>
                <p>hello@urbancravings.example</p>
              </div>
            </div>
            <div className="contact-detail-row">
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Instagram">📸 Instagram</a>
            <a href="#" className="social-btn" aria-label="Twitter">𝕏 Twitter</a>
            <a href="#" className="social-btn" aria-label="Facebook">🫂 Facebook</a>
          </div>
        </div>

        <form className="form-card" onSubmit={submit} noValidate>
          <h2>Send a message</h2>
          <p className="muted">We reply within 24 hours on business days.</p>
          {sent && (
            <div className="success-message" role="status">
              ✓ Thanks! Your message has been received. We'll be in touch soon.
            </div>
          )}
          <label>
            Your name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
            />
            {errors.name && <small className="field-error">{errors.name}</small>}
          </label>
          <label>
            Email address
            <input
              ref={emailRef}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </label>
          <label>
            Subject
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="What's it about?"
            />
            {errors.subject && <small className="field-error">{errors.subject}</small>}
          </label>
          <label>
            Message
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="5"
              placeholder="Write your message..."
            />
            {errors.message && <small className="field-error">{errors.message}</small>}
          </label>
          <button className="button button-primary button-wide" type="submit">
            Send message ↗
          </button>
          <small className="muted">Demo form only; it does not send a real email.</small>
        </form>
      </section>

      {/* Map placeholder */}
      <section className="section-pad map-section">
        <div className="map-placeholder">
          <div className="map-pin">📍</div>
          <strong>Urban Cravings – Anna Nagar, Chennai</strong>
          <p>Interactive map coming soon</p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="section section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FREQUENTLY ASKED</span>
            <h2>Got questions?</h2>
          </div>
        </div>
        <div className="faq-list">
          {FAQ.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item${openFAQ === idx ? " open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                aria-expanded={openFAQ === idx}
              >
                <span>{item.q}</span>
                <span className="faq-icon">{openFAQ === idx ? "−" : "+"}</span>
              </button>
              {openFAQ === idx && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}