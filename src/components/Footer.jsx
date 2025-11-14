import React from "react";
import { Link } from "react-router-dom";
import CoverageLine from "./CoverageLine.jsx";
import { RUNBOOK_PDF_URL, SAMPLE_REPORT_URL } from "../config/siteMeta.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; <span>{year}</span> Grandin Consulting. All rights reserved.</p>

        <nav className="footer-nav" aria-label="Footer">
          <Link to="/#about">About</Link>
          <Link to="/#services">Services</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <nav className="footer-nav" aria-label="Footer">
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/service-stack">Service Stack</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <div className="footer-resources">
          <a className="footer-runbook" href={RUNBOOK_PDF_URL} rel="noopener">
          Download our Incident Response Runbook (PDF)
          </a>
          <a className="footer-runbook" href={SAMPLE_REPORT_URL} rel="noopener" target="_blank">
            Sample Monthly Report (redacted)
          </a>
        </div>

        <CoverageLine className="footer-coverage" />
      </div>
    </footer>
  );
}
