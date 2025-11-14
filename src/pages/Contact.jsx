import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact({ onSuccess }) {
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const hpRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    if (hpRef.current && hpRef.current.value) return;

    const nextErrors = {};
    const fullName = data.get("fullName")?.trim();
    const companyName = data.get("companyName")?.trim();
    const email = data.get("email");
    const phone = data.get("phone")?.trim();
    const referral = data.get("referral");
    const projectDetails = data.get("message")?.trim();

    if (!fullName) nextErrors.fullName = "Please enter your full name.";
    if (!companyName) nextErrors.companyName = "Please enter your company name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid business email.";
    if (!phone) nextErrors.phone = "Please add a phone number.";
    if (!referral) nextErrors.referral = "Let us know how you found us.";
    if (!projectDetails) nextErrors.message = "Share what you need help with.";
    if (!data.get("consent")) nextErrors.consent = "Consent is required.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    data.set("_replyto", email);

    setSending(true);

    try {
      const resp = await fetch("https://formspree.io/f/mdkyobnv", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (resp.ok) {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("contactSubmitted", "1");
        }
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        const json = await resp.json().catch(() => ({}));
        const msg = json?.errors?.[0]?.message || "Something went wrong. Please try again.";
        alert(msg);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-card">
        <header className="contact-head">
          <p className="eyebrow">Get in touch</p>
          <h1>Tell us about your IT environment</h1>
          <p className="muted">
            Share a few details so we can route your inquiry to the right engineer. We typically respond within one business day.
          </p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="company_website"
            ref={hpRef}
            tabIndex="-1"
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
            aria-hidden="true"
          />
          <input type="hidden" name="_subject" value="New Inquiry - Grandin Consulting" />

          <div className="form-section">
            <p className="form-section__title">Contact details</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.fullName}
                />
                <small className="error" aria-live="polite">{errors.fullName || ""}</small>
              </div>
              <div className="field">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  required
                  aria-invalid={!!errors.companyName}
                />
                <small className="error" aria-live="polite">{errors.companyName || ""}</small>
              </div>
              <div className="field">
                <label htmlFor="businessEmail">Business Email</label>
                <input
                  id="businessEmail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                />
                <small className="error" aria-live="polite">{errors.email || ""}</small>
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  aria-invalid={!!errors.phone}
                />
                <small className="error" aria-live="polite">{errors.phone || ""}</small>
              </div>
            </div>
          </div>

          <div className="form-section">
            <p className="form-section__title">Business context</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="companySize">Company Size</label>
                <select id="companySize" name="companySize" defaultValue="">
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="hasItProvider">Do you currently have an IT provider?</label>
                <select id="hasItProvider" name="hasItProvider" defaultValue="">
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="referral">How did you hear about us?</label>
                <select
                  id="referral"
                  name="referral"
                  required
                  aria-invalid={!!errors.referral}
                  defaultValue=""
                >
                  <option value="">Select an option</option>
                  <option value="Referral">Referral</option>
                  <option value="Search">Search engine</option>
                  <option value="Event">Event / webinar</option>
                  <option value="Social">Social media</option>
                  <option value="Other">Other</option>
                </select>
                <small className="error" aria-live="polite">{errors.referral || ""}</small>
              </div>
              <div className="field">
                <label htmlFor="urgency">Urgency Level</label>
                <select id="urgency" name="urgency" defaultValue="">
                  <option value="">Select urgency</option>
                  <option value="exploring">Just exploring options</option>
                  <option value="3-months">In the next 3 months</option>
                  <option value="asap">ASAP / Active issue</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <p className="form-section__title">Project details</p>
            <div className="field">
              <label htmlFor="projectDetails">What are you looking for help with?</label>
              <textarea
                id="projectDetails"
                name="message"
                rows="6"
                required
                aria-invalid={!!errors.message}
              />
              <small className="error" aria-live="polite">{errors.message || ""}</small>
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="preferredContact">Preferred contact method</label>
                <select id="preferredContact" name="preferredContact" defaultValue="">
                  <option value="">Select method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="bestTime">Best time to reach you</label>
                <input id="bestTime" name="bestTime" type="text" placeholder="e.g., Weekdays after 2pm ET" />
              </div>
            </div>
          </div>

          <div className="form-foot contact-foot">
            <label className="checkbox">
              <input type="checkbox" name="consent" value="yes" required aria-invalid={!!errors.consent} />
              <span>I agree to the processing of my data per the privacy notice.</span>
            </label>
            <button className="btn btn-primary btn-lg" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Submit request"}
            </button>
          </div>

          <p className="muted xs contact-note">
            Prefer email? <a href="mailto:info@grandinconsulting.com">hello@grandinconsulting.com</a>
          </p>
        </form>
      </section>
    </main>
  );
}
