import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LOGO_SRC = "/images/logo_transparent.png";

export default function Header({ tabs, activeId, onTabChange, tabRefs }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (!tabRefs.current) tabRefs.current = {};
  }, []);

  const onKeyDown = (e, index) => {
    const order = tabs.map((t) => t.id);
    if (e.key === "ArrowRight") { e.preventDefault(); tabRefs.current[order[(index + 1) % order.length]]?.focus(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); tabRefs.current[order[(index - 1 + order.length) % order.length]]?.focus(); }
    if (e.key === "Home")       { e.preventDefault(); tabRefs.current[order[0]]?.focus(); }
    if (e.key === "End")        { e.preventDefault(); tabRefs.current[order[order.length - 1]]?.focus(); }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Grandin Consulting home">
          <img src={LOGO_SRC} alt="Grandin Consulting logo" className="brand-logo" />
          <span className="brand-name">Grandin Consulting</span>
        </Link>

        <nav className="tabs" role="tablist" aria-label="Primary" ref={listRef}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              ref={(el) => (tabRefs.current[t.id] = el)}
              role="tab"
              aria-selected={activeId === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => onTabChange(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
