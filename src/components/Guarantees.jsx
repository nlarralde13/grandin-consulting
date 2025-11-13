import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../config/siteMeta.js";

const tiers = [
  {
    name: "Essentials",
    details: "RTO 24h / RPO 8h • Patch window monthly • Best-effort after-hours incidents",
  },
  {
    name: "Business",
    details: "RTO 8h / RPO 4h • Patch window bi-weekly • 24×7 critical incident on-call",
  },
  {
    name: "Enhanced",
    details: "RTO 4h / RPO 1h • Patch window weekly • 24×7 on-call + expedited change approvals",
  },
];

export default function Guarantees({ compact = false }) {
  const content = (
    <>
      <p>We back our work with clear service levels and change control—no surprises.</p>
      <div className="tier-grid" role="list">
        {tiers.map((tier) => (
          <article key={tier.name} className="tier-card" role="listitem" tabIndex={0}>
            <h3>{tier.name}</h3>
            <p>{tier.details}</p>
          </article>
        ))}
      </div>
      <p className="policy-line">“No-surprise invoices”—changes are scoped in writing before work begins.</p>
    </>
  );

  if (compact) {
    return (
      <section className="guarantees-teaser" aria-labelledby="guarantees-teaser-title">
        <div className="container">
          <div className="guarantees-card">
            <h2 id="guarantees-teaser-title">SLA & Guarantees</h2>
            {content}
            <Link className="micro-cta" to={NAV_LINKS.serviceStack}>
              View the full service stack →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="guarantees" aria-labelledby="guarantees-title">
      <div className="container">
        <h2 id="guarantees-title">SLA & Guarantees</h2>
        {content}
      </div>
    </section>
  );
}
