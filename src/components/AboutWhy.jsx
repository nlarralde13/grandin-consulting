import React from "react";

const bullets = [
  "Boutique responsiveness; enterprise-grade rigor",
  "SLA-backed support with transparent scopes",
  "Engineers who’ve shipped real systems in the wild",
];

export default function AboutWhy() {
  return (
    <section className="about-why" aria-labelledby="about-why-title">
      <div className="container about-why__inner">
        <h2 id="about-why-title">Why Grandin</h2>
        <p>
          Grandin Consulting blends 40+ years of combined engineering experience across cloud, networking, cybersecurity, and media/streaming workflows. We operate like a boutique partner—clear scopes, predictable pricing, and SLA-backed response—so small and mid-market teams get enterprise-grade outcomes without big-agency drag.
        </p>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
