import React, { useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const { activeId, setActiveId } = useOutletContext();
  const navigate = useNavigate();

  const panels = useMemo(
    () => ({
      home: <Home />,
      services: <Services />,
      about: <About />,
      contact: <Contact onSuccess={() => navigate("/thanks")} />,
    }),
    [navigate, setActiveId]
  );

  // Move focus to the first heading when switching tabs
  useEffect(() => {
    const header = document.querySelector(
      `#panel-${activeId} h1, #panel-${activeId} h2, #panel-${activeId} h3`
    );
    if (header) {
      header.setAttribute("tabindex", "-1");
      header.focus({ preventScroll: true });
    }
  }, [activeId]);

  // Honor hash deep-links like /#services or /#services?service=cloud
  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash || "";
      if (hash.includes("services")) setActiveId("services");
      else if (hash.includes("about")) setActiveId("about");
      else if (hash.includes("contact")) setActiveId("contact");
      else if (hash.includes("home")) setActiveId("home");
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, [setActiveId]);

  return (
    <main className="container">
      <section id="panel-home" role="tabpanel" aria-labelledby="tab-home" hidden={activeId !== "home"}>
        {panels.home}
      </section>

      <section id="panel-services" role="tabpanel" aria-labelledby="tab-services" hidden={activeId !== "services"}>
        {panels.services}
      </section>

      <section id="panel-about" role="tabpanel" aria-labelledby="tab-about" hidden={activeId !== "about"}>
        {panels.about}
      </section>

      <section id="panel-contact" role="tabpanel" aria-labelledby="tab-contact" hidden={activeId !== "contact"}>
        {panels.contact}
      </section>
    </main>
  );
}
