"use client";

import { useAuth } from "@/context/AuthContext";
import LoginPage from "@/components/LoginPage";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();

    // 1. Mientras Firebase determina si hay sesión activa
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-sm">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    // 2. Sin sesión → mostrar login
    if (!user) {
        return <LoginPage />;
    }

    // 3. Con sesión → mostrar el dashboard
    return <>{children}</>;
}
