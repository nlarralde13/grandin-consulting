import { useEffect, useRef } from "react";

export default function usePageMetadata({ title, description }) {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta && description) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    if (meta && description) {
      meta.setAttribute("content", description);
    }

    return () => {
      if (title) document.title = previousTitle.current;
    };
  }, [title, description]);
}
