import React from "react";

const TEAM = [
  {
    name: "Matthew Spidella",
    role: "Founder and President",
    bio: "Guides infrastructure strategy across cloud, networking, and security while acting as the steady partner for business leaders.",
    photo: "https://placehold.co/160x160?text=MS",
  },
  {
    name: "Nicholas Larralde",
    role: "Senior Partner and Lead Engineer",
    bio: "Keeps environments patched, protected, and documented so day-to-day operations stay calm and predictable.",
    photo: "https://placehold.co/160x160?text=NL",
  },
  {
    name: "Placeholder McPerson",
    role: "Mobile Support Specialist",
    bio: "Translates goals into clear roadmaps, coordinating onboarding, runbooks, and communication with every stakeholder.",
    photo: "https://placehold.co/160x160?text=PM",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="section about-summary">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">About us</p>
            <h1>About Grandin Consulting</h1>
            <p>
              Grandin Consulting is a senior-level IT team for organizations that can{"'"}t afford downtime. With more than forty years
              of combined experience across desktop support, enterprise networks, cloud platforms, and hybrid media infrastructure, we design
              and support systems that just work.
            </p>
            <p>
              We bring enterprise-grade discipline to small and midsize businesses, delivering clear communication, predictable results,
              and technology that quietly does its job while your team does theirs.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Meet the team</p>
            <h2>The people keeping your IT steady</h2>
            <p>
              We blend deep technical experience with practical communication, making it easy for growing organizations to lean on us as
              their on-call technology department.
            </p>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <article key={member.name} className="team-card">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <h3>{member.name}</h3>
                <p className="muted">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
