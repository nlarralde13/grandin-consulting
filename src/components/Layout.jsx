import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import NewsTicker from "./NewsTicker.jsx";
import TopBar from "./TopBar.jsx";
import { ORG_SCHEMA } from "../config/siteMeta.js";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const existing = document.getElementById("org-schema");
    if (existing) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "org-schema";
    script.textContent = JSON.stringify(ORG_SCHEMA);
    document.head.appendChild(script);
    return () => {
      if (document.getElementById("org-schema") === script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace("#", "");
    const scrollToHash = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const timer = setTimeout(scrollToHash, 50);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <TopBar />
      <NewsTicker />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
