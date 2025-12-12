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

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const urlParam = event.queryStringParameters?.url || "";
  if (!urlParam) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing url param" }),
    };
  }

  let target;
  try {
    target = new URL(urlParam);
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid url param" }),
    };
  }

  if (target.protocol !== "https:" && target.protocol !== "http:") {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unsupported protocol" }),
    };
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return {
      statusCode: 403,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Host not allowed" }),
    };
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1",
        "User-Agent": "grandin-consulting/1.0 (+netlify rss proxy)",
      },
    });

    if (!upstream.ok) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Upstream fetch failed", status: upstream.status }),
      };
    }

    const body = await upstream.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Proxy error" }),
    };
  }
}

