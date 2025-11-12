import React from "react";

export default function Schedule() {
  return (
    <main className="container" style={{ paddingTop: 72 }}>
      <header className="section-header">
        <h2>Book a Consultation</h2>
        <p className="muted">Pick a time that works—we’ll come prepared.</p>
      </header>

      <div className="card" style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* Replace src with your scheduling provider embed URL */}
        <iframe
          title="Schedule"
          src="https://cal.com/your-handle/intro?layout=month_view"
          style={{ width: "100%", height: 720, border: 0 }}
          loading="lazy"
        />
        <p className="muted xs" style={{ padding: "10px 16px" }}>
          Prefer email? <a href="mailto:info@grandinconsulting.com">hello@grandinconsulting.com</a>
        </p>
      </div>
    </main>
  );
}
