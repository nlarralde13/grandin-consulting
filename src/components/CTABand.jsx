import React from "react";
import { Link } from "react-router-dom";

export default function CTABand() {
  return (
    <section className="cta-band" aria-label="Get started">
      <div className="container cta-grid">
        <div className="cta-copy">
          <h3>Ready to modernize your IT?</h3>
          <p className="muted">We’ll map a clear path—from today’s pain points to tomorrow’s reliable systems.</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to="/schedule">Book a Consultation</Link>
          <Link className="btn btn-outline btn-lg" to="/#contact">Contact Sales</Link>
        </div>
      </div>
    </section>
  );
}
