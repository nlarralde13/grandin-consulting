import React from "react";

export default function Terms() {
  return (
    <main className="container" style={{ paddingTop: 72, maxWidth: 900 }}>
      <h2>Terms of Use</h2>
      <p className="muted">Effective: {new Date().getFullYear()}</p>

      <h3>Use of the site</h3>
      <p>Information is provided “as is.” No warranties. Don’t misuse or attempt to breach security.</p>

      <h3>Services</h3>
      <p>All services are governed by a separate written agreement.</p>

      <h3>Liability</h3>
      <p>To the extent permitted by law, we aren’t liable for indirect or incidental damages.</p>

      <h3>Contact</h3>
      <p>Questions: <a href="mailto:info@grandinconsulting.com">info@grandinconsulting.com</a>.</p>
    </main>
  );
}
