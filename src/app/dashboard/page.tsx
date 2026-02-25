"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
    subscribeToTickets,
    subscribeToPortfolioContacts,
    deletePortfolioContact,
    PortfolioContact,
} from "@/lib/firestoreService";
import { Ticket, TicketEstado } from "@/types/ticket";
import TicketRow from "@/components/TicketRow";
import toast from "react-hot-toast";
import {
    ClipboardList,
    Clock,
    Zap,
    CheckCircle2,
    Loader2,
    Search,
    LogOut,
    Mail,
    Phone,
    Tag,
    Trash2,
    Inbox,
} from "lucide-react";

const FILTROS: { label: string; value: "Todos" | TicketEstado }[] = [
    { label: "Todos", value: "Todos" },
    { label: "Pendiente", value: "Pendiente" },
    { label: "En Proceso", value: "En Proceso" },
    { label: "Terminado", value: "Terminado" },
];

const ESTADO_ICONS: Record<TicketEstado, React.ReactNode> = {
    Pendiente: <Clock className="w-5 h-5 text-amber-500" />,
    "En Proceso": <Zap className="w-5 h-5 text-blue-500" />,
    Terminado: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
};

export default function DashboardPage() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState<"Todos" | TicketEstado>("Todos");
    const [busqueda, setBusqueda] = useState("");

    // Portfolio contacts state
    const [contacts, setContacts] = useState<PortfolioContact[]>([]);
    const [contactsLoading, setContactsLoading] = useState(true);

    async function handleLogout() {
        try {
            await signOut(auth);
            toast.success("Sesión cerrada correctamente.");
        } catch {
            toast.error("Error al cerrar sesión.");
        }
    }

    useEffect(() => {
        const unsub = subscribeToTickets((data) => {
            setTickets(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        const unsub = subscribeToPortfolioContacts((data) => {
            setContacts(data);
            setContactsLoading(false);
        });
        return () => unsub();
    }, []);

    async function handleDeleteContact(id: string) {
        try {
            await deletePortfolioContact(id);
            toast.success("Contacto eliminado.");
        } catch {
            toast.error("Error al eliminar el contacto.");
        }
    }

    const filtrados = tickets.filter((t) => {
        const matchFiltro = filtro === "Todos" || t.estado === filtro;
        const matchBusqueda =
            busqueda.trim() === "" ||
            t.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            t.whatsapp.includes(busqueda) ||
            t.tipoDispositivo.toLowerCase().includes(busqueda.toLowerCase());
        return matchFiltro && matchBusqueda;
    });

    // Contadores por estado
    const counts = {
        Pendiente: tickets.filter((t) => t.estado === "Pendiente").length,
        "En Proceso": tickets.filter((t) => t.estado === "En Proceso").length,
        Terminado: tickets.filter((t) => t.estado === "Terminado").length,
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 flex-shrink-0" />
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                                Panel de Reparaciones
                            </h1>
                        </div>
                        <p className="text-zinc-500 text-sm ml-9 sm:ml-10 truncate max-w-xs">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="self-start sm:self-auto flex items-center gap-2 text-sm text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/8 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-200 flex-shrink-0"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Cerrar sesión</span>
                        <span className="sm:hidden">Salir</span>
                    </button>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {(["Pendiente", "En Proceso", "Terminado"] as TicketEstado[]).map(
                        (estado) => (
                            <div
                                key={estado}
                                className="bg-zinc-900 border border-white/8 rounded-2xl p-5 flex items-center gap-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    {ESTADO_ICONS[estado]}
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-white">
                                        {counts[estado]}
                                    </p>
                                    <p className="text-zinc-500 text-sm">{estado}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Filters + Search */}
                <div className="bg-zinc-900 border border-white/8 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-2">
                        {FILTROS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFiltro(f.value)}
                                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${filtro === f.value
                                    ? "bg-purple-600 text-white"
                                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {f.label}
                                {f.value !== "Todos" && (
                                    <span
                                        className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filtro === f.value
                                            ? "bg-white/20 text-white"
                                            : "bg-white/8 text-zinc-500"
                                            }`}
                                    >
                                        {counts[f.value as TicketEstado]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                            type="text"
                            placeholder="Buscar cliente, dispositivo..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-white/8 rounded-xl bg-zinc-950 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-zinc-600">
                            <Loader2 className="w-8 h-8 animate-spin mb-3 text-purple-500" />
                            <p className="text-sm">Cargando tickets...</p>
                        </div>
                    ) : filtrados.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-zinc-600">
                            <ClipboardList className="w-12 h-12 mb-3 text-zinc-800" />
                            <p className="text-base font-semibold text-zinc-500">
                                {tickets.length === 0
                                    ? "No hay tickets aún"
                                    : "Sin resultados para el filtro"}
                            </p>
                            <p className="text-sm mt-1 text-zinc-600">
                                {tickets.length === 0
                                    ? "Los tickets del formulario aparecerán aquí en tiempo real."
                                    : "Intenta cambiar el filtro o la búsqueda."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-zinc-950/50 border-b border-white/5">
                                        {["#", "Cliente", "Dispositivo", "Servicio", "Descripción", "Fecha", "Estado"].map(
                                            (col) => (
                                                <th
                                                    key={col}
                                                    className="px-4 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap"
                                                >
                                                    {col}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtrados.map((ticket, i) => (
                                        <TicketRow key={ticket.id} ticket={ticket} index={i} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer row count */}
                    {!loading && filtrados.length > 0 && (
                        <div className="px-4 py-3 border-t border-white/5 text-xs text-zinc-600">
                            Mostrando {filtrados.length} de {tickets.length} ticket(s)
                        </div>
                    )}
                </div>

                {/* ── Portfolio Contacts ────────────────────────────────────── */}
                <div className="mt-12">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Mail className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-white leading-none">
                                    Contactos del Portafolio
                                </h2>
                                {!contactsLoading && (
                                    <span className="text-xs font-semibold bg-indigo-500/15 text-indigo-400 px-2.5 py-1 rounded-full flex-shrink-0">
                                        {contacts.length}
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                                Mensajes recibidos a través del formulario de contacto del portafolio
                            </p>
                        </div>
                    </div>

                    {contactsLoading ? (
                        <div className="flex flex-col items-center justify-center py-16 text-zinc-600 bg-zinc-900 border border-white/8 rounded-2xl">
                            <Loader2 className="w-7 h-7 animate-spin mb-3 text-indigo-500" />
                            <p className="text-sm">Cargando contactos...</p>
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-zinc-600 bg-zinc-900 border border-white/8 rounded-2xl">
                            <Inbox className="w-10 h-10 mb-3 text-zinc-800" />
                            <p className="text-base font-semibold text-zinc-500">Sin mensajes aún</p>
                            <p className="text-sm mt-1 text-zinc-600">
                                Los mensajes del portafolio aparecerán aquí en tiempo real.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {contacts.map((contact) => {
                                const date = contact.createdAt?.toDate?.();
                                const formattedDate = date
                                    ? new Intl.DateTimeFormat("es-MX", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }).format(date)
                                    : null;

                                return (
                                    <div
                                        key={contact.id}
                                        className="bg-zinc-900 border border-white/8 rounded-2xl p-5 flex flex-col gap-3 group"
                                    >
                                        {/* Top row: name + delete */}
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="font-semibold text-white text-sm leading-snug">
                                                {contact.name}
                                            </p>
                                            <button
                                                onClick={() => handleDeleteContact(contact.id)}
                                                title="Eliminar"
                                                className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Meta: whatsapp + subject */}
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                                                <Phone className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                                                <span className="font-mono">{contact.whatsapp}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                                                <Tag className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                                                <span className="truncate">{contact.subject}</span>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-4 bg-zinc-950/50 rounded-xl px-3 py-2.5 border border-white/5">
                                            {contact.message}
                                        </p>

                                        {/* Date */}
                                        {formattedDate && (
                                            <p className="text-zinc-600 text-xs mt-auto">
                                                {formattedDate}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {/* ─────────────────────────────────────────────────────────── */}
            </div>
        </div>
    );
}
