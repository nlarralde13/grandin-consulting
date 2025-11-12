import React from "react";

const cases = [
  {
    title: "Zero-Downtime AD → Entra ID Migration",
    subtitle: "50 users · 2 offices · 3 weeks",
    result: "Password resets down 68%, onboarding time cut in half.",
    bullets: [
      "Staged hybrid join with automated rollback gates",
      "Self-service password reset & MFA prompt flows",
      "SharePoint/OneDrive cutover with version-safe redirect"
    ],
  },
  {
    title: "SMB Network Hardening & Disaster Recovery",
    subtitle: "Retail · 4 sites · 8 months",
    result: "Ransomware risk <1% and 1-hour RTO across stores.",
    bullets: [
      "Segmented VLANs + site-to-site VPN automation",
      "Offsite backups, DR runbooks & quarterly drills",
      "Patch cadence with endpoint compliance dashboards"
    ],
  },
  {
    title: "Ground-to-Cloud Media Pipeline",
    subtitle: "Creative studio · AWS · ongoing",
    result: "Rendering costs down 32%, publish speed 4× faster.",
    bullets: [
      "S3 lifecycle management + intelligent tiering",
      "Event-driven transcoding + observability",
      "Auto-scaling render farms with guardrails"
    ],
  },
  {
    title: "High-Growth Finance Platform Enablement",
    subtitle: "FinServ · 2 products · 18 months",
    result: "Scale to 5M users with 99.99% uptime.",
    bullets: [
      "Zero-trust architecture with connector vaults",
      "Data residency compliance pipelines",
      "Ops runbooks, monitoring, and chaos testing"
    ],
  },
];

export default function CaseStudies() {
  return (
    <main className="container" style={{ paddingTop: 72 }}>
      <header className="section-header">
        <h2>Case Studies</h2>
        <p className="muted">Real outcomes from right-sized engineering.</p>
      </header>

      <div className="case-grid">
        {cases.map((c) => (
          <article key={c.title} className="case-panel">
            <header>
              <p className="muted">{c.subtitle}</p>
              <h3>{c.title}</h3>
            </header>
            <p className="case-result">
              <strong>Outcome:</strong> {c.result}
            </p>
            <ul>
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
