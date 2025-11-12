import React, { useCallback, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import TopBar from "./TopBar.jsx";

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

  return (
    <>
      <TopBar />
      <Header tabs={TABS} activeId={activeId} onTabChange={onTabChange} tabRefs={tabRefs} />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
}
