import React from "react";

export default function About() {
  return (
    <>
      <header className="section-header">
        <h2>About</h2>
      </header>
      <div className="about">
        <p>
          Grandin Consulting was founded to bring enterprise-level IT discipline to small and mid-sized businesses—without the overhead or the jargon.
          We pair hands-on engineering with clear strategy, so your technology is dependable today and adaptable tomorrow.
        </p>
        <div className="pillbar">
          <span className="pill">Networks & Identity</span>
          <span className="pill">Cloud & Hybrid</span>
          <span className="pill">Security</span>
          <span className="pill">Automation</span>
          <span className="pill">Web & Media</span>
        </div>
      </div>
    </>
  );
}
