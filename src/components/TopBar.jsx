import React from "react";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../config/siteMeta.js";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <a href={PHONE_NUMBER_TEL} className="topbar__link">📞 {PHONE_NUMBER_DISPLAY}</a>
          <span className="divider">•</span>
          <a href="mailto:info@grandinconsulting.com" className="topbar__link">✉️ info@grandinconsulting.com</a>
        </div>
      </div>
    </div>
  );
}
