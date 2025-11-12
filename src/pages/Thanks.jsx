import React from "react";
import { Link } from "react-router-dom";

export default function Thanks() {
  return (
    <main className="container" style={{ paddingTop: 72 }}>
      <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1>Thanks! We’ve got your message.</h1>
        <p className="muted">
          We’ll reply shortly. If it’s urgent, email{" "}
          <a href="mailto:info@grandinconsulting.com">hello@grandinconsulting.com</a>.
        </p>
        <p><Link className="btn" to="/">Back to Home</Link></p>
      </div>
    </main>
  );
}
