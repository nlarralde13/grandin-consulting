import React, { useRef, useState } from "react";

export default function Contact({ onSuccess }) {
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const hpRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (hpRef.current && hpRef.current.value) return;

    // Simple validation
    const nextErrors = {};
    if (!data.get("name")?.trim()) nextErrors.name = "Please enter your name.";
    const email = data.get("email");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email.";
    if (!data.get("message")?.trim()) nextErrors.message = "Tell us a bit about your needs.";
    if (!data.get("consent")) nextErrors.consent = "Consent is required.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSending(true);

    try {
      const resp = await fetch("https://formspree.io/f/mdkyobnv", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (resp.ok) {
        onSuccess?.();
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
    <>
      <header className="section-header">
        <h2>Contact</h2>
        <p className="muted">Tell us where you are today and where you want to go—we’ll map the path.</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="company_website"
          ref={hpRef}
          tabIndex="-1"
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0 }}
          aria-hidden="true"
        />

        <input type="hidden" name="_subject" value="New Inquiry — Grandin Consulting" />

        <div className="field">
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} />
          <small className="error" aria-live="polite">{errors.name || ""}</small>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} />
          <small className="error" aria-live="polite">{errors.email || ""}</small>
        </div>

        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" autoComplete="organization" />
        </div>

        <div className="field">
          <label htmlFor="message">How can we help?</label>
          <textarea id="message" name="message" rows="6" required aria-invalid={!!errors.message} />
          <small className="error" aria-live="polite">{errors.message || ""}</small>
        </div>

        <div className="form-foot">
          <label className="checkbox">
            <input type="checkbox" name="consent" value="yes" required aria-invalid={!!errors.consent} />
            <span>I agree to the processing of my data per the privacy notice.</span>
          </label>

          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
          </button>
        </div>

        <p className="muted xs">
          Prefer email? <a href="mailto:hello@grandin.consulting">hello@grandin.consulting</a>
        </p>
      </form>
    </>
  );
}
