import React from "react";
import FeatureTile from "./FeatureTile.jsx";

const services = [
  {
    icon: "network",
    title: "Managed IT",
    lines: ["Endpoint care", "Identity & access", "User support desk"],
    outcome: "Reduce downtime, harden endpoints and identity, and keep systems current with predictable monthly support.",
    to: "/#services?service=managed",
  },
  {
    icon: "cloud",
    title: "Cloud Solutions",
    lines: ["Microsoft 365 / Google", "AWS & Azure foundations", "SSO + cost control"],
    outcome: "Migrate and modernize with resilient, right-sized cloud workloads that simplify operations and audits.",
    to: "/#services?service=cloud",
  },
  {
    icon: "shield",
    title: "Network & Security",
    lines: ["SD-WAN & Wi-Fi tuning", "Zero-trust rollouts", "Policy & monitoring"],
    outcome: "Stabilize Wi-Fi and WAN, enforce MFA/SSO and least-privilege access, and improve incident readiness.",
    to: "/#services?service=security",
  },
  {
    icon: "automation",
    title: "Projects & Migrations",
    lines: ["Staged deployments", "Automation & integrations", "Cross-team coordination"],
    outcome: "Plan, stage, and execute upgrades with clear scope, rollback paths, and minimal disruption.",
    to: "/#services?service=projects",
  },
  {
    icon: "web",
    title: "Media/Streaming Workflows",
    lines: ["Low-latency ingest", "GPU pipelines", "CDN-ready delivery"],
    outcome: "Build low-latency ingest, GPU-accelerated processing, and CDN-efficient delivery with real observability.",
    to: "/#services?service=media",
  },
];

export default function FeatureGrid() {
  return (
    <section className="feature-grid-wrap">
      <div className="container">
        <header className="section-header">
          <h2>What We Do</h2>
          <p className="muted">Right-sized IT for small and mid-sized teams—fast, secure, and documented.</p>
        </header>

        <div className="feature-grid">
          {services.map((service) => (
            <FeatureTile key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
