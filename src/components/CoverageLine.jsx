import React from "react";
import { COVERAGE_TEXT } from "../config/siteMeta.js";

export default function CoverageLine({ className }) {
  return (
    <p className={`coverage-line${className ? ` ${className}` : ""}`}>
      {COVERAGE_TEXT}
    </p>
  );
}
