"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { addTicket } from "@/lib/firestoreService";
import { NuevoTicket, TipoDispositivo, TipoServicio } from "@/types/ticket";
import { Send, Loader2, Copy, Check, X, Ticket } from "lucide-react";
import CustomSelect from "./CustomSelect";

const DISPOSITIVOS: TipoDispositivo[] = [
    "Laptop",
    "PC de Escritorio",
    "Consola",
    "Celular",
    "Tablet",
    "Otro",
];

const SERVICIOS: TipoServicio[] = [
    "Mantenimiento Preventivo",
    "Mantenimiento Correctivo",
    "Formateo e Instalación de SO",
    "Instalación de Software",
    "Reparación de Hardware",
    "Reparación de Consola",
    "Asesoría Técnica",
    "Otro",
];

const INITIAL_STATE: NuevoTicket = {
    clienteNombre: "",
    whatsapp: "",
    tipoDispositivo: "Laptop",
    tipoServicio: "Mantenimiento Preventivo",
    descripcionProblema: "",
};

const inputClass =
    "w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm";

const labelClass =
    "block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide";

/* ─── Modal de código de ticket ─── */
function TicketCodeModal({
    code,
    onClose,
}: {
    code: string;
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 text-center animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Ícono */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500/10 rounded-2xl mb-5">
                    <Ticket className="w-7 h-7 text-purple-400" />
                </div>

                <h2 className="text-white font-extrabold text-xl mb-1">
                    ¡Solicitud enviada!
                </h2>
                <p className="text-zinc-500 text-sm mb-6">
                    Guarda tu código para consultar el estado de tu reparación.
                </p>

                {/* Código */}
                <div className="flex items-center gap-2 bg-zinc-950 border border-purple-500/30 rounded-xl px-4 py-3 mb-6">
                    <span className="flex-1 font-mono text-lg font-bold text-purple-300 tracking-widest text-center">
                        {code}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-all duration-200"
                        aria-label="Copiar código"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <p className="text-zinc-600 text-xs mb-6">
                    Visita{" "}
                    <a href="/estado" className="text-purple-400 hover:underline">
                        /estado
                    </a>{" "}
                    e ingresa este código para ver el progreso.
                </p>

                <button
                    onClick={onClose}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-200"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
}

/* ─── Formulario principal ─── */
export default function RepairForm() {
    const [form, setForm] = useState<NuevoTicket>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [ticketCode, setTicketCode] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSelect(field: keyof NuevoTicket) {
        return (value: string) =>
            setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.clienteNombre.trim() || !form.whatsapp.trim()) {
            toast.error("Completa todos los campos requeridos.");
            return;
        }
        setLoading(true);
        try {
            const code = await addTicket(form);
            setForm(INITIAL_STATE);
            setTicketCode(code);
            // Cooldown anti-spam: 30 s
            setCooldown(true);
            setTimeout(() => setCooldown(false), 30_000);
        } catch (err) {
            console.error(err);
            toast.error("Error al enviar. Verifica tu conexión.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Modal del código */}
            {ticketCode && (
                <TicketCodeModal
                    code={ticketCode}
                    onClose={() => setTicketCode(null)}
                />
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 rounded-2xl border border-white/8 p-6 sm:p-8 space-y-5"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="clienteNombre" className={labelClass}>
                            Nombre completo <span className="text-purple-400">*</span>
                        </label>
                        <input
                            id="clienteNombre"
                            name="clienteNombre"
                            type="text"
                            required
                            value={form.clienteNombre}
                            onChange={handleChange}
                            placeholder="Juan Pérez"
                            className={inputClass}
                        />
                    </div>

                    {/* WhatsApp */}
                    <div>
                        <label htmlFor="whatsapp" className={labelClass}>
                            WhatsApp <span className="text-purple-400">*</span>
                        </label>
                        <input
                            id="whatsapp"
                            name="whatsapp"
                            type="tel"
                            required
                            value={form.whatsapp}
                            onChange={handleChange}
                            placeholder="353-000-0000"
                            className={inputClass}
                        />
                    </div>

                    {/* Tipo de dispositivo */}
                    <CustomSelect
                        id="tipoDispositivo"
                        name="tipoDispositivo"
                        label="Tipo de dispositivo"
                        value={form.tipoDispositivo}
                        onChange={handleSelect("tipoDispositivo")}
                        options={DISPOSITIVOS}
                    />

                    {/* Tipo de servicio */}
                    <CustomSelect
                        id="tipoServicio"
                        name="tipoServicio"
                        label="Tipo de servicio"
                        value={form.tipoServicio}
                        onChange={handleSelect("tipoServicio")}
                        options={SERVICIOS}
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="descripcionProblema" className={labelClass}>
                        Descripción del problema <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                        id="descripcionProblema"
                        name="descripcionProblema"
                        required
                        rows={4}
                        value={form.descripcionProblema}
                        onChange={handleChange}
                        placeholder="Ej: La laptop no enciende, hace un sonido extraño al inicio..."
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || cooldown}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:text-purple-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Enviar Solicitud
                        </>
                    )}
                </button>
            </form>
        </>
    );
}
