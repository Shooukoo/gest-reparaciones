"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    Menu, X, LayoutDashboard, TrendingUp, ChevronDown,
    LayoutGrid, ArrowLeftRight, Target, Calculator,
    Briefcase, Layers, Wrench, Mail,
} from "lucide-react";

const NAV_LINKS = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Precios", href: "/#precios" },
    { label: "Estado", href: "/estado" },
    { label: "Contacto", href: "/#formulario" },
];

const AHORROS_LINKS = [
    { label: "Dashboard", href: "/ahorros#dashboard", icon: LayoutGrid },
    { label: "Transacciones", href: "/ahorros#transacciones", icon: ArrowLeftRight },
    { label: "Metas", href: "/ahorros#metas", icon: Target },
    { label: "Simulador", href: "/ahorros#simulador", icon: Calculator },
];

const CATALOGO_LINKS = [
    { label: "Proyectos", href: "/catalogo#proyectos", icon: Briefcase },
    { label: "Stack", href: "/catalogo#stack", icon: Layers },
    { label: "Servicios", href: "/catalogo#servicios", icon: Wrench },
    { label: "Contacto", href: "/catalogo#contacto", icon: Mail },
];

function DropdownMenu({
    label,
    href,
    links,
    accentClass,
    icon: Icon,
    badge,
}: {
    label: string;
    href: string;
    links: { label: string; href: string; icon: React.ElementType }[];
    accentClass: string;
    icon: React.ElementType;
    badge?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`relative flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${accentClass}`}
            >
                <Icon className="w-4 h-4" />
                {label}
                {badge && (
                    <span className="ml-0.5 text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                        {badge}
                    </span>
                )}
                <ChevronDown
                    className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                    {/* Main link */}
                    <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/8"
                    >
                        Ir a {label}
                        <ChevronDown className="w-3 h-3 -rotate-90 ml-auto" />
                    </Link>
                    {/* Sub-links */}
                    {links.map(({ label: lbl, href: lhref, icon: LIcon }) => (
                        <Link
                            key={lhref}
                            href={lhref}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <LIcon className="w-3.5 h-3.5 text-zinc-600" />
                            {lbl}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileAhorros, setMobileAhorros] = useState(false);
    const [mobileCatalogo, setMobileCatalogo] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="/" className="text-xl font-bold tracking-tight select-none">
                        <span className="text-purple-400">.</span>
                        <span className="text-white">uningenieromás</span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-5">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-zinc-400 hover:text-white font-medium transition-colors duration-200 text-sm"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Ahorros dropdown */}
                        <DropdownMenu
                            label="Ahorros"
                            href="/ahorros"
                            links={AHORROS_LINKS}
                            icon={TrendingUp}
                            badge="NEW"
                            accentClass="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-400 hover:text-emerald-300"
                        />

                        {/* Catálogo dropdown */}
                        <DropdownMenu
                            label="Portfolio"
                            href="/catalogo"
                            links={CATALOGO_LINKS}
                            icon={Briefcase}
                            accentClass="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300"
                        />

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
                        className="md:hidden p-3 -mr-3 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div
                        className="md:hidden pb-4 pt-2 flex flex-col gap-1 border-t border-white/5 mt-1"
                        style={{
                            animation: "mobileMenuIn 0.18s ease-out both",
                        }}
                    >
                        <style>{`
                          @keyframes mobileMenuIn {
                            from { opacity: 0; transform: translateY(-6px); }
                            to   { opacity: 1; transform: translateY(0); }
                          }
                        `}</style>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center text-zinc-400 hover:text-white font-medium min-h-[44px] px-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Ahorros mobile accordion */}
                        <button
                            onClick={() => setMobileAhorros((o) => !o)}
                            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold px-4 py-2.5 rounded-lg mt-1 text-sm"
                        >
                            <TrendingUp className="w-4 h-4" />
                            Ahorros
                            <span className="ml-1 text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full leading-none">NEW</span>
                            <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${mobileAhorros ? "rotate-180" : ""}`} />
                        </button>
                        {mobileAhorros && (
                            <div className="flex flex-col gap-0.5 pl-4 pb-1">
                                <Link
                                    href="/ahorros"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs text-emerald-400 font-semibold px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Ir a Ahorros →
                                </Link>
                                {AHORROS_LINKS.map(({ label, href, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-zinc-600" />
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Catálogo mobile accordion */}
                        <button
                            onClick={() => setMobileCatalogo((o) => !o)}
                            className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold px-4 py-2.5 rounded-lg mt-1 text-sm"
                        >
                            <Briefcase className="w-4 h-4" />
                            Portfolio
                            <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${mobileCatalogo ? "rotate-180" : ""}`} />
                        </button>
                        {mobileCatalogo && (
                            <div className="flex flex-col gap-0.5 pl-4 pb-1">
                                <Link
                                    href="/catalogo"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs text-amber-400 font-semibold px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Ir a Portfolio →
                                </Link>
                                {CATALOGO_LINKS.map(({ label, href, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-zinc-600" />
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}

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
