import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, Clock, CreditCard, Wrench, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Términos y Condiciones",
    description:
        "Conoce los términos y condiciones del servicio técnico de Un Ingeniero Más: garantías, pagos, tiempos de entrega y políticas de reparación.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://uningenieromas.vercel.app/terms-and-conditions" },
};

const SECTIONS = [
    {
        icon: Wrench,
        title: "1. Servicio de diagnóstico",
        content: [
            "El diagnóstico inicial tiene un costo fijo de $50 MXN, el cual se descuenta del costo total de la reparación si el cliente acepta el presupuesto.",
            "Si el cliente rechaza el presupuesto, el costo del diagnóstico es no reembolsable.",
            "El diagnóstico incluye una evaluación general del equipo. Fallas adicionales detectadas durante la reparación serán notificadas al cliente antes de proceder.",
        ],
    },
    {
        icon: CreditCard,
        title: "2. Presupuesto y pagos",
        content: [
            "Todos los presupuestos se realizan de forma verbal o por escrito (vía WhatsApp) antes de comenzar cualquier reparación.",
            "Los pagos se realizan en efectivo o por transferencia bancaria al momento de la entrega del equipo.",
            "No se entregan equipos sin pago previo o completo, salvo acuerdo explícito por escrito.",
            "Los precios pueden variar si durante la reparación se detectan fallas adicionales. En ese caso, se notificará al cliente para su aprobación.",
        ],
    },
    {
        icon: Shield,
        title: "3. Garantía",
        content: [
            "Se otorga una garantía de 30 días naturales sobre la pieza reparada o reemplazada, contados desde la fecha de entrega.",
            "La garantía cubre únicamente la falla específica reparada y no aplica si el equipo presenta daños físicos posteriores, manejo inadecuado, humedad o manipulación por terceros.",
            "La garantía se anula automáticamente si el cliente abre o intenta reparar el equipo por su cuenta durante el período de garantía.",
            "Piezas de terceros o de procedencia no verificada no tienen garantía de nuestra parte.",
        ],
    },
    {
        icon: Clock,
        title: "4. Tiempos de entrega",
        content: [
            "Los tiempos de reparación son estimados y pueden variar según la disponibilidad de piezas o la complejidad de la falla.",
            "En general, las reparaciones simples se realizan en un plazo de 1 a 3 días hábiles.",
            "Reparaciones que requieran piezas de pedido especial pueden tardar hasta 7 días hábiles o más, dependiendo del proveedor.",
            "Se notificará al cliente por WhatsApp cuando el equipo esté listo para ser recogido.",
        ],
    },
    {
        icon: AlertTriangle,
        title: "5. Responsabilidad y riesgos",
        content: [
            "Un Ingeniero Más no se responsabiliza por la pérdida de datos almacenados en el dispositivo durante el proceso de reparación. Se recomienda al cliente realizar una copia de seguridad antes de entregar su equipo.",
            "En casos donde la reparación no sea posible, el equipo será devuelto en su estado original (o lo más próximo posible a él), cobrando únicamente el costo de diagnóstico.",
            "No nos hacemos responsables de equipos no recogidos pasados 30 días naturales desde la notificación de entrega. Pasado ese plazo, el equipo podrá ser desechado o donado.",
            "Cualquier daño preexistente no mencionado al momento de la recepción del equipo no será responsabilidad del servicio técnico.",
        ],
    },
    {
        icon: Phone,
        title: "6. Comunicación y contacto",
        content: [
            "El medio principal de comunicación es WhatsApp al número +52 353 137 3007.",
            "Las consultas realizadas fuera del horario de atención (lunes a sábado, 9:00 am – 8:00 pm) serán atendidas el siguiente día hábil.",
            "Al aceptar el servicio, el cliente confirma que ha leído y acepta los presentes términos y condiciones.",
        ],
    },
];

export default function TerminosYCondicionesPage() {
    return (
        <div className="min-h-screen bg-[#09090b] pt-28 pb-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400 transition-colors mb-10 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Volver al inicio
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                        <Shield className="w-3.5 h-3.5" />
                        Documento legal
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                        Términos y<br />
                        <span className="text-purple-400">Condiciones</span>
                    </h1>
                    <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                        Al solicitar cualquier servicio técnico con <span className="text-white font-medium">Un Ingeniero Más</span>, aceptas los siguientes términos. Por favor léelos con atención.
                    </p>
                    <p className="mt-3 text-zinc-600 text-xs">
                        Última actualización: marzo 2025
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {SECTIONS.map(({ icon: Icon, title, content }) => (
                        <section
                            key={title}
                            className="bg-zinc-900/60 border border-white/6 rounded-2xl p-6 sm:p-8"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-purple-400" />
                                </div>
                                <h2 className="text-white font-semibold text-lg">{title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {content.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-12 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 text-center">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        ¿Tienes alguna pregunta sobre estos términos?{" "}
                        <a
                            href="https://wa.me/523531373007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                            Contáctanos por WhatsApp
                        </a>{" "}
                        y con gusto te respondemos.
                    </p>
                </div>
            </div>
        </div>
    );
}
