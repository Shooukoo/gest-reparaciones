import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    titulo: string;
    descripcion: string;
}

export default function ServiceCard({ icon: Icon, titulo, descripcion }: ServiceCardProps) {
    return (
        <div className="group relative bg-zinc-900 border border-white/8 rounded-2xl p-6 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up overflow-hidden">
            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple-600/10 border border-purple-500/20 mb-4 group-hover:bg-purple-600/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-purple-400" />
            </div>

            <h3 className="text-white font-semibold text-base mb-2">{titulo}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{descripcion}</p>
        </div>
    );
}
