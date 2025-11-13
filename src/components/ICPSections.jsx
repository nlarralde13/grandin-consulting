import React from "react";

const icpData = [
  {
    title: "Professional Services Firms",
    pain: "Compliance pressure, identity hygiene, and predictable support.",
    deliver: "Deliver: SSO/MFA, device baselines, backup tiers, and monthly reporting.",
  },
  {
    title: "Multi-Site Retail",
    pain: "Unreliable Wi-Fi/WAN and inconsistent patching across locations.",
    deliver: "Deliver: SD-WAN/Wi-Fi redesigns, centralized updates, and site-level visibility.",
  },
  {
    title: "Media / Streaming Workflows",
    pain: "Latency, ingest fragility, and spiraling delivery costs.",
    deliver: "Deliver: SRT ingest hardening, GPU pipelines, CDN optimization, real observability.",
  },
];

export default function ICPSections() {
  return (
    <section className="icp-section" aria-labelledby="icp-section-title">
      <div className="container">
        <header className="section-header">
          <h2 id="icp-section-title">Who We Serve</h2>
          <p className="muted">Specialized playbooks for the industries we support most.</p>
        </header>

        <div className="icp-grid">
          {icpData.map((icp) => (
            <article key={icp.title} className="icp-card" tabIndex={0}>
              <h3>{icp.title}</h3>
              <p>{icp.pain}</p>
              <p className="icp-card__deliver">{icp.deliver}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
