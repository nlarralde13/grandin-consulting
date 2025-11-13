import React from "react";

const partnerFiles = [
  ["microsoft", "Microsoft"],
  ["azure", "Azure"],
  ["aws", "Amazon Web Services"],
  ["google-workspace", "Google Workspace"],
  ["fortinet", "Fortinet"],
];

export default function PartnerStrip() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const logos = partnerFiles.map(([file, label]) => ({
    src: `${baseUrl}partners/${file}.png`,
    alt: label,
  }));

  return (
    <section className="partner-strip" aria-label="Partner and platform expertise">
      <div className="container">
        <p className="partner-eyebrow">Trusted tools & platforms we work with</p>
        <div className="partner-rail">
          {logos.map((logo) => (
            <div className="partner-item" key={logo.alt}>
              <img className="partner-logo img-safe" src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
