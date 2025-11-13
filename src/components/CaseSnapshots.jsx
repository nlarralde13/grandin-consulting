import React from "react";

const snapshots = [
  {
    title: "Dental Group (9 Sites)",
    body: "Modernized identity + MDM baseline across all offices; stabilized Wi-Fi; simplified backups.",
    outcome: "Ticket volume dropped significantly within 90 days.",
  },
  {
    title: "Sports Streaming Workflow",
    body: "GPU-assisted transcoding, ingest hardening, and CDN tuning with real observability.",
    outcome: "Lowered delivery cost and improved viewer stability.",
  },
];

export default function CaseSnapshots() {
  return (
    <section className="case-snapshots" aria-labelledby="case-snapshots-title">
      <div className="container">
        <header className="section-header">
          <h2 id="case-snapshots-title">Case Snapshots</h2>
          <p className="muted">Results spanning healthcare offices and live media workflows.</p>
        </header>

        <div className="snapshot-grid">
          {snapshots.map((snapshot) => (
            <article key={snapshot.title} className="case-card" tabIndex={0}>
              <h3>{snapshot.title}</h3>
              <p>{snapshot.body}</p>
              <p className="case-card__outcome">{snapshot.outcome}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
