import http from "node:http";

const PORT = Number(process.env.RSS_PROXY_PORT || 8787);
const HOST = process.env.RSS_PROXY_HOST || "127.0.0.1";

const ALLOWED_HOSTS = new Set([
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

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      sendJson(res, 400, { error: "Missing url" });
      return;
    }

    const requestUrl = new URL(req.url, `http://${HOST}:${PORT}`);
    if (requestUrl.pathname !== "/api/rss") {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    if ((req.method || "GET").toUpperCase() !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const urlParam = requestUrl.searchParams.get("url") || "";
    if (!urlParam) {
      sendJson(res, 400, { error: "Missing url param" });
      return;
    }

    let target;
    try {
      target = new URL(urlParam);
    } catch (err) {
      sendJson(res, 400, { error: "Invalid url param" });
      return;
    }

    if (target.protocol !== "https:" && target.protocol !== "http:") {
      sendJson(res, 400, { error: "Unsupported protocol" });
      return;
    }

    if (!ALLOWED_HOSTS.has(target.hostname)) {
      sendJson(res, 403, { error: "Host not allowed" });
      return;
    }

    const upstream = await fetch(target.toString(), {
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1",
        "User-Agent": "grandin-consulting/1.0 (+rss proxy)",
      },
    });

    if (!upstream.ok) {
      sendJson(res, 502, { error: "Upstream fetch failed", status: upstream.status });
      return;
    }

    const body = await upstream.text();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.end(body);
  } catch (err) {
    sendJson(res, 500, { error: "Proxy error" });
  }
});

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`RSS proxy listening on http://${HOST}:${PORT}/api/rss`);
});

