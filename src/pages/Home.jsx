import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CTABand from "../components/CTABand.jsx";
import CoverageLine from "../components/CoverageLine.jsx";
import IPInfoCard from "../components/IPInfoCard.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";
import { CALENDLY_OR_FORM_URL, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL, RUNBOOK_PDF_URL } from "../config/siteMeta.js";

const SERVICE_PILLARS = [
  {
    title: "IT Support & Workplace Management",
    summary: "Keep your people and devices running smoothly",
    points: [
      "Unlimited helpdesk for everyday issues",
      "Onboarding, offboarding, and device maintenance handled for you",
      "Simple, predictable monthly pricing",
    ],
  },
  {
    title: "Secure Cloud & Network Foundations",
    summary: "Modern tools and reliable connectivity",
    points: [
      "Business-grade Wi-Fi and a clean, stable network",
      "Email and files organized in Microsoft 365 or Google Workspace",
      "Built-in protections like MFA, safe file access, and smarter spam filtering",
    ],
  },
  {
    title: "Protection, Backup & Physical Security",
    summary: "Defend the business from outages and threats",
    points: [
      "Automated backups for computers and cloud accounts",
      "Monitored antivirus/EDR and password management",
      "IP cameras, remote viewing, and simple door-access systems",
    ],
  },
];

const INDUSTRIES = [
  { title: "Professional Services", detail: "Legal, accounting, creative, and investment firms that need audited workflows." },
  { title: "Healthcare & Life Sciences", detail: "Multi-site practices and labs balancing PHI protection with clinic uptime." },
  { title: "Growth-Stage Operators", detail: "Private equity portfolio companies and regional franchises expanding offices quickly." },
];

export default function Home() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("contactSubmitted") === "1") {
      setShowConfirmation(true);
      window.sessionStorage.removeItem("contactSubmitted");
    }
  }, []);

  return (
    <div className="home">
      {showConfirmation && (
        <div className="form-confirmation" role="status">
          <p>Your message is in. We will reach out shortly.</p>
          <button type="button" onClick={() => setShowConfirmation(false)} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      )}
      <section className="home-hero" id="hero" aria-labelledby="hero-title">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Managed IT & Cloud Operations</p>
            <h1 id="hero-title">Modern IT for Small & Mid-Sized Businesses</h1>
            <p className="home-hero__summary">
              We build and operate reliable IT environments for 20-500 user organizations across New Jersey, NYC, and
              Philadelphia. Infrastructure, cybersecurity, cloud, and onsite response handled by one accountable team.
            </p>

            <ul className="home-hero__points">
              <li>Proactive monitoring, patching, and onsite support</li>
              <li>Modern identity, device, and SaaS governance</li>
              <li>Backups, DR, and compliance-ready reporting</li>
            </ul>

            <div className="home-hero__ctas">
              <Link className="btn btn-primary btn-lg" to={CALENDLY_OR_FORM_URL}>
                Book a Consultation
              </Link>
              <a className="btn btn-outline btn-lg" href={PHONE_NUMBER_TEL} aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}>
                Call {PHONE_NUMBER_DISPLAY}
              </a>
            </div>

            <a className="home-hero__link" href={RUNBOOK_PDF_URL} rel="noopener">
              Review a sample incident response runbook ->
            </a>
          </div>

          <div className="home-hero__media">
            <IPInfoCard />
          </div>
        </div>
      </section>

      <section className="section service-pillars" id="services" aria-labelledby="service-pillars-title">
        <div className="anchor-target" id="solutions" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">What we deliver</p>
          <div className="section-header">
            <h2 id="service-pillars-title">Less firefighting. More dependable IT.</h2>
            <p>
              Clear scopes, transparent pricing, and right-sized tooling mean you see value in the first 30 days, not after
              a year of migration work.
            </p>
          </div>
        </div>
        <div className="container pillars-grid">
          {SERVICE_PILLARS.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <h3>{pillar.title}</h3>
              <p className="muted">{pillar.summary}</p>
              <ul>
                {pillar.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials-section" aria-labelledby="testimonials-title">
        <div className="container">
          <p className="eyebrow">Client feedback</p>
          <div className="section-header">
            <h2 id="testimonials-title">What our clients say</h2>
            <p>A few words from teams we have helped modernize their IT and operations.</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="testimonial-quote">“{testimonial.quote}”</p>
                <div className="testimonial-meta">
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="testimonials-cta">
            <Link className="btn btn-outline" to="/testimonials">
              Read more testimonials
            </Link>
          </div>
        </div>
      </section>

      <section className="section industries" id="industries" aria-labelledby="industries-title">
        <div className="anchor-target" id="about" aria-hidden="true" />
        <div className="container">
          <div className="industries-card">
            <p className="eyebrow">Who we serve</p>
            <div className="section-header">
              <h2 id="industries-title">Teams that expect enterprise-grade reliability.</h2>
              <p>
                Grandin Consulting is a senior-level IT team for organizations that can{"'"}t afford downtime. With more than forty years
                of combined experience across desktop support, enterprise networks, cloud platforms, and hybrid media infrastructure, we design
                and support systems that just work.
                <br />
                <br />
                We bring enterprise-grade discipline to small and midsize businesses, delivering clear communication, predictable results,
                and technology that quietly does its job while your team does theirs.
              </p>
              <div className="section-header__cta">
                <Link className="btn btn-outline" to="/about">
                  Read more about us
                </Link>
              </div>
            </div>
            <div className="industries-grid">
              {INDUSTRIES.map((industry) => (
                <article key={industry.title} className="industry-card">
                  <h3>{industry.title}</h3>
                  <p>{industry.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
     

      <section className="section final-cta" id="resources">
        <div className="anchor-target" id="contact" aria-hidden="true" />
        <div className="container final-cta__inner">
          <CoverageLine className="final-coverage" />
          <CTABand />
        </div>
      </section>
    </div>
  );
}
