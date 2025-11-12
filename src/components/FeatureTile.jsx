import React from "react";
import { Link } from "react-router-dom";

function Icon({ name, size = 28 }) {
  const common = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "network":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5l3 3m4-3l-3 3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.97-3.05 9.27-7 10-3.95-.73-7-5.03-7-10V6l7-3z" />
          <path d="M9.5 12.5l2 2 3.5-3.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11.5 2" />
        </svg>
      );
    case "automation":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 12h6m0-6v3.5m0 6V18" />
        </svg>
      );
    case "backup":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7z" />
          <path d="M12 8v5m-2-2h4" />
        </svg>
      );
    case "web":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FeatureTile({ icon, title, lines = [], to = "/", cta = "Learn more" }) {
  return (
    <article className="feature-tile">
      <div className="feature-icon" aria-hidden="true"><Icon name={icon} /></div>
      <h3>{title}</h3>
      <ul className="feature-lines">
        {lines.map((l) => <li key={l}>{l}</li>)}
      </ul>
      <div className="feature-cta">
        <Link to={to} className="micro-cta" aria-label={`${cta}: ${title}`}>{cta} →</Link>
      </div>
    </article>
  );
}
