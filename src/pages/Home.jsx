import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatureGrid from "../components/FeatureGrid.jsx";
import PartnerStrip from "../components/PartnerStrip.jsx";
import StatsRow from "../components/StatsRow.jsx";
import CTABand from "../components/CTABand.jsx";
import CredibilityStrip from "../components/CredibilityStrip.jsx";
import CaseSnapshots from "../components/CaseSnapshots.jsx";
import ICPSections from "../components/ICPSections.jsx";
import Guarantees from "../components/Guarantees.jsx";
import SecurityCompliance from "../components/SecurityCompliance.jsx";
import CoverageLine from "../components/CoverageLine.jsx";
import AboutWhy from "../components/AboutWhy.jsx";
import { CALENDLY_OR_FORM_URL, NAV_LINKS, RUNBOOK_PDF_URL } from "../config/siteMeta.js";

const heroLogos = [
  { src: "/images/logo_transparent.png", alt: "Grandin Consulting badge" },
  { src: "/images/logo_white_background.png", alt: "Grandin Consulting full logo" },
];
const heroBadgeLogo = "/images/logo_white_background.png";
const heroTiles = [
  { title: "Wi-Fi", summary: "Mesh Wi-Fi tuned for density and roaming with built-in health alerts." },
  { title: "Identity", summary: "Modern identity that unifies SSO, MFA, and lifecycle automation." },
  { title: "Backups", summary: "Policy-driven backups with immutable storage and quarterly tests." },
  { title: "Cloud", summary: "Right-sized cloud foundations with cost guardrails and telemetry." },
];

function HeroFlipCard({ title, summary }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`hero-flip-card${flipped ? " is-flipped" : ""}`}
      onClick={() => setFlipped((state) => !state)}
      aria-pressed={flipped}
    >
      <span className="hero-flip-card__inner">
        <span className="hero-flip-card__face hero-flip-card__face--front">
          {title}
        </span>
        <span className="hero-flip-card__face hero-flip-card__face--back">
          <strong>{title}</strong>
          <p>{summary}</p>
          <span className="hero-flip-card__hint">Tap to flip back</span>
        </span>
      </span>
    </button>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--split" aria-labelledby="home-hero-title">
        <div className="container hero__inner">
          <div className="hero__left">
            <h1 id="home-hero-title">Managed IT & Cloud for Central NJ, NYC & Philadelphia</h1>
            <p className="lead">
              SLA-backed support, security, and site reliability for 20–500 user teams.
            </p>

            <ul className="hero__bullets">
              <li><span aria-hidden="true">✅ </span>Proactive network & endpoint management</li>
              <li><span aria-hidden="true">✅ </span>Cloud migrations for Microsoft 365 / Google Workspace</li>
              <li><span aria-hidden="true">✅ </span>Backup & disaster recovery, documented and tested</li>
            </ul>

            <div className="hero-ctas">
              <a className="btn btn-primary btn-lg" href={CALENDLY_OR_FORM_URL} rel="noopener">Book a 15-minute Fit Call</a>
              <a className="hero-link" href={RUNBOOK_PDF_URL} rel="noopener">
                Download our Incident Response Runbook (PDF)
              </a>
            </div>

            <div className="hero-trust">
              <p className="muted hero-trust__label">Trusted by teams that value clear, modern IT</p>
              <div className="hero-logos">
                {heroLogos.map((logo) => (
                  <Link key={logo.src} to="/" aria-label="Back to home" className="hero-logo">
                    <img src={logo.src} alt={logo.alt} className="img-safe" />
                  </Link>
                ))}
              </div>
            </div>

            <CoverageLine />

            <div className="trust-row">
              <Link className="trust-chip" to="/case-studies">Case Studies</Link>
              <span className="trust-chip">Plain-English Support</span>
              <span className="trust-chip">SMB-Friendly Plans</span>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero-logo-badge">
              <img src={heroBadgeLogo} alt="Grandin Consulting emblem" className="img-safe" />
              <div>
                <p className="hero-logo-badge__eyebrow">Your Modern IT Ally</p>
                <p className="hero-logo-badge__title">Grandin Consulting</p>
              </div>
            </div>
            <div className="hero-illustration" aria-label="Core managed IT solutions">
              {heroTiles.map((tile) => (
                <HeroFlipCard key={tile.title} title={tile.title} summary={tile.summary} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CredibilityStrip />
      <CaseSnapshots />
      <ICPSections />
      <Guarantees compact />

      <PartnerStrip />
      <StatsRow />

      {/* SERVICES SECTION */}
      <section aria-labelledby="services-overview-title" className="section services-overview">
        <div className="container">
          <h2 id="services-overview-title" style={{ marginTop: 12 }}>What We Do</h2>
          <p className="muted">Right-sized IT for small and mid-sized teams—fast, secure, and documented.</p>
        </div>

        <FeatureGrid />
        <div className="service-stack-cta">
          <Link to={NAV_LINKS.serviceStack}>See the full Service Stack & SLA →</Link>
        </div>
      </section>

      <SecurityCompliance />
      <AboutWhy />
      <section className="faq-teaser" aria-labelledby="faq-teaser-title">
        <div className="container faq-teaser-card">
          <h2 id="faq-teaser-title">Need the details?</h2>
          <p>Get answers on onboarding, response times, after-hours coverage, vendors, and media workflows.</p>
          <Link className="micro-cta" to={NAV_LINKS.faq}>Browse the FAQ →</Link>
        </div>
      </section>
      <CTABand />
    </>
  );
}
