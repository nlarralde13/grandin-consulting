import React from "react";

export default function Privacy() {
  return (
    <main className="container" style={{ paddingTop: 72, maxWidth: 900 }}>
      <h2>Privacy Notice</h2>
      <p className="muted">Effective: {new Date().getFullYear()}</p>

      <h3>What we collect</h3>
      <p>Contact details you submit (name, email, company) and basic site analytics.</p>

      <h3>How we use it</h3>
      <p>To respond to inquiries, schedule calls, and improve the site.</p>

      <h3>Sharing</h3>
      <p>We don’t sell personal data. We use standard processors (email, scheduling).</p>

      <h3>Security</h3>
      <p>We apply reasonable technical and organizational measures appropriate for SMBs.</p>

      <h3>Your choices</h3>
      <p>Contact <a href="mailto:privacy@grandinconsulting.com">privacy@grandinconsulting.com</a> for access or deletion.</p>
    </main>
  );
}
