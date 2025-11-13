import React from "react";
import usePageMetadata from "../hooks/usePageMetadata.js";

const faqs = [
  {
    question: "How fast do you respond?",
    answer:
      "Critical incidents: on-call 24×7 for managed clients. Standard tickets acknowledged same business day with target next-day action.",
  },
  {
    question: "What’s onboarding like?",
    answer:
      "Discovery call → environment review → agent rollout → identity baseline → backup validation → first monthly report (within 30 days).",
  },
  {
    question: "Do you support after-hours?",
    answer:
      "Yes—critical incident on-call for managed clients; scheduled changes can be performed after-hours by request.",
  },
  {
    question: "Where do you offer on-site service?",
    answer:
      "Hunterdon, Somerset, Mercer, Middlesex, and Morris (NJ). NYC & Philadelphia metro by appointment. 4-hour onsite SLA available for managed clients.",
  },
  {
    question: "Can you work with our existing vendors?",
    answer: "Absolutely. We integrate with your stack and document changes.",
  },
  {
    question: "Do you do media/streaming workflows?",
    answer: "Yes—SRT ingest hardening, GPU pipelines, CDN tuning, observability.",
  },
];

export default function FAQ() {
  usePageMetadata({
    title: "FAQ | Grandin Consulting — Managed IT & Cloud (NJ • NYC • PHL)",
    description:
      "Answers about Grandin Consulting’s onboarding, response times, after-hours support, coverage areas, vendor collaboration, and media workflows.",
  });

  return (
    <main className="container" style={{ paddingTop: 72, maxWidth: 900 }}>
      <header className="faq-header">
        <p className="muted eyebrow">FAQ</p>
        <h1>Frequently Asked Questions</h1>
      </header>

      <dl className="faq-list">
        {faqs.map((item) => (
          <div key={item.question}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
