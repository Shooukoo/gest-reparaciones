// Metadata separado porque dashboard/layout.tsx es "use client".
// Next.js permite esto al exportar metadata desde un archivo de servidor.
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
