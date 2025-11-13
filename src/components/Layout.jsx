import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import TopBar from "./TopBar.jsx";
import { ORG_SCHEMA } from "../config/siteMeta.js";

const TABS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Layout() {
  const [activeId, setActiveId] = useState("home");
  const tabRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const onTabChange = useCallback(
    (id) => {
      setActiveId(id);
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    },
    [location.pathname, navigate]
  );

  const outletContext = useMemo(
    () => ({ tabs: TABS, activeId, onTabChange, setActiveId, tabRefs }),
    [activeId, onTabChange]
  );

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

  return (
    <>
      <TopBar />
      <Header tabs={TABS} activeId={activeId} onTabChange={onTabChange} tabRefs={tabRefs} />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
}
