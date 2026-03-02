import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath ensures all assets (_next/static, images, etc.) are prefixed
  // with /reparaciones so Vercel's rewrite proxy (/reparaciones → this app)
  // can find them correctly on the main domain.
  basePath: "/reparaciones",

  // Prevents Next.js from issuing 308 redirects to normalize trailing slashes.
  // Without this, the Vercel proxy catches the redirect and re-proxies it
  // creating an infinite redirect loop (ERR_TOO_MANY_REDIRECTS).
  trailingSlash: true,

  // The Next.js image optimizer doesn't support SVG files — it returns an
  // error for them. Setting unoptimized:true makes <Image> serve the file
  // directly from /public (with the basePath prefix applied).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
