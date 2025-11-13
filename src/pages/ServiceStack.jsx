import React from "react";
import Guarantees from "../components/Guarantees.jsx";
import PricingModel from "../components/PricingModel.jsx";
import SecurityCompliance from "../components/SecurityCompliance.jsx";
import usePageMetadata from "../hooks/usePageMetadata.js";

const agentStack = [
  "RMM (monitoring/patching)",
  "EDR (threat detection)",
  "MDM (device baselines)",
  "Identity (SSO/MFA)",
  "Backup (endpoint/server/cloud)",
  "Observability (logs/metrics)",
];

const cadence = [
  { title: "Patching & Updates", detail: "weekly criticals, monthly rollups, emergency out-of-band when needed" },
  { title: "Change Management", detail: "ticketed, scheduled windows, documented rollbacks" },
  { title: "Identity & Access", detail: "least privilege, MFA enforced, quarterly access review" },
  { title: "Reporting", detail: "monthly summary (tickets, changes, patch status, backup checks)" },
];

const deliverables = [
  "Proactive monitoring & updates",
  "Backup validation",
  "Security posture review",
  "Ticket/report summary",
  "Roadmap notes (next 90 days)",
];

export default function ServiceStack() {
  usePageMetadata({
    title: "Service Stack & SLA | Grandin Consulting (Central NJ • NYC • Philadelphia)",
    description: "See how Grandin Consulting runs managed IT & cloud operations: tool stack, cadence, deliverables, SLAs, and pricing approach.",
  });

  return (
    <main className="container" style={{ paddingTop: 72, maxWidth: 960 }}>
      <header className="service-stack-header">
        <p className="muted eyebrow">Service Stack</p>
        <h1>How We Run Your IT</h1>
        <p className="lead">Our toolchain, cadence, and deliverables—so you always know what’s happening.</p>
      </header>

      <section aria-labelledby="agent-stack-title">
        <h2 id="agent-stack-title">Agent Stack</h2>
        <ul>
          {agentStack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="operational-cadence-title">
        <h2 id="operational-cadence-title">Operational Cadence</h2>
        <dl className="op-cadence">
          {cadence.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="deliverables-title">
        <h2 id="deliverables-title">What You Receive Monthly</h2>
        <ul className="deliverables-list">
          {deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Guarantees />
      <PricingModel />
      <SecurityCompliance />
    </main>
  );
}
