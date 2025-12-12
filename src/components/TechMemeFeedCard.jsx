import React, { useEffect, useState } from "react";

const FEED_URL = "https://www.techmeme.com/feed.xml";
const FEED_PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED_URL)}`;

function parseFeed(xmlText) {
  if (!xmlText) return [];
  try {
    const doc = new window.DOMParser().parseFromString(xmlText, "text/xml");
    return Array.from(doc.querySelectorAll("item"))
      .slice(0, 3)
      .map((item) => {
        const title = item.querySelector("title")?.textContent?.trim();
        const link = item.querySelector("link")?.textContent?.trim();
        const pubDate = item.querySelector("pubDate")?.textContent?.trim();
        const source = item.querySelector("source")?.textContent?.trim();
        if (!title || !link) return null;
        return { title, link, pubDate, source };
      })
      .filter(Boolean);
  } catch (err) {
    return [];
  }
}

function formatDate(pubDate) {
  if (!pubDate) return "";
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function resolveSource(link, source) {
  if (source) return source;
  try {
    const url = new URL(link);
    return url.hostname.replace(/^www\./, "");
  } catch (err) {
    return "Techmeme";
  }
}

async function fetchFeed(signal) {
  const response = await fetch(FEED_URL, { signal });
  if (!response.ok) {
    throw new Error(`Feed request failed: ${response.status}`);
  }
  return response.text();
}

async function fetchFeedWithFallback(signal) {
  try {
    return await fetchFeed(signal);
  } catch (err) {
    const response = await fetch(FEED_PROXY_URL, { signal });
    if (!response.ok) {
      throw err;
    }
    return response.text();
  }
}

export default function TechMemeFeedCard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let canceled = false;
    const controller = new AbortController();

    async function loadFeed() {
      setLoading(true);
      setError("");
      try {
        const xmlText = await fetchFeedWithFallback(controller.signal);
        if (canceled) return;

        const parsed = parseFeed(xmlText);
        if (!parsed.length) {
          throw new Error("No articles available right now.");
        }
        setArticles(parsed);
      } catch (err) {
        if (canceled || err.name === "AbortError") return;
        setError("Could not load Techmeme headlines.");
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadFeed();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, []);

  let content = (
    <p className="rss-message" role="status">
      Loading Techmeme headlines...
    </p>
  );

  if (error) {
    content = (
      <p className="rss-message" role="status">
        {error}
      </p>
    );
  } else if (!loading) {
    content = (
      <ul className="rss-list" aria-live="polite">
        {articles.map((article, index) => {
          const displayDate = formatDate(article.pubDate);
          const source = resolveSource(article.link, article.source);
          return (
            <li key={`${article.link}-${index}`} className="rss-item">
              <a className="rss-link" href={article.link} target="_blank" rel="noreferrer">
                <span className="rss-title">{article.title}</span>
                <span className="rss-meta">
                  {source}
                  {displayDate ? ` • ${displayDate}` : ""}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="rss-card" aria-label="Techmeme RSS feed">
      <div className="rss-header">
        <p className="rss-pretitle">Tech news</p>
        <h3>Live from Techmeme</h3>
        <p className="rss-subhead">Top 3 headlines updated from the Techmeme feed.</p>
      </div>
      <div className="rss-body">
        {content}
        <div className="rss-footer">
          <a className="rss-footer-link" href="https://www.techmeme.com" target="_blank" rel="noreferrer">
            Open full feed
          </a>
          <span aria-hidden="true">•</span>
          <a className="rss-footer-link" href={FEED_URL} target="_blank" rel="noreferrer">
            RSS source
          </a>
        </div>
      </div>
    </section>
  );
}
