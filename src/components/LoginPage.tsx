"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            const code = (err as { code?: string }).code;
            if (
                code === "auth/user-not-found" ||
                code === "auth/wrong-password" ||
                code === "auth/invalid-credential"
            ) {
                setError("Credenciales incorrectas. Verifica tu email y contraseña.");
            } else if (code === "auth/too-many-requests") {
                setError("Demasiados intentos. Espera unos minutos.");
            } else {
                setError("Error de autenticación. Inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12">
            {/* Grid background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative w-full max-w-sm">
                <div className="bg-zinc-900 border border-white/8 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <a
                            href="#inicio"
                            className="inline-block text-3xl font-bold tracking-tight select-none mb-2"
                        >
                            <span className="text-purple-400">.</span>
                            <span className="text-white">uningenierómás</span>
                        </a>
                        <p className="text-zinc-500 text-sm">Acceso exclusivo para el administrador</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@ejemplo.com"
                                className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-3 pr-11 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                                    aria-label="Mostrar/ocultar contraseña"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">
                                <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:text-purple-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/30 mt-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" />Verificando...</>
                            ) : (
                                "Ingresar al Panel"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-zinc-700 text-xs mt-6">
                    <a href="/" className="hover:text-zinc-400 transition-colors">
                        ← Volver al sitio
                    </a>
                </p>
            </div>
        </div>
    );
}
