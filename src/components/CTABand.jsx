import React from "react";
import { Link } from "react-router-dom";
import { CALENDLY_OR_FORM_URL, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../config/siteMeta.js";

export default function CTABand() {
  return (
    <section className="cta-band" aria-label="Schedule a consult">
      <div className="cta-grid">
        <div className="cta-copy">
          <h3>Ready to modernize your IT?</h3>
          <p className="muted">
            We map the gaps, prioritize the quick wins, and own every ticket so your team can stay focused on clients.
          </p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to={CALENDLY_OR_FORM_URL}>
            Book a Consultation
          </Link>
          <a className="btn btn-outline btn-lg" href={PHONE_NUMBER_TEL} aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}>
            Call {PHONE_NUMBER_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
