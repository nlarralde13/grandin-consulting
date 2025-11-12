import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; <span>{year}</span> Grandin Consulting. All rights reserved.</p>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#panel-about" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#panel-services" onClick={(e) => e.preventDefault()}>Services</a>
          <a href="#panel-contact" onClick={(e) => e.preventDefault()}>Contact</a>
        </nav>

        <nav className="footer-nav" aria-label="Footer">
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
