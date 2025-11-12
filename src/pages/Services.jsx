import React, { useEffect, useMemo, useRef, useState } from "react";

const TABS = [
  { id: "managed", label: "Managed IT & Networks" },
  { id: "cloud", label: "Cloud & Hybrid" },
  { id: "apps", label: "Apps & Automation" },
  { id: "media", label: "Digital Media" },
  { id: "consulting", label: "Strategic Consulting" },
];

export default function Services() {
  const [active, setActive] = useState(TABS[0].id);
  const tabRefs = useRef({});

  // Optional: allow deep-linking like /#service=cloud
  useEffect(() => {
    const hash = new URL(window.location.href).hash;
    const match = /service=([a-z]+)/i.exec(hash);
    if (match && TABS.some(t => t.id === match[1])) setActive(match[1]);
  }, []);

  useEffect(() => {
    // keep URL hash in sync without scrolling
    const url = new URL(window.location.href);
    url.hash = `service=${active}`;
    history.replaceState(null, "", url);
  }, [active]);

  // keyboard navigation between tab buttons
  const onKeyDown = (e, index) => {
    const order = TABS.map(t => t.id);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = order[(index + 1) % order.length];
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = order[(index - 1 + order.length) % order.length];
      tabRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      tabRefs.current[order[0]]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      tabRefs.current[order[order.length - 1]]?.focus();
    }
  };

  const panels = useMemo(
    () => ({
      managed: (
        <article className="card big">
          <h3>Managed IT & Network Infrastructure</h3>
          <p>
            From office networks to full Active Directory environments, we design, deploy, and
            maintain systems that keep your team connected and productive. Our proactive monitoring
            ensures uptime and performance while we handle patching, security, and support behind
            the scenes.
          </p>
          <ul className="checklist">
            <li>Secure Wi-Fi, switching, and firewalls</li>
            <li>Active Directory &amp; identity management</li>
            <li>Endpoint management &amp; patching</li>
            <li>Backup &amp; disaster recovery planning</li>
          </ul>
        </article>
      ),
      cloud: (
        <article className="card big">
          <h3>Cloud & Hybrid Solutions</h3>
          <p>
            Whether you’re migrating from the ground up or optimizing an existing cloud footprint,
            we help you modernize operations. Expertise across Microsoft 365, Google Workspace, AWS,
            and Azure—tailored to your workflows and budget.
          </p>
          <ul className="checklist">
            <li>Ground-to-cloud migrations</li>
            <li>Hybrid architectures &amp; SSO</li>
            <li>Cost optimization &amp; governance</li>
            <li>Security hardening &amp; compliance</li>
          </ul>
        </article>
      ),
      apps: (
        <article className="card">
          <h3>App Development & Automation</h3>
          <p>
            We build scalable tools that streamline workflows, connect data sources, and eliminate
            repetitive tasks.
          </p>
          <ul className="checklist">
            <li>Lightweight web apps &amp; dashboards</li>
            <li>Integrations &amp; API workflows</li>
            <li>Automation &amp; reporting</li>
          </ul>
        </article>
      ),
      media: (
        <article className="card">
          <h3>Digital Media & Presence</h3>
          <p>
            Websites, content, and video that match the quality of your systems—built for speed,
            security, and clarity.
          </p>
          <ul className="checklist">
            <li>Modern websites &amp; hosting</li>
            <li>Content &amp; video production</li>
            <li>Brand-aligned landing pages</li>
          </ul>
        </article>
      ),
      consulting: (
        <article className="card">
          <h3>Strategic IT Consulting</h3>
          <p>
            On-demand CTO services, infrastructure audits, and roadmaps that turn tech into a growth
            engine.
          </p>
          <ul className="checklist">
            <li>IT roadmaps &amp; budgets</li>
            <li>Security reviews</li>
            <li>Vendor selection &amp; RFP support</li>
          </ul>
        </article>
      ),
    }),
    []
  );

  return (
    <>
      <header className="section-header">
        <h2>Services</h2>
        <p className="muted">
          Enterprise-grade outcomes, sized for small and mid-sized teams.
        </p>
      </header>

      {/* Sub-tabs */}
      <nav className="tabs subtabs" role="tablist" aria-label="Services">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            id={`svc-tab-${t.id}`}
            ref={(el) => (tabRefs.current[t.id] = el)}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`svc-panel-${t.id}`}
            className={active === t.id ? "is-active" : ""}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Panels */}
      <section
        id={`svc-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`svc-tab-${active}`}
        className="tabpanel"
      >
        {/* wrap in a simple container to preserve your card/grid spacing */}
        <div className="grid onecol">{panels[active]}</div>
      </section>
    </>
  );
}
