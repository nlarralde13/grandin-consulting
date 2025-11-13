import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CALENDLY_OR_FORM_URL, NAV_LINKS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../config/siteMeta.js";

const LOGO_SRC = "/images/logo_white_background.png";

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
          <img src={LOGO_SRC} alt="Grandin Consulting logo" className="brand-logo img-safe" />
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

        <nav className="header-links" aria-label="Secondary">
          <Link to={NAV_LINKS.serviceStack}>Service Stack</Link>
          <Link to={NAV_LINKS.faq}>FAQ</Link>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={PHONE_NUMBER_TEL} aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}>
            {PHONE_NUMBER_DISPLAY}
          </a>
          <a
            className="header-emergency"
            href={PHONE_NUMBER_TEL}
            aria-label={`Emergency support — call ${PHONE_NUMBER_DISPLAY}`}
          >
            Emergency support
          </a>
          <a className="btn btn-primary btn-lg" href={CALENDLY_OR_FORM_URL} rel="noopener">
            Book a 15-minute Fit Call
          </a>
        </div>
      </div>
    </header>
  );
}
