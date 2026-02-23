"use client";

import { useState } from "react";
import { getTicketByCode } from "@/lib/firestoreService";
import { Ticket } from "@/types/ticket";
import {
    Search,
    Loader2,
    ClipboardList,
    Clock,
    Wrench,
    CheckCircle2,
    Phone,
} from "lucide-react";

const ESTADO_CONFIG = {
    Pendiente: {
        color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: Clock,
        label: "Pendiente de revisión",
    },
    "En Proceso": {
        color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        icon: Wrench,
        label: "En proceso de reparación",
    },
    Terminado: {
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: CheckCircle2,
        label: "¡Listo para recoger!",
    },
};

export default function EstadoPage() {
    const [whatsapp, setWhatsapp] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!whatsapp.trim()) return;
        setLoading(true);
        setSearched(false);
        try {
            const ticket = await getTicketByCode(whatsapp.trim());
            setTickets(ticket ? [ticket] : []);
        } finally {
            setSearched(true);
            setLoading(false);
        }
    }

    return (
        <div className="pt-20 min-h-screen bg-zinc-950 overflow-x-hidden">
            {/* Grid bg */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                        Seguimiento
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                        Estado de tu reparación
                    </h1>
                    <p className="text-zinc-500 text-sm sm:text-base">
                        Ingresa el número de WhatsApp con el que registraste tu equipo.
                    </p>
                </div>

                {/* Search form */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                    <div className="relative flex-1">
                        <label htmlFor="whatsapp" className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">Código de ticket</label>
                        <input
                            id="whatsapp"
                            name="whatsapp"
                            type="text"
                            required
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="UIM-12345"
                            className="w-full pl-4 pr-4 py-3.5 bg-zinc-900 border border-white/8 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white font-semibold px-5 py-3.5 rounded-xl transition-all duration-200 text-sm flex-shrink-0"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Search className="w-4 h-4" />
                        )}
                        Buscar
                    </button>
                </form>

                {/* Results */}
                {loading && (
                    <div className="flex flex-col items-center py-16 text-zinc-600">
                        <Loader2 className="w-8 h-8 animate-spin mb-3 text-purple-500" />
                        <p className="text-sm">Buscando tu ticket...</p>
                    </div>
                )}

                {!loading && searched && tickets.length === 0 && (
                    <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-white/5">
                        <ClipboardList className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-400 font-semibold">No encontramos tickets</p>
                        <p className="text-zinc-600 text-sm mt-1">
                            Verifica que el número sea exactamente el que usaste al registrarte.
                        </p>
                    </div>
                )}

                {!loading && tickets.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-zinc-500 text-sm">
                            {tickets.length === 1
                                ? "1 ticket encontrado"
                                : `${tickets.length} tickets encontrados`}
                        </p>
                        {tickets.map((ticket) => {
                            const cfg = ESTADO_CONFIG[ticket.estado];
                            const Icon = cfg.icon;
                            const fecha = ticket.fecha?.toDate
                                ? ticket.fecha.toDate().toLocaleDateString("es-GT", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "—";

                            return (
                                <div
                                    key={ticket.id}
                                    className="bg-zinc-900 border border-white/8 rounded-2xl p-5 sm:p-6 animate-fade-in-up"
                                >
                                    {/* Estado badge */}
                                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.color}`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            {cfg.label}
                                        </span>
                                        <span className="text-zinc-600 text-xs">{fecha}</span>
                                    </div>

                                    {/* Info */}
                                    <h3 className="text-white font-bold text-lg mb-3">
                                        {ticket.clienteNombre}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        <div className="bg-zinc-950/50 rounded-xl px-4 py-3">
                                            <p className="text-zinc-600 text-xs mb-0.5 uppercase tracking-wide">Dispositivo</p>
                                            <p className="text-zinc-300 text-sm font-medium">{ticket.tipoDispositivo}</p>
                                        </div>
                                        <div className="bg-zinc-950/50 rounded-xl px-4 py-3">
                                            <p className="text-zinc-600 text-xs mb-0.5 uppercase tracking-wide">Servicio</p>
                                            <p className="text-zinc-300 text-sm font-medium">{ticket.tipoServicio}</p>
                                        </div>
                                        <div className="bg-zinc-950/50 rounded-xl px-4 py-3 sm:col-span-2">
                                            <p className="text-zinc-600 text-xs mb-0.5 uppercase tracking-wide">Descripción</p>
                                            <p className="text-zinc-300 text-sm">{ticket.descripcionProblema}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
