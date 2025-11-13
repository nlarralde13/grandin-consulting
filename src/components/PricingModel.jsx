import React from "react";

const bullets = [
  "Managed support covers monitoring, patching, baseline security, and reporting.",
  "Projects (cloud migrations, Wi-Fi redesigns, SSO rollouts) are quoted with milestones and rollback plans.",
  "Hardware/software are pass-through or procured per your vendor contracts.",
];

export default function PricingModel() {
  return (
    <section className="pricing-model" aria-labelledby="pricing-model-title">
      <div className="container">
        <h2 id="pricing-model-title">Pricing Model</h2>
        <p>
          Predictable managed support (per-user/per-device) plus fixed-scope projects. No term traps; we earn renewals with performance.
        </p>
        <ul>
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
