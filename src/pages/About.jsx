import useCountUp from "../hooks/useCountUp";

const team = [
  { name: "Chef Arjun Mehta", role: "Head Chef", bio: "15 years of fine-dining experience. Passionate about fusion flavours.", avatar: "A" },
  { name: "Priya Sharma", role: "Sous Chef", bio: "Specialist in South Indian and continental cuisine. Trained in Paris.", avatar: "P" },
  { name: "Ravi Nair", role: "Pastry Chef", bio: "Creates our irresistible desserts from scratch every morning.", avatar: "R" },
];

const milestones = [
  { year: "2018", event: "Urban Cravings opens its first location in Chennai." },
  { year: "2020", event: "Wins 'Best New Restaurant' award from Food & Travel India." },
  { year: "2022", event: "Expands menu with seasonal and globally-inspired dishes." },
  { year: "2024", event: "Opens outdoor terrace seating for 60+ guests." },
  { year: "2026", event: "Celebrating 8 years of feeding and bringing people together." },
];

function StatPill({ value, suffix, label }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="about-stat" ref={ref}>
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="section section-pad about-layout">
        <div>
          <span className="eyebrow">OUR STORY</span>
          <h1>
            Food made with<br />
            <em>a little more heart.</em>
          </h1>
          <p>
            Urban Cravings is a restaurant concept built around a simple idea: everyday
            meals should feel special. We bring together familiar comfort food, fresh
            ingredients, and a welcoming space where everyone belongs.
          </p>
          <p>
            From a quick lunch to a long conversation over dinner, we believe the best
            memories often happen around a table. That belief drives everything we do.
          </p>

          {/* Count-up stats */}
          <div className="about-stats-row">
            <StatPill value={8} suffix="+ yrs" label="In business" />
            <StatPill value={200} suffix="+" label="Guests/day" />
            <StatPill value={40} suffix="+" label="Dishes" />
            <StatPill value={98} suffix="%" label="Happy guests" />
          </div>

          <div className="values-grid">
            <div>
              <strong>01</strong>
              <h3>Fresh first</h3>
              <p>Thoughtful ingredients and food prepared with care every single day.</p>
            </div>
            <div>
              <strong>02</strong>
              <h3>Everyone welcome</h3>
              <p>A relaxed place for friends, families, and passionate food lovers.</p>
            </div>
            <div>
              <strong>03</strong>
              <h3>Made to share</h3>
              <p>Good flavours taste even better when shared with the people you love.</p>
            </div>
          </div>
        </div>
        <img
          className="about-image"
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
          alt="Warm restaurant dining setting"
        />
      </section>

      {/* ── Meet the Team ── */}
      <section className="section section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PEOPLE BEHIND THE PLATES</span>
            <h2>Meet our team.</h2>
            <p>The talented individuals who make every dish extraordinary.</p>
          </div>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-avatar">{member.avatar}</div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section section-pad timeline-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR JOURNEY</span>
            <h2>How we got here.</h2>
          </div>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div className={`timeline-item${i % 2 === 0 ? " left" : " right"}`} key={m.year}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <strong className="timeline-year">{m.year}</strong>
                <p>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}