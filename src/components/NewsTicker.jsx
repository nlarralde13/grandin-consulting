import React, { useEffect, useMemo, useState } from "react";

const FEEDS = [
  {
    name: "Microsoft 365",
    url: "https://www.microsoft.com/en-us/microsoft-365/blog/feed/",
    homepage: "https://www.microsoft.com/en-us/microsoft-365/blog/",
  },
  {
    name: "TechRepublic",
    url: "https://www.techrepublic.com/rssfeeds/articles/",
    homepage: "https://www.techrepublic.com/",
  },
  {
    name: "ZDNET",
    url: "https://www.zdnet.com/topic/business/rss.xml",
    homepage: "https://www.zdnet.com/topic/business/",
  },
  {
    name: "CISA",
    url: "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    homepage: "https://www.cisa.gov/cybersecurity-advisories",
  },
  {
    name: "BleepingComputer",
    url: "https://www.bleepingcomputer.com/feed/",
    homepage: "https://www.bleepingcomputer.com/",
  },
];

const MAX_PER_FEED = 10;

function parseAtomLink(entryEl) {
  const links = Array.from(entryEl.querySelectorAll("link"));
  const alt = links.find((linkEl) => (linkEl.getAttribute("rel") || "").toLowerCase() === "alternate");
  const firstWithHref = links.find((linkEl) => Boolean(linkEl.getAttribute("href")));
  const candidate = alt || firstWithHref || links[0];
  return candidate?.getAttribute("href")?.trim() || "";
}

function parseFeed(xmlText, sourceName) {
  if (!xmlText) return [];
  try {
    const doc = new window.DOMParser().parseFromString(xmlText, "text/xml");
    const rssItems = Array.from(doc.querySelectorAll("item")).slice(0, MAX_PER_FEED);
    if (rssItems.length) {
      return rssItems
        .map((item) => {
          const title = item.querySelector("title")?.textContent?.trim();
          const link = item.querySelector("link")?.textContent?.trim();
          if (!title || !link) return null;
          return { title, link, source: sourceName };
        })
        .filter(Boolean);
    }

    const atomEntries = Array.from(doc.querySelectorAll("entry")).slice(0, MAX_PER_FEED);
    if (atomEntries.length) {
      return atomEntries
        .map((entry) => {
          const title = entry.querySelector("title")?.textContent?.trim();
          const link = parseAtomLink(entry);
          if (!title || !link) return null;
          return { title, link, source: sourceName };
        })
        .filter(Boolean);
    }

    return [];
  } catch (err) {
    return [];
  }
}

async function fetchFeedWithFallback(url, signal) {
  const proxyUrl = `/api/rss?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl, { signal });
  if (!response.ok) {
    throw new Error(`Feed proxy request failed: ${response.status}`);
  }
  return response.text();
}

function interleaveRoundRobin(lists) {
  const maxLen = lists.reduce((max, list) => Math.max(max, list.length), 0);
  const output = [];
  for (let index = 0; index < maxLen; index += 1) {
    for (const list of lists) {
      const item = list[index];
      if (item) output.push(item);
    }
  }
  return output;
}

export default function NewsTicker() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let canceled = false;
    const controller = new AbortController();

    async function load() {
      setError("");
      try {
        if (canceled) return;
        const results = await Promise.allSettled(
          FEEDS.map(async (feed) => {
            const xmlText = await fetchFeedWithFallback(feed.url, controller.signal);
            return parseFeed(xmlText, feed.name);
          })
        );
        if (canceled) return;

        const perFeedItems = results
          .map((result) => (result.status === "fulfilled" ? result.value : []))
          .map((list) => list.slice(0, MAX_PER_FEED));

        const nextItems = interleaveRoundRobin(perFeedItems);
        if (!nextItems.length) {
          throw new Error("No headlines available.");
        }

        setItems(nextItems);
      } catch (err) {
        if (canceled || err.name === "AbortError") return;
        setError("Could not load headlines right now.");
      }
    }

    load();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, []);

  const loopItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items];
  }, [items]);

  if (error) {
    return (
      <div className="news-ticker" role="region" aria-label="News ticker">
        <div className="container news-ticker__inner">
          <span className="news-ticker__label">Latest</span>
          <span className="news-ticker__fallback">{error}</span>
          <span className="news-ticker__sources">5 sources</span>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="news-ticker" role="region" aria-label="News ticker">
        <div className="container news-ticker__inner">
          <span className="news-ticker__label">Latest</span>
          <span className="news-ticker__fallback">Loading headlines…</span>
          <span className="news-ticker__sources">5 sources</span>
        </div>
      </div>
    );
  }

  return (
    <div className="news-ticker" role="region" aria-label="Latest tech headlines">
      <div className="container news-ticker__inner">
        <span className="news-ticker__label">Latest</span>
        <div className="news-ticker__viewport" aria-live="off">
          <div className="news-ticker__track">
            {loopItems.map((item, index) => (
              <a
                key={`${item.link}-${index}`}
                className="news-ticker__item"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <span className="news-ticker__tag">{item.source}</span>
                <span className="news-ticker__text">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
        <span className="news-ticker__sources">5 sources</span>
      </div>
    </div>
  );
}
