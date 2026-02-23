"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard } from "lucide-react";

const NAV_LINKS = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Estado", href: "/estado" },
    { label: "Contacto", href: "#formulario" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo text */}
                    <a
                        href="/"
                        className="text-xl font-bold tracking-tight select-none"
                    >
                        <span className="text-purple-400">.</span>
                        <span className="text-white">uningenieromás</span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-zinc-400 hover:text-white font-medium transition-colors duration-200 text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Panel Admin
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-zinc-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 pt-2 flex flex-col gap-2 border-t border-white/5 mt-1">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-1.5 bg-purple-600 text-white font-semibold px-4 py-2.5 rounded-lg mt-1 text-sm"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Panel Admin
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
