import React from "react";
import { TESTIMONIALS } from "../data/testimonials.js";

const VISIBLE_TESTIMONIALS = TESTIMONIALS.slice(0, 2);

export default function Testimonials() {
  return (
    <main className="testimonials-page">
      <section className="testimonials-hero" aria-labelledby="testimonials-hero-title">
        <div className="container">
          <p className="eyebrow">Client feedback</p>
          <h1 id="testimonials-hero-title">Client Testimonials</h1>
          <p className="muted">
            Real stories from teams we have helped stabilize, secure, and modernize their IT operations across the region.
          </p>
        </div>
      </section>

      <section className="section testimonials-detail" aria-labelledby="testimonials-detail-title">
        <div className="container">
          <div className="section-header">
            <h2 id="testimonials-detail-title">Proof points from the field</h2>
            <p>
              Same senior team, different industries. Each engagement starts with clarity, a plan, and measurable outcomes.
            </p>
          </div>
          <div className="testimonials-list">
            {VISIBLE_TESTIMONIALS.map((testimonial) => (
              <article className="testimonial-detail-card" key={testimonial.id}>
                <div className="testimonial-detail-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {"*".repeat(testimonial.rating)}
                </div>
                {testimonial.focus && <p className="testimonial-detail-focus">{testimonial.focus}</p>}
                <p className="testimonial-detail-quote">"{testimonial.quote}"</p>
                <p className="testimonial-detail-meta">
                  — {testimonial.name}, {testimonial.role}, {testimonial.company}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
