"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function QRSection() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/upload`);
  }, []);

  if (!url) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-sm mx-auto text-center golden-border p-8 bg-divine-deep/60">
        <h3 className="font-spiritual text-divine-gold mb-2 tracking-wider">
          Quick Upload QR
        </h3>
        <p className="text-amber-200/70 text-sm mb-4">Scan to share your bhakti moments</p>
        <div className="inline-block p-4 bg-white rounded-xl">
          <QRCodeSVG value={url} size={160} level="M" />
        </div>
        <p className="text-xs text-amber-200/50 mt-4 break-all">{url}</p>
      </div>
    </section>
  );
}
