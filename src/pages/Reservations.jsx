import { useRef, useState } from "react";
export default function Reservations() {
  const nameRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "19:00", guests: "2", notes: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); setSuccess(""); }
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (!form.date || form.date < new Date().toLocaleDateString("en-CA")) next.date = "Choose today or a future date.";
    setErrors(next);
    if (Object.keys(next).length) { if (next.name) nameRef.current?.focus(); return; }
    const booking = { ...form, id: Date.now(), createdAt: new Date().toISOString() };
    const old = JSON.parse(localStorage.getItem("uc-bookings") || "[]");
    localStorage.setItem("uc-bookings", JSON.stringify([booking, ...old]));
    setSuccess(`Thanks, ${form.name}! Your demo reservation request has been saved.`);
    setForm({ name: "", email: "", phone: "", date: "", time: "19:00", guests: "2", notes: "" });
  }
  return <section className="reservation-section section-pad"><div className="reservation-copy"><span className="eyebrow">LET'S SAVE YOU A SEAT</span><h1>Your table<br /><em>is waiting.</em></h1><p>Planning a date night, family dinner, or a catch-up with friends? Send us a reservation request.</p><div className="contact-mini"><span>◷</span><div><strong>Opening hours</strong><p>Mon–Sun · 11:00 AM – 10:00 PM</p></div></div><div className="contact-mini"><span>⌖</span><div><strong>Find us</strong><p>Urban Cravings, Chennai, Tamil Nadu</p></div></div></div>
    <form className="form-card" onSubmit={submit} noValidate><h2>Book a table</h2><p className="muted">Fill in the details below.</p>
      {success && <div className="success-message" role="status">{success}</div>}
      <div className="form-grid">
        <label>Full name<input ref={nameRef} name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="field-error">{errors.name}</small>}</label>
        <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</label>
        <label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="10-digit number" />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
        <label>Guests<select name="guests" value={form.guests} onChange={update}>{["1","2","3","4","5","6","7","8"].map((n) => <option key={n} value={n}>{n} guest{n === "1" ? "" : "s"}</option>)}</select></label>
        <label>Date<input type="date" name="date" min={new Date().toLocaleDateString("en-CA")} value={form.date} onChange={update} />{errors.date && <small className="field-error">{errors.date}</small>}</label>
        <label>Time<select name="time" value={form.time} onChange={update}>{["11:00","12:00","13:00","14:00","17:00","18:00","19:00","20:00","21:00"].map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="full-field">Special request (optional)<textarea name="notes" value={form.notes} onChange={update} placeholder="Anything we should know?" rows="3" /></label>
      </div><button className="button button-primary button-wide" type="submit">Request reservation ↗</button><small className="muted">Demo only: no real reservation is sent to a restaurant.</small>
    </form></section>;
}