import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-zinc-900 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="mb-4">
                            <a
                                href="#inicio"
                                className="text-2xl font-bold tracking-tight select-none"
                            >
                                <span className="text-purple-400">.</span>
                                <span className="text-white">uningenierómás</span>
                            </a>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Servicio técnico profesional. Laptops, consolas e instalaciones.
                            Diagnóstico rápido, soluciones reales.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm">Servicios</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            {[
                                "Mantenimiento de Laptops",
                                "Reparación de Consolas",
                                "Instalación de Software",
                                "Asesoría Técnica",
                            ].map((s) => (
                                <li
                                    key={s}
                                    className="hover:text-purple-400 transition-colors cursor-pointer"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm">Contacto</h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://wa.me/523530000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-400 transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                                @uningenieromás
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600">
                    <span>© {year} Un Ingeniero Más. Todos los derechos reservados.</span>
                    <span className="text-purple-500/60">uningenieromás.com</span>
                </div>
            </div>
        </footer>
    );
}
