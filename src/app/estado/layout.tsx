import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Estado de Reparación",
    description:
        "Consulta el estado de tu reparación ingresando tu código de ticket. Sigue en tiempo real el progreso de tu equipo.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://uningenieromás.com/estado",
    },
};

export default function EstadoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
