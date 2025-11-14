import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CALENDLY_OR_FORM_URL, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../config/siteMeta.js";

const LOGO_SRC = "/images/logo_white_background.png";
const NAV_ITEMS = [
  { label: "Services", to: "/#services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Industries", to: "/#industries" },
  { label: "About", to: "/#about" },
  { label: "Resources", to: "/#resources" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    return () => document.body.classList.remove("nav-open");
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Grandin Consulting home" onClick={closeMenu}>
          <img src={LOGO_SRC} alt="Grandin Consulting logo" className="brand-logo img-safe" />
          <span className="brand-name">Grandin Consulting</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((state) => !state)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav className={`main-nav${mobileOpen ? " is-open" : ""}`} aria-label="Primary navigation">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link to={item.to} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-ctas">
          <a className="btn btn-outline btn-sm" href={PHONE_NUMBER_TEL} onClick={closeMenu}>
            Call {PHONE_NUMBER_DISPLAY}
          </a>
          <Link className="btn btn-primary btn-sm" to={CALENDLY_OR_FORM_URL} onClick={closeMenu}>
            Book a Consultation
          </Link>
        </div>
      </div>
      <button
        type="button"
        className={`nav-overlay${mobileOpen ? " is-visible" : ""}`}
        aria-label="Close navigation"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  );
}
