"use client";

import { useEffect, useState } from "react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export default function ShareButtons({
  url,
  title = "विश्वव्यापी श्री हनुमान चालीसा महाअभियान",
}: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url) {
      setShareUrl(window.location.origin);
    }
  }, [url]);

  const encoded = encodeURIComponent(shareUrl);
  const text = encodeURIComponent(`${title} — Join the global bhakti movement!`);

  const links = [
    {
      label: "WhatsApp",
      href: shareUrl
        ? `https://wa.me/?text=${text}%20${encoded}`
        : "#",
      icon: "💬",
      color: "from-green-700 to-green-600",
    },
    {
      label: "Facebook",
      href: shareUrl
        ? `https://www.facebook.com/sharer/sharer.php?u=${encoded}`
        : "#",
      icon: "📘",
      color: "from-blue-800 to-blue-700",
    },
    {
      label: "Twitter",
      href: shareUrl
        ? `https://twitter.com/intent/tweet?text=${text}&url=${encoded}`
        : "#",
      icon: "🐦",
      color: "from-sky-700 to-sky-600",
    },
  ];

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${l.color} text-white text-sm hover:scale-105 transition-transform ${!shareUrl ? "pointer-events-none opacity-60" : ""}`}
        >
          <span>{l.icon}</span>
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        disabled={!shareUrl}
        className="flex items-center gap-2 px-4 py-2 rounded-full golden-border text-divine-gold text-sm hover:bg-divine-gold/10 disabled:opacity-60"
      >
        📋 Copy Link
      </button>
    </div>
  );
}
