import React from "react";
import FeatureTile from "./FeatureTile.jsx";

export default function FeatureGrid() {
  return (
    <section className="feature-grid-wrap">
      <div className="container">
        <header className="section-header">
          <h2>What We Do</h2>
          <p className="muted">Right-sized IT for small and mid-sized teams—fast, secure, and documented.</p>
        </header>

        <div className="feature-grid">
          <FeatureTile
            icon="network"
            title="Managed IT & Networks"
            lines={["Wi-Fi, switching, firewalls", "Endpoint patching", "Identity & access"]}
            to="/#services?service=managed"
          />
          <FeatureTile
            icon="cloud"
            title="Cloud & Hybrid"
            lines={["Microsoft 365 / Google", "AWS & Azure basics", "SSO & cost control"]}
            to="/#services?service=cloud"
          />
          <FeatureTile
            icon="automation"
            title="Apps & Automation"
            lines={["Dashboards & portals", "Integrations & APIs", "Workflow automation"]}
            to="/#services?service=apps"
          />
          <FeatureTile
            icon="web"
            title="Web & Digital Media"
            lines={["Modern sites", "Landing pages", "Video workflows"]}
            to="/#services?service=media"
          />
          <FeatureTile
            icon="shield"
            title="Security & Compliance"
            lines={["Hardening reviews", "MFA everywhere", "Policies & training"]}
            to="/#services?service=consulting"
          />
          <FeatureTile
            icon="backup"
            title="Backup & DR"
            lines={["Offsite backups", "Recovery runbooks", "Tabletop tests"]}
            to="/#services?service=managed"
          />
        </div>
      </div>
    </section>
  );
}
