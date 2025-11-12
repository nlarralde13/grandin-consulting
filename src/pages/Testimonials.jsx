import React from "react";

const testimonials = [
  {
    quote: "Grandin made our cloud migration boring—in the best way possible.",
    who: "COO, Retail Chain",
  },
  {
    quote: "We finally have one place to manage users and laptops. Huge relief.",
    who: "Office Manager, Dental Group",
  },
  {
    quote: "Their DR plan paid for itself the first time we needed it.",
    who: "Founder, Creative Studio",
  },
];

export default function Testimonials() {
  return (
    <main className="container" style={{ paddingTop: 72 }}>
      <header className="section-header">
        <h2>Client Testimonials</h2>
        <p className="muted">Short quotes. Big outcomes.</p>
      </header>

      <div className="grid">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="card">
            <p style={{ fontStyle: "italic" }}>“{t.quote}”</p>
            <p className="muted">— {t.who}</p>
          </blockquote>
        ))}
      </div>
    </main>
  );
}
