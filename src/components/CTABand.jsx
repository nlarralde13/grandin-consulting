import React from "react";
import { CALENDLY_OR_FORM_URL, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../config/siteMeta.js";

export default function CTABand() {
  return (
    <section className="cta-band" aria-label="Get started">
      <div className="container cta-grid">
        <div className="cta-copy">
          <h3>Ready to modernize your IT?</h3>
          <p className="muted">We’ll map a clear path—from today’s pain points to tomorrow’s reliable systems.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary btn-lg" href={CALENDLY_OR_FORM_URL} rel="noopener">Book a 15-minute Fit Call</a>
          <a className="btn btn-outline btn-lg" href={PHONE_NUMBER_TEL} aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}>
            Call {PHONE_NUMBER_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
