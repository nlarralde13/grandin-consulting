import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="topbar" role="region" aria-label="Regional services announcement">
      <div className="container topbar__inner">
        <p className="topbar__text">
          Serving small & mid-sized businesses throughout New Jersey, NYC, and Philadelphia.
          <Link className="topbar__action" to="/#services">
            Learn more ->
          </Link>
        </p>
      </div>
    </div>
  );
}
