"use client";

import { useState } from "react";
import { Monitor, Smartphone, Sparkles, Tag, GraduationCap, ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";

/* ── Types ── */
interface ServiceItem {
    name: string;
    price: number | "GRATIS";
}

interface ServiceGroup {
    title: string;
    items: ServiceItem[];
}

interface PromoItem {
    title: string;
    includes: string[];
    price: number;
}

/* ── Data (precios base ya con +$100) ── */
const COMPUTO: ServiceGroup[] = [
    {
        title: "Mantenimiento y Optimización",
        items: [
            { name: "Limpieza física interna y externa", price: 250 },
            { name: "Limpieza de virus, malware y programas no deseados", price: 300 },
            { name: "Actualización de drivers y sistema operativo", price: 250 },
            { name: "Formateo e instalación limpia de Windows/Linux", price: 250 },
        ],
    },
    {
        title: "Instalación de Software",
        items: [
            { name: "Instalación de Microsoft Office", price: 300 },
            { name: "Instalación de programas básicos (navegadores, PDF, antivirus, etc.)", price: 200 },
            { name: "Instalación de software especializado (previa consulta)", price: 250 },
        ],
    },
    {
        title: "Respaldo y Recuperación de Datos",
        items: [
            { name: "Respaldo de información (archivos, fotos, documentos importantes)", price: 300 },
            { name: "Recuperación de datos borrados accidentalmente (según el caso)", price: 400 },
            { name: "Transferencia de datos entre equipos", price: 250 },
        ],
    },
];

const EXTRAS: ServiceItem[] = [
    { name: "Armado de computadoras a la medida", price: 450 },
    { name: "Asesoría en compra de equipos o componentes", price: "GRATIS" },
    { name: "Actualización de hardware (más memoria RAM, disco SSD, etc.)", price: 250 },
    { name: "Instalación de sistemas duales (Windows + Linux)", price: 300 },
];

const TELEFONOS: ServiceItem[] = [
    { name: "Limpieza y mantenimiento", price: 200 },
    { name: "Formateo completo de celular (restablecimiento de fábrica)", price: 200 },
    { name: "Eliminación de cuenta Google/KNOX", price: 300 },
    { name: "Creación de cuenta Google", price: "GRATIS" },
];

const CONSOLAS: ServiceItem[] = [
    { name: "Mantenimiento y Limpieza", price: 350 },
    { name: "Actualización de Hardware", price: 350 },
];

const PROMOS: PromoItem[] = [
    {
        title: "Mantenimiento Completo + Office",
        includes: [
            "Limpieza interna/externa del equipo",
            "Eliminación de virus y optimización del sistema",
            "Instalación de Microsoft Office (Word, Excel, PowerPoint)",
        ],
        price: 330,
    },
    {
        title: "Formateo + Programas Básicos",
        includes: [
            "Formateo completo del equipo",
            "Instalación de Windows y drivers",
            "Office, navegador, lector PDF, antivirus básico",
        ],
        price: 350,
    },
    {
        title: "Cambio a Disco SSD + Aceleración Total",
        includes: [
            "Instalación de disco sólido SSD (consulta capacidad)",
            "Clonación o instalación limpia de Windows",
            "Optimización de arranque y rendimiento",
            "Instalación de Office y programas esenciales",
        ],
        price: 400,
    },
];

const DISCOUNT = 150;

/* ── Helpers ── */
function formatPrice(price: number | "GRATIS", student: boolean): string {
    if (price === "GRATIS") return "GRATIS";
    const final = student ? price - DISCOUNT : price;
    return `$${final}`;
}

/* ── Sub-components ── */
function SectionHeader({
    icon: Icon,
    title,
    subtitle,
}: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-500/15 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    {subtitle}
                </p>
                <h3 className="text-lg font-extrabold text-white leading-tight">{title}</h3>
            </div>
        </div>
    );
}

function PriceTag({
    price,
    student,
}: {
    price: number | "GRATIS";
    student: boolean;
}) {
    const isFree = price === "GRATIS";
    const hasDiscount = !isFree && student;

    return (
        <span className="flex-shrink-0 flex flex-col items-end gap-0.5">
            {hasDiscount && (
                <span className="text-xs text-zinc-600 line-through tabular-nums">
                    ${price as number}
                </span>
            )}
            <span
                className={`text-sm font-black tabular-nums ${isFree
                    ? "text-emerald-400"
                    : hasDiscount
                        ? "text-amber-400"
                        : "text-purple-300"
                    }`}
            >
                {formatPrice(price, student)}
            </span>
        </span>
    );
}

function GroupBlock({
    group,
    student,
}: {
    group: ServiceGroup;
    student: boolean;
}) {
    return (
        <div className="mb-5 last:mb-0">
            <p className="text-xs font-bold text-purple-400/80 uppercase tracking-widest border-b border-white/6 pb-1.5 mb-3">
                {group.title}
            </p>
            <ul className="space-y-2">
                {group.items.map((item) => (
                    <li key={item.name} className="flex items-start justify-between gap-3">
                        <span className="text-zinc-300 text-sm leading-snug">{item.name}</span>
                        <PriceTag price={item.price} student={student} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SimpleList({
    items,
    student,
}: {
    items: ServiceItem[];
    student: boolean;
}) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-3">
                    <span className="text-zinc-300 text-sm leading-snug">{item.name}</span>
                    <PriceTag price={item.price} student={student} />
                </li>
            ))}
        </ul>
    );
}

function PromoCard({
    promo,
    student,
}: {
    promo: PromoItem;
    student: boolean;
}) {
    const finalPrice = student ? promo.price - DISCOUNT : promo.price;

    return (
        <div className="bg-zinc-950/60 border border-purple-500/20 rounded-xl p-4 flex flex-col gap-3 hover:border-purple-500/40 transition-colors duration-200">
            <p className="text-sm font-bold text-purple-300 border-b border-purple-500/20 pb-2">
                {promo.title}
            </p>
            <ul className="space-y-1.5 flex-1">
                {promo.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-xs text-zinc-400 leading-snug">
                        <span className="text-purple-500 mt-0.5 flex-shrink-0">✓</span>
                        {line}
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
                    Precio especial
                </span>
                <div className="flex flex-col items-end gap-0.5">
                    {student && (
                        <span className="text-xs text-zinc-600 line-through">${promo.price}</span>
                    )}
                    <span className={`text-xl font-black ${student ? "text-amber-400" : "text-white"}`}>
                        ${finalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ── Student disclaimer banner ── */
function StudentBanner() {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <button
                onClick={() => setExpanded((v) => !v)}
                className="flex w-full items-center justify-between gap-2 text-left"
            >
                <span className="flex items-center gap-2 text-sm font-bold text-amber-400">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    ¿Cómo obtener el descuento estudiantil?
                </span>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                )}
            </button>
            {expanded && (
                <div className="mt-3 space-y-2 text-sm text-zinc-400 leading-relaxed">
                    <p>
                        Llena el formulario marcando{" "}
                        <span className="text-amber-400 font-semibold">Soy estudiante</span>, envía
                        tu solicitud y recibirás un botón directo de{" "}
                        <span className="text-emerald-400 font-semibold">WhatsApp</span> con tu
                        código de ticket. Solo manda uno de estos documentos por ese chat:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-500 text-xs">
                        <li>Carga académica / horario del semestre actual</li>
                        <li>Credencial o carnet escolar vigente</li>
                        <li>Comprobante de inscripción oficial</li>
                    </ul>
                    <p className="text-xs text-zinc-600">
                        El descuento se aplica una vez verificado el documento. Válido para
                        cualquier nivel educativo.
                    </p>
                </div>
            )}
        </div>
    );
}

/* ── Student toggle ── */
function StudentToggle({
    active,
    onToggle,
}: {
    active: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-200 select-none ${active
                ? "bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-900/20"
                : "bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
            aria-pressed={active}
        >
            {/* Toggle pill */}
            <span
                className={`relative inline-flex w-9 h-5 flex-shrink-0 rounded-full transition-colors duration-200 ${active ? "bg-amber-500" : "bg-zinc-700"
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${active ? "translate-x-4" : "translate-x-0"
                        }`}
                />
            </span>
            <GraduationCap className="w-4 h-4" />
            Precio estudiantil
        </button>
    );
}

/* ── Main component ── */
export default function PriceCatalog() {
    const [student, setStudent] = useState(false);

    return (
        <section id="precios" className="py-16 sm:py-24 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        Catálogo de Precios
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                                Precios claros, sin sorpresas
                            </h2>
                            <p className="text-zinc-500 mt-2 max-w-xl text-sm sm:text-base">
                                Todos los precios son orientativos y se confirman tras el diagnóstico.{" "}
                                <span className="text-amber-400/90 font-medium">
                                    ¿Eres estudiante? Tenemos un precio especial para ti —{" "}
                                    actívalo aquí y ahorra $150 en cualquier servicio.
                                </span>
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <StudentToggle active={student} onToggle={() => setStudent((v) => !v)} />
                        </div>
                    </div>

                    {/* Active discount badge */}
                    {student && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Descuento estudiantil activo — $150 MXN de ahorro por servicio
                        </div>
                    )}
                </div>

                {/* Grid: auto-fit — 1 col mobile · 2 col tablet · 3 col desktop */}
                <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>

                    {/* ── Col 1: Servicios en Cómputo ── */}
                    <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6">
                        <SectionHeader icon={Monitor} title="Cómputo" subtitle="Servicios en" />
                        {COMPUTO.map((g) => (
                            <GroupBlock key={g.title} group={g} student={student} />
                        ))}
                    </div>

                    {/* ── Col 2: Extras + Teléfonos + Consolas ── */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6 flex-1">
                            <SectionHeader icon={Sparkles} title="Extras" subtitle="Servicios" />
                            <SimpleList items={EXTRAS} student={student} />
                        </div>

                        <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6 flex-1">
                            <SectionHeader icon={Smartphone} title="Teléfonos" subtitle="Servicios en" />
                            <SimpleList items={TELEFONOS} student={student} />
                        </div>

                        <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6 flex-1">
                            <SectionHeader icon={Gamepad2} title="Consolas" subtitle="Servicios en" />
                            <SimpleList items={CONSOLAS} student={student} />
                        </div>
                    </div>

                    {/* ── Col 3: Promociones ── */}
                    <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6">
                        <SectionHeader icon={Tag} title="Promociones" subtitle="Paquetes" />
                        <div className="flex flex-col gap-4">
                            {PROMOS.map((p) => (
                                <PromoCard key={p.title} promo={p} student={student} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Student disclaimer */}
                <StudentBanner />

                {/* Disclaimer */}
                <p className="text-center text-zinc-600 text-xs mt-6">
                    * Precios en pesos mexicanos (MXN). Los servicios de recuperación de datos y hardware pueden variar según el caso.
                </p>
            </div>
        </section>
    );
}
