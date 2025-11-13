import React from "react";
import { SAMPLE_REPORT_URL } from "../config/siteMeta.js";

const checklist = [
  "MFA/SSO & privileged-access controls",
  "Patch windows & change management",
  "Audit logging & incident runbooks",
  "Backup validation & RTO/RPO tiers",
];

export default function SecurityCompliance() {
  return (
    <section className="security-section" aria-labelledby="security-posture-title">
      <div className="container security-inner">
        <div>
          <h2 id="security-posture-title">Security & Compliance Posture</h2>
          <p>
            We follow SOC 2-aligned practices—least privilege, MFA/SSO, change control, and audit logging—and document controls to support your audits.
          </p>
          <ul className="security-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="btn btn-outline security-link" href={SAMPLE_REPORT_URL} target="_blank" rel="noopener">
            View a sample monthly report (redacted)
          </a>
        </div>
      </div>
    </section>
  );
}
