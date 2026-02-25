"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface CustomSelectProps {
    id?: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    label?: string;
    required?: boolean;
}

export default function CustomSelect({
    id,
    name,
    value,
    onChange,
    options,
    label,
    required,
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    // Close on Escape key
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div ref={ref} className="relative">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide"
                >
                    {label}
                    {required && <span className="text-purple-400 ml-1">*</span>}
                </label>
            )}

            {/* Trigger button */}
            <button
                type="button"
                id={id}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={`w-full flex items-center justify-between gap-2 bg-zinc-900 border rounded-xl px-4 py-3 text-sm text-left transition-all duration-200 focus:outline-none
          ${open
                        ? "border-purple-500 ring-2 ring-purple-500/30 text-white"
                        : "border-white/8 text-zinc-300 hover:border-white/20"
                    }`}
            >
                <span>{value}</span>
                <ChevronDown
                    className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-purple-400" : ""
                        }`}
                />
            </button>

            {/* Hidden native input for form submission */}
            <input type="hidden" name={name} value={value} />

            {/* Dropdown list — always rendered, shown/hidden with CSS transitions */}
            <ul
                role="listbox"
                className="absolute z-50 mt-2 w-full bg-zinc-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-y-auto max-h-60"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0) scaleY(1)" : "translateY(-4px) scaleY(0.96)",
                    transformOrigin: "top",
                    pointerEvents: open ? "auto" : "none",
                    visibility: open ? "visible" : "hidden",
                    transition: "opacity 0.15s ease-out, transform 0.15s ease-out, visibility 0.15s",
                }}
            >
                {options.map((opt) => {
                    const selected = opt === value;
                    return (
                        <li
                            key={opt}
                            role="option"
                            aria-selected={selected}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100
                  ${selected
                                    ? "bg-purple-600/20 text-purple-300"
                                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span>{opt}</span>
                            {selected && <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
