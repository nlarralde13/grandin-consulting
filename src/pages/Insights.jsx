import React from "react";
import { RESOURCES } from "../data/resources.js";

export default function Insights() {
  return (
    <main className="insights-page">
      <section className="insights-hero" aria-labelledby="insights-title">
        <div className="container">
          <p className="eyebrow">Blog & Whitepapers</p>
          <h1 id="insights-title">Practical guidance for modern IT leaders.</h1>
          <p className="muted">Actionable breakdowns to keep SMB environments secure, compliant, and reliable.</p>
        </div>
      </section>

      <section className="section insights-list" aria-labelledby="insights-list-title">
        <div className="container">
          <div className="section-header">
            <h2 id="insights-list-title">Latest resources</h2>
            <p>Deep dives you can hand to stakeholders when you need to justify the next move.</p>
          </div>

          <div className="insights-grid">
            {RESOURCES.map((resource) => (
              <article key={resource.id} id={resource.id} className="insight-article">
                <div className="insight-article__meta">
                  <span className="pill">{resource.type}</span>
                  <span className="pill pill-muted">{resource.readTime}</span>
                </div>

                <h3>{resource.title}</h3>

                {resource.intro.map((paragraph, idx) => (
                  <p key={`${resource.id}-intro-${idx}`}>{paragraph}</p>
                ))}

                {resource.sections.map((section, sectionIndex) => (
                  <div key={`${resource.id}-section-${sectionIndex}`} className="insight-section">
                    <h4>{section.title}</h4>
                    {section.description.map((paragraph, idx) => (
                      <p key={`${section.title}-desc-${idx}`}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <ul>
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={`${section.title}-bullet-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.closing ? <p className="muted">{section.closing}</p> : null}
                    {section.advantage ? <p className="insight-advantage">{section.advantage}</p> : null}
                  </div>
                ))}

                {resource.closing.map((paragraph, idx) => (
                  <p key={`${resource.id}-closing-${idx}`} className="insight-closing">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
