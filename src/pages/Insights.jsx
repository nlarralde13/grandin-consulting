import React from "react";

const posts = [
  {
    title: "AD vs. Entra ID: What Changes for Small Teams?",
    excerpt: "Identity moved to the cloud—here’s what stays the same (and what gets easier).",
  },
  {
    title: "VPNs in Plain English (for Remote & Hybrid Work)",
    excerpt: "Site-to-site, remote access, and zero-trust: which model fits your org?",
  },
  {
    title: "Backups vs. Disaster Recovery: A Practical Difference",
    excerpt: "Backups save data. DR saves your business. Here’s how to design both.",
  },
];

export default function Insights() {
  return (
    <main className="container" style={{ paddingTop: 72 }}>
      <header className="section-header">
        <h2>Insights</h2>
        <p className="muted">Short, practical explainers you can act on.</p>
      </header>

      <div className="grid">
        {posts.map((p) => (
          <article key={p.title} className="card">
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <p className="muted xs">3 min read</p>
          </article>
        ))}
      </div>
    </main>
  );
}
