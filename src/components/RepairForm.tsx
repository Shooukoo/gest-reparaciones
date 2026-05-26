"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { addTicket } from "@/lib/firestoreService";
import { NuevoTicket, TipoDispositivo, TipoServicio } from "@/types/ticket";
import { Send, Loader2, Copy, Check, X, Ticket, GraduationCap, Info } from "lucide-react";
import CustomSelect from "./CustomSelect";

const DISPOSITIVOS: TipoDispositivo[] = [
    "Laptop",
    "PC de Escritorio",
    "Celular / Smartphone",
    "Tablet",
    "Consola",
    "Otro",
];

const SERVICIOS_POR_DISPOSITIVO: Record<TipoDispositivo, TipoServicio[]> = {
    "Laptop": [
        "Mantenimiento y Limpieza",
        "Eliminación de Virus y Malware",
        "Formateo e Instalación de Windows/Linux",
        "Instalación de Software",
        "Respaldo de Información",
        "Recuperación de Datos",
        "Actualización de Hardware (RAM/SSD)",
        "Asesoría Técnica",
        "Otro",
    ],
    "PC de Escritorio": [
        "Mantenimiento y Limpieza",
        "Eliminación de Virus y Malware",
        "Formateo e Instalación de Windows/Linux",
        "Instalación de Software",
        "Respaldo de Información",
        "Recuperación de Datos",
        "Actualización de Hardware (RAM/SSD)",
        "Armado de PC a la Medida",
        "Asesoría Técnica",
        "Otro",
    ],
    "Celular / Smartphone": [
        "Mantenimiento de Celular",
        "Formateo de Celular",
        "Eliminación de Cuenta Google/KNOX",
        "Asesoría Técnica",
        "Otro",
    ],
    "Tablet": [
        "Mantenimiento de Celular",
        "Formateo de Celular",
        "Eliminación de Cuenta Google/KNOX",
        "Instalación de Software",
        "Asesoría Técnica",
        "Otro",
    ],
    "Consola": [
        "Mantenimiento y Limpieza",
        "Actualización de Hardware (Consola)",
        "Asesoría Técnica",
        "Otro",
    ],
    "Otro": [
        "Mantenimiento y Limpieza",
        "Eliminación de Virus y Malware",
        "Formateo e Instalación de Windows/Linux",
        "Instalación de Software",
        "Respaldo de Información",
        "Recuperación de Datos",
        "Actualización de Hardware (RAM/SSD)",
        "Actualización de Hardware (Consola)",
        "Armado de PC a la Medida",
        "Mantenimiento de Celular",
        "Formateo de Celular",
        "Eliminación de Cuenta Google/KNOX",
        "Asesoría Técnica",
        "Otro",
    ],
};

const INITIAL_STATE: NuevoTicket = {
    clienteNombre: "",
    whatsapp: "",
    tipoDispositivo: "Laptop",
    tipoServicio: "Mantenimiento y Limpieza",
    descripcionProblema: "",
    esEstudiante: false,
};

const inputClass =
    "w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm";

const labelClass =
    "block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide";

/* ─── Modal de código de ticket ─── */
function TicketCodeModal({
    code,
    isStudent,
    onClose,
}: {
    code: string;
    isStudent: boolean;
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
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
                <div className="flex items-center gap-2 bg-zinc-950 border border-purple-500/30 rounded-xl px-4 py-3 mb-4">
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

                {/* Aviso descuento estudiantil */}
                {isStudent && (
                    <p className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-4">
                        Te contactaremos para verificar tu documento académico y aplicar el descuento.
                    </p>
                )}

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
    const [wasStudent, setWasStudent] = useState(false);

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
            setWasStudent(form.esEstudiante ?? false);
            setForm(INITIAL_STATE);
            setTicketCode(code);
            // Cooldown anti-spam: 30 s
            setCooldown(true);
            setTimeout(() => setCooldown(false), 30_000);

            // Notificación por correo (no bloquea al usuario si falla)
            fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tipo: "nuevo_ticket",
                    ticketCode: code,
                    cliente: form.clienteNombre,
                    dispositivo: form.tipoDispositivo,
                    servicio: form.tipoServicio,
                    descripcion: form.descripcionProblema,
                    whatsapp: form.whatsapp,
                }),
            }).catch((e) => console.warn("[email] No se pudo enviar el aviso:", e));
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
                    isStudent={wasStudent}
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
                        onChange={(value) => {
                            const newDevice = value as TipoDispositivo;
                            const available = SERVICIOS_POR_DISPOSITIVO[newDevice];
                            setForm((prev) => ({
                                ...prev,
                                tipoDispositivo: newDevice,
                                tipoServicio: available[0],
                            }));
                        }}
                        options={DISPOSITIVOS}
                    />

                    {/* Tipo de servicio */}
                    <CustomSelect
                        id="tipoServicio"
                        name="tipoServicio"
                        label="Tipo de servicio"
                        value={form.tipoServicio}
                        onChange={handleSelect("tipoServicio")}
                        options={SERVICIOS_POR_DISPOSITIVO[form.tipoDispositivo]}
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

                {/* Descuento estudiantil */}
                <div className="rounded-xl border border-white/8 bg-zinc-950/50 p-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div className="relative flex-shrink-0">
                            <input
                                id="esEstudiante"
                                type="checkbox"
                                checked={form.esEstudiante ?? false}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, esEstudiante: e.target.checked }))
                                }
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${form.esEstudiante
                                    ? "bg-amber-500 border-amber-500"
                                    : "bg-zinc-900 border-white/20"
                                    }`}
                            >
                                <Check className={`w-3 h-3 text-zinc-900 transition-opacity ${form.esEstudiante ? "opacity-100" : "opacity-0"}`} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className={`w-4 h-4 transition-colors ${form.esEstudiante ? "text-amber-400" : "text-zinc-500"}`} />
                            <span className="text-sm font-semibold text-zinc-300">
                                Soy estudiante — quiero el descuento de{" "}
                                <span className="text-amber-400">$150 MXN</span>
                            </span>
                        </div>
                    </label>

                    {/* Grid-rows trick for smooth height animation */}
                    <div
                        className="grid overflow-hidden transition-all duration-250 ease-out"
                        style={{ gridTemplateRows: form.esEstudiante ? "1fr" : "0fr" }}
                    >
                        <div className="min-h-0">
                            <div className="flex items-start gap-2 text-xs text-zinc-500 pt-1">
                                <Info className="w-3.5 h-3.5 text-amber-500/70 flex-shrink-0 mt-0.5" />
                                <p>
                                    Necesitamos verificar tu{" "}
                                    <span className="text-zinc-300">carga académica, credencial o comprobante de inscripción</span>.
                                    Te contactaremos para solicitarlo. El descuento se aplica tras la verificación.
                                </p>
                            </div>
                        </div>
                    </div>
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
