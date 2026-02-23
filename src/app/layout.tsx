import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const outfitFont = localFont({
  src: "../fonts/OutfitThin-ExtraBold.woff2",
  variable: "--font-outfit",
  display: "swap",
});

const BASE_URL = "https://uningenieromás.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Un Ingeniero Más — Servicio Técnico Profesional",
    template: "%s | Un Ingeniero Más",
  },
  description:
    "Reparación de laptops, consolas, celulares e instalación de software en Guatemala. Diagnóstico rápido, piezas originales y garantía en cada servicio.",
  keywords: [
    "reparación laptops",
    "servicio técnico",
    "reparación consolas",
    "formateo PC",
    "instalación software",
    "mantenimiento computadoras",
    "reparación celulares",
    "servicio técnico Guatemala",
  ],
  authors: [{ name: "Un Ingeniero Más" }],
  creator: "Un Ingeniero Más",
  publisher: "Un Ingeniero Más",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: BASE_URL,
    siteName: "Un Ingeniero Más",
    title: "Un Ingeniero Más — Servicio Técnico Profesional",
    description:
      "Reparación de laptops, consolas, celulares e instalación de software. Diagnóstico rápido y soluciones reales.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Un Ingeniero Más — Servicio Técnico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Un Ingeniero Más — Servicio Técnico Profesional",
    description:
      "Reparación de laptops, consolas, celulares e instalación de software. Diagnóstico rápido.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfitFont.className} bg-zinc-950 text-gray-100 antialiased`}>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#18181b",
                color: "#f4f4f5",
                borderRadius: "0.75rem",
                border: "1px solid rgba(168,85,247,0.3)",
              },
            }}
          />
          <Navbar />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
