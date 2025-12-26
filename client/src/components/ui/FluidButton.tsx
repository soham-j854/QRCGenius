import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface FluidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
}

export const FluidButton = ({ children, className, variant = "primary", ...props }: FluidButtonProps) => {
    const baseStyles = "relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-white/5 border border-white/10 text-white hover:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        secondary: "bg-black/20 border border-white/10 text-white hover:bg-black/40",
        ghost: "bg-transparent hover:bg-white/5 text-white/80 hover:text-white",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {/* Mobile/Liquid Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-emerald-500/10 blur-md" />

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};
