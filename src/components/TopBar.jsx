import React from "react";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <a href="tel:+1-555-555-1234" className="topbar__link">📞 (555) 555-1234</a>
          <span className="divider">•</span>
          <a href="mailto:info@grandinconsulting.com" className="topbar__link">✉️ info@grandinconsulting.com</a>
        </div>
      </div>
    </div>
  );
}
