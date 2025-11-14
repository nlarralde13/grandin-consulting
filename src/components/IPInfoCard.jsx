import React, { useEffect, useState } from "react";

const IPINFO_ENDPOINT = "https://api.ipinfo.io/lite";
const IPINFO_IP_ENDPOINT = "https://api.ipinfo.io/ip";

function extractAsnFields(payload) {
  if (!payload) return { asn: undefined, asName: undefined };

  if (payload.asn && typeof payload.asn === "object") {
    return {
      asn: payload.asn.asn,
      asName: payload.asn.name,
    };
  }

  if (typeof payload.asn === "string") {
    return { asn: payload.asn, asName: payload.as_name };
  }

  const org = payload.org;
  if (typeof org === "string") {
    const match = org.match(/^(AS\d+)\s+(.*)$/i);
    if (match) {
      return { asn: match[1], asName: match[2] || undefined };
    }
  }

  return { asn: undefined, asName: payload.as_name };
}

function formatCountry(payload) {
  if (!payload) return undefined;
  const name = payload.country_name;
  const code = payload.country_code || payload.country;

  if (name && code && name !== code) {
    return `${name} (${code})`;
  }

  return name || code;
}

function formatContinent(payload) {
  if (!payload) return undefined;
  const name = payload.continent;
  const code = payload.continent_code;

  if (name && code && name !== code) {
    return `${name} (${code})`;
  }

  return name || code;
}

export default function IPInfoCard() {
  const token = import.meta.env.VITE_IPINFO_TOKEN;
  const hasToken = Boolean(token);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(hasToken);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasToken) {
      setLoading(false);
      setData(null);
      setError("");
      return;
    }

    const controller = new AbortController();
    let canceled = false;

    async function loadIpInfo() {
      setLoading(true);
      setError("");
      try {
        const ipResponse = await fetch(`${IPINFO_IP_ENDPOINT}?token=${token}`, {
          signal: controller.signal,
        });

        if (!ipResponse.ok) {
          throw new Error(`IP lookup failed: ${ipResponse.status}`);
        }

        const rawIp = (await ipResponse.text()).trim();
        if (!rawIp) {
          throw new Error("Missing IP address");
        }

        const response = await fetch(`${IPINFO_ENDPOINT}/${encodeURIComponent(rawIp)}?token=${token}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        if (!canceled) {
          setData({
            ...payload,
            ip: payload.ip || rawIp,
          });
        }
      } catch (err) {
        if (canceled || err.name === "AbortError") return;
        setError("Could not load IP info right now.");
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadIpInfo();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [hasToken, token]);

  const { asn, asName } = extractAsnFields(data || {});
  const countryDisplay = formatCountry(data);
  const continentDisplay = formatContinent(data);

  const lines = [
    { key: "ip", label: "ip", value: data?.ip },
    { key: "asn", label: "asn", value: asn },
    { key: "as_name", label: "as_name", value: asName },
    { key: "country", label: "country", value: countryDisplay },
    { key: "continent", label: "continent", value: continentDisplay },
  ];

  if (data?.city) {
    lines.push({ key: "city", label: "city", value: data.city });
  }
  if (data?.region) {
    lines.push({ key: "region", label: "region", value: data.region });
  }

  const resolvedLines = lines.filter((line) => Boolean(line.value));
  let content = null;

  if (!hasToken) {
    content = (
      <p className="ipinfo-message" role="status">
        IP lookup is not configured.
      </p>
    );
  } else if (loading) {
    content = (
      <p className="ipinfo-message" role="status">
        Loading network snapshot...
      </p>
    );
  } else if (error) {
    content = (
      <p className="ipinfo-message" role="status">
        {error}
      </p>
    );
  } else if (resolvedLines.length > 0) {
    content = (
      <ul className="ipinfo-lines" aria-live="polite">
        {resolvedLines.map((line) => (
          <li key={line.key} className="ipinfo-line">
            <span className="ipinfo-key">{line.label}:</span>
            <span className="ipinfo-value">{line.value}</span>
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <p className="ipinfo-message" role="status">
        No IP details available.
      </p>
    );
  }

  return (
    <section className="ipinfo-card" aria-label="Visitor IP information">
      <div className="ipinfo-header">
        <p className="ipinfo-pretitle">Live IP lookup</p>
        <h3>Your Network Snapshot</h3>
      </div>
      <div className="ipinfo-body">
        {content}
        {hasToken && (
          <p className="ipinfo-meta" aria-live="off">
            Powered by ipinfo.io lite endpoint
          </p>
        )}
      </div>
    </section>
  );
}
