import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    {
      name: "rss-proxy",
      configureServer(server) {
        const allowedHosts = new Set([
          "www.microsoft.com",
          "microsoft.com",
          "www.techrepublic.com",
          "techrepublic.com",
          "www.zdnet.com",
          "zdnet.com",
          "www.cisa.gov",
          "cisa.gov",
          "www.bleepingcomputer.com",
          "bleepingcomputer.com",
        ]);

        server.middlewares.use("/api/rss", async (req, res) => {
          try {
            if (req.method && req.method.toUpperCase() !== "GET") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            const requestUrl = new URL(req.url || "", "http://localhost");
            const urlParam = requestUrl.searchParams.get("url") || "";
            if (!urlParam) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Missing url param" }));
              return;
            }

            let target;
            try {
              target = new URL(urlParam);
            } catch (err) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid url param" }));
              return;
            }

            if (target.protocol !== "https:" && target.protocol !== "http:") {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Unsupported protocol" }));
              return;
            }

            if (!allowedHosts.has(target.hostname)) {
              res.statusCode = 403;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Host not allowed" }));
              return;
            }

            const upstream = await fetch(target.toString(), {
              headers: {
                Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1",
                "User-Agent": "grandin-consulting/1.0 (+vite dev rss proxy)",
              },
            });

            if (!upstream.ok) {
              res.statusCode = 502;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Upstream fetch failed", status: upstream.status }));
              return;
            }

            const text = await upstream.text();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.setHeader("Cache-Control", "no-store");
            res.end(text);
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Proxy error" }));
          }
        });
      },
    },
  ],
});
