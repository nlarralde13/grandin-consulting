import React from "react";

const partners = ["Microsoft", "AWS", "Cisco/Meraki", "Ubiquiti", "CrowdStrike", "SentinelOne"];

export default function CredibilityStrip() {
  return (
    <section className="cred-strip" aria-label="Experience and partners">
      <div className="container cred-strip__inner">
        <div>
          <p className="cred-strip__headline"><strong>40+ years of combined engineering experience</strong></p>
          <p className="cred-strip__sub">Cloud • Networking • Cybersecurity • Media/Streaming Workflows</p>
        </div>
        <div className="cred-strip__partners" role="list">
          {partners.map((partner) => (
            <span className="cred-strip__pill" role="listitem" key={partner} aria-label={`Partner: ${partner}`}>
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
