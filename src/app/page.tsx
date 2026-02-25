import type { Metadata } from "next";
import RepairForm from "@/components/RepairForm";
import PriceCatalog from "@/components/PriceCatalog";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Zap, Clock, CheckCircle2, XCircle, TrendingUp, PiggyBank, BarChart3, Wallet, Star, Package, Tag, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Un Ingeniero Más — Servicio Técnico Profesional" },
  description:
    "Servicio técnico profesional: reparación de laptops, consolas, celulares y más. Diagnóstico rápido, piezas originales y garantía. ¡Agenda tu cita hoy!",
  alternates: {
    canonical: "https://uningenieromás.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Un Ingeniero Más",
  description:
    "Servicio técnico profesional: reparación de laptops, consolas, celulares e instalación de software.",
  url: "https://uningenieromás.com",
  telephone: "+52353-000-0000",
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-19:00",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MX",
  },
  sameAs: ["https://wa.me/52353000000"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Técnicos",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mantenimiento Preventivo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mantenimiento Correctivo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reparación de Hardware" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formateo e Instalación de SO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reparación de Consola" } },
    ],
  },
};


const STATS = [
  { label: "Clientes atendidos", value: "200+" },
  { label: "Equipos reparados", value: "500+" },
  { label: "Años de experiencia", value: "5+" },
  { label: "Satisfacción", value: "99%" },
];

export default function Home() {
  return (
    <div className="pt-20 bg-zinc-950 overflow-x-hidden">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section
        id="inicio"
        className="relative flex items-center min-h-[calc(100svh-80px)] py-16 sm:py-20"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center center",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 right-0 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tag */}
            <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Servicio Técnico Disponible
            </span>

            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-tight tracking-tight mb-4">
              Un Ingeniero{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                Más
              </span>
            </h1>
            <p className="text-[clamp(1.1rem,3vw,1.875rem)] text-zinc-400 font-light mb-6">
              Para resolver lo que sea.
            </p>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Diagnóstico rápido, precios justos y soluciones reales. Hecho por
              y para estudihambres: Laptops, consolas e instalaciones. Sin
              excusas, sin letras pequeñas y sin dejarte sin comer.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#formulario"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Solicitar Servicio
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#precios"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base"
              >
                Ver Precios
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────── */}
      <section className="border-y border-white/5 bg-zinc-900/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-8 text-xs sm:text-sm font-medium text-zinc-400">
            {[
              { icon: ShieldCheck, label: "Garantía en reparaciones" },
              { icon: Zap, label: "Diagnóstico en 24h" },
              { icon: Clock, label: "Atención rápida y directa" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP CATÁLOGO / PORTFOLIO ──────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured label above card */}
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              Proyecto destacado
            </span>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-gradient-to-br from-amber-950/70 via-orange-950/40 to-zinc-950 shadow-2xl shadow-amber-900/20">
            {/* Decorative glows */}
            <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-8 w-72 h-72 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Disponible ahora
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  Apps que{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300">
                    resuelven problemas reales
                  </span>
                </h2>

                <p className="text-zinc-300 text-base sm:text-lg mb-7 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Portfolio de desarrollo de software: apps web, sistemas a medida y herramientas que usas todos los días. Mira lo que puedo construir para ti.
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                  {[
                    { icon: Package, label: "Apps web" },
                    { icon: Zap, label: "Tiempo real" },
                    { icon: BookOpen, label: "Proyectos reales" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-lg">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      {label}
                    </span>
                  ))}
                </div>

                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 text-black font-black px-7 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-amber-900/50 hover:-translate-y-1 hover:shadow-amber-800/60 text-sm sm:text-base"
                >
                  Ver portfolio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right — mock portfolio UI */}
              <div className="w-full lg:w-[420px] lg:flex-shrink-0">
                <div className="w-full bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-zinc-900">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">Portfolio — Proyectos</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded-md">4 apps</span>
                  </div>
                  {/* Project cards */}
                  <div className="px-4 py-3 flex flex-col gap-2.5">
                    {[
                      { name: "Gest. Reparaciones", desc: "Tickets en tiempo real · Firebase", tag: "Web App", tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                      { name: "Ahorros Personales", desc: "Finanzas · Gráficas · Metas", tag: "Web App", tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                      { name: "Portfolio", desc: "Este sitio · Next.js · Vercel", tag: "En vivo", tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                    ].map(({ name, desc, tag, tagColor }) => (
                      <div key={name} className="flex items-center justify-between bg-white/4 hover:bg-white/7 transition-colors border border-white/6 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Package className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white leading-none mb-0.5">{name}</p>
                            <p className="text-[10px] text-zinc-500">{desc}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${tagColor}`}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP AHORROS ─────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 via-zinc-900/80 to-zinc-950">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/8 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 sm:p-10">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" />
                  Nuevo proyecto
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
                  Controla tus{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    ahorros personales
                  </span>
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base mb-6 max-w-md mx-auto lg:mx-0">
                  Registra ingresos y gastos, visualiza tu progreso y mantén el control de tu dinero. Simple, rápido y sin complicaciones.
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-7">
                  {[
                    { icon: Wallet, label: "Ingresos & Gastos" },
                    { icon: BarChart3, label: "Gráficas" },
                    { icon: PiggyBank, label: "Metas de ahorro" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-lg">
                      <Icon className="w-3.5 h-3.5 text-emerald-400" />
                      {label}
                    </span>
                  ))}
                </div>

                <Link
                  href="/ahorros"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 text-sm"
                >
                  Abrir app
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right — mock UI preview */}
              <div className="w-full lg:w-96 lg:flex-shrink-0">
                <div className="w-full bg-zinc-900/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {/* Header bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-zinc-300">Mis Ahorros</span>
                  </div>
                  {/* Balance mock */}
                  <div className="px-4 pt-4 pb-2">
                    <p className="text-xs text-zinc-500 mb-0.5">Balance disponible</p>
                    <p className="text-2xl font-black text-white">$4,250.<span className="text-zinc-400 text-lg">00</span></p>
                  </div>
                  {/* Mini bars */}
                  <div className="px-5 pb-5 flex items-end gap-2 h-24">
                    {[30, 55, 40, 72, 50, 85, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i === 5 ? "rgb(16,185,129)" : "rgba(16,185,129,0.25)",
                        }}
                      />
                    ))}
                  </div>
                  {/* Rows */}
                  <div className="flex flex-col gap-px border-t border-white/5">
                    {[
                      { label: "Comida", amount: "-$180", color: "text-red-400" },
                      { label: "Sueldo", amount: "+$2,000", color: "text-emerald-400" },
                      { label: "Netflix", amount: "-$299", color: "text-red-400" },
                    ].map(({ label, amount, color }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
                        <span className="text-xs text-zinc-400">{label}</span>
                        <span className={`text-xs font-bold ${color}`}>{amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO DE PRECIOS ─────────────────────── */}

      <PriceCatalog />

      {/* ── FORMULARIO ─────────────────────────────── */}
      <section id="formulario" className="py-16 sm:py-24 bg-zinc-900/40">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
              Empieza hoy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Solicita tu servicio
            </h2>
            <p className="text-zinc-500 mt-2 text-sm sm:text-base">
              Llena el formulario y te contactamos en menos de 24 horas vía WhatsApp.
            </p>
          </div>
          <RepairForm />
        </div>
      </section>

      {/* ── GARANTÍAS ───────────────────────────────── */}
      <section id="garantias" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Garantías
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-black text-white mb-4">
            Tu tranquilidad,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              garantizada
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mb-10">
            Todos nuestros servicios incluyen garantía. Estas son las condiciones aplicables.
          </p>

          <ul className="flex flex-col gap-3 text-left">
            {[
              { ok: true, text: "7 días de garantía en todos los servicios realizados" },
              { ok: true, text: "Aplicable solo a problemas relacionados con el trabajo entregado" },
              { ok: true, text: "Revisión sin costo dentro del plazo de garantía" },
              { ok: false, text: "No cubre virus nuevos, daños físicos o mal uso del equipo" },
              { ok: false, text: "Garantía no aplicable si el sistema fue modificado por terceros" },
            ].map(({ ok, text }) => (
              <li
                key={text}
                className={`flex items-start gap-3 rounded-xl px-5 py-4 text-sm sm:text-base font-medium border ${ok
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-200"
                  : "bg-red-500/10 border-red-500/20 text-red-300"
                  }`}
              >
                {ok
                  ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-purple-400" />
                  : <XCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />}
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
