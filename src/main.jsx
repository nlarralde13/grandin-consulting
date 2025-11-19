import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import FAQ from "./pages/FAQ.jsx";
import Insights from "./pages/Insights.jsx";
import Privacy from "./pages/Privacy.jsx";
import Schedule from "./pages/Schedule.jsx";
import ServiceStack from "./pages/ServiceStack.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Terms from "./pages/Terms.jsx";
import Thanks from "./pages/Thanks.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "thanks", element: <Thanks /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "service-stack", element: <ServiceStack /> },
      { path: "faq", element: <FAQ /> },
      { path: "schedule", element: <Schedule /> },
      { path: "insights", element: <Insights /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <App /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
