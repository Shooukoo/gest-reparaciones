import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://uningenieromás.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/estado"],
        disallow: ["/dashboard", "/dashboard/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
