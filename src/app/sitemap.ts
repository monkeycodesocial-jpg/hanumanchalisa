import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.URL || process.env.DEPLOY_URL || "https://example.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/upload`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];
}
