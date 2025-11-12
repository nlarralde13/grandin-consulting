import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatureGrid from "../components/FeatureGrid.jsx";
import PartnerStrip from "../components/PartnerStrip.jsx";
import StatsRow from "../components/StatsRow.jsx";
import CTABand from "../components/CTABand.jsx";

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

export default function Home({ onGetConsultation }) {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--split" aria-labelledby="home-hero-title">
        <div className="container hero__inner">
          <div className="hero__left">
            <h1 id="home-hero-title">Managed IT Solutions for Modern Business</h1>
            <p className="lead">
              We set up, secure, and support your IT so your team can focus on the work that matters.
              Networks, identity, cloud, and automation—without the jargon.
            </p>

            <ul className="hero__bullets">
              <li><span aria-hidden="true">✅ </span>Proactive network & endpoint management</li>
              <li><span aria-hidden="true">✅ </span>Cloud migrations for Microsoft 365 / Google Workspace</li>
              <li><span aria-hidden="true">✅ </span>Backup & disaster recovery, documented and tested</li>
            </ul>

            <div className="hero-ctas">
              <Link className="btn btn-primary btn-lg" to="/schedule">Schedule a Call</Link>
              <Link className="btn btn-outline btn-lg" to="/#contact" onClick={(e)=>{ e.preventDefault(); onGetConsultation?.(); }}>
                Contact Us
              </Link>
              <Link className="btn btn-outline btn-lg" to="/#services">Explore Services</Link>
            </div>

            <div className="hero-trust">
              <p className="muted hero-trust__label">Trusted by teams that value clear, modern IT</p>
              <div className="hero-logos">
                {heroLogos.map((logo) => (
                  <Link key={logo.src} to="/" aria-label="Back to home" className="hero-logo">
                    <img src={logo.src} alt={logo.alt} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="trust-row">
              <Link className="trust-chip" to="/case-studies">Case Studies</Link>
              <span className="trust-chip">Plain-English Support</span>
              <span className="trust-chip">SMB-Friendly Plans</span>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero-logo-badge">
              <img src={heroBadgeLogo} alt="Grandin Consulting emblem" />
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

      <PartnerStrip />
      <StatsRow />

      {/* SERVICES SECTION (separate from hero) */}
      <section aria-labelledby="services-overview-title" className="section services-overview">
        <div className="container">
          <h2 id="services-overview-title" style={{ marginTop: 12 }}>What We Do</h2>
          <p className="muted">Right-sized IT for small and mid-sized teams—fast, secure, and documented.</p>
        </div>

        <FeatureGrid />

        {/* Optional: keep these only if they add new info vs FeatureGrid */}
        {/* <div className="container">
          <div className="grid">
            <article className="card">
              <h3>Proactive Management</h3>
              <p>Monitoring, patching, backups, and support—so your team stays productive and protected.</p>
            </article>
            <article className="card">
              <h3>Right-Sized Cloud</h3>
              <p>Hybrid designs and migrations for Microsoft 365, Google Workspace, AWS, and Azure.</p>
            </article>
            <article className="card">
              <h3>Built to Grow</h3>
              <p>Roadmaps and advisory to align IT with your goals—no vendor lock-in, no jargon.</p>
            </article>
          </div>
        </div> */}
      </section>
      <CTABand />
    </>
  );
}
