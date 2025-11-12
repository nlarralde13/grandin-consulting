import React from "react";

const stats = [
  { kpi: "99.9%", label: "Uptime targets", sub: "with documented runbooks" },
  { kpi: "30–60 min", label: "Response window", sub: "standard SLA options" },
  { kpi: "50+ users", label: "Migrations delivered", sub: "AD → Entra ID / M365" },
];

export default function StatsRow() {
  return (
    <section className="stats-row" aria-label="Key results">
      <div className="container stats-wrap">
        {stats.map(s => (
          <article className="stat" key={s.label}>
            <div className="kpi">{s.kpi}</div>
            <div className="label">{s.label}</div>
            <div className="sub">{s.sub}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
