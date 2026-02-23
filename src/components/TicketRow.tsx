"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateTicketStatus } from "@/lib/firestoreService";
import { Ticket, TicketEstado } from "@/types/ticket";
import { MessageCircle } from "lucide-react";

interface TicketRowProps {
    ticket: Ticket;
    index: number;
}

const ESTADO_COLORS: Record<TicketEstado, string> = {
    Pendiente: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "En Proceso": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Terminado: "bg-violet-500/10 text-violet-300 border-violet-500/20",
};

const ESTADOS: TicketEstado[] = ["Pendiente", "En Proceso", "Terminado"];

export default function TicketRow({ ticket, index }: TicketRowProps) {
    const [updating, setUpdating] = useState(false);

    async function handleEstadoChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const nuevoEstado = e.target.value as TicketEstado;
        setUpdating(true);
        try {
            await updateTicketStatus(ticket.id, nuevoEstado);
            toast.success(`Estado → "${nuevoEstado}"`);
        } catch {
            toast.error("Error al actualizar el estado.");
        } finally {
            setUpdating(false);
        }
    }

    const fecha = ticket.fecha?.toDate
        ? ticket.fecha.toDate().toLocaleDateString("es-GT", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "—";

    const waLink = `https://wa.me/${ticket.whatsapp.replace(/\D/g, "")}`;

    return (
        <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <td className="px-4 py-4 text-xs text-zinc-600 font-mono whitespace-nowrap">
                #{String(index + 1).padStart(3, "0")}
            </td>
            <td className="px-4 py-4">
                <p className="font-semibold text-white text-sm">{ticket.clienteNombre}</p>
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs mt-0.5"
                >
                    <MessageCircle className="w-3 h-3" />
                    {ticket.whatsapp}
                </a>
            </td>
            <td className="px-4 py-4 text-sm text-zinc-400 whitespace-nowrap">
                {ticket.tipoDispositivo}
            </td>
            <td className="px-4 py-4 text-sm text-zinc-400">{ticket.tipoServicio}</td>
            <td className="px-4 py-4 max-w-xs">
                <p className="text-sm text-zinc-500 truncate" title={ticket.descripcionProblema}>
                    {ticket.descripcionProblema}
                </p>
            </td>
            <td className="px-4 py-4 text-xs text-zinc-600 whitespace-nowrap">{fecha}</td>
            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <span
                        className={`px-2.5 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${ESTADO_COLORS[ticket.estado]}`}
                    >
                        {ticket.estado}
                    </span>
                    <select
                        value={ticket.estado}
                        onChange={handleEstadoChange}
                        disabled={updating}
                        className="text-xs bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 cursor-pointer"
                        aria-label="Cambiar estado"
                    >
                        {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
            </td>
        </tr>
    );
}
