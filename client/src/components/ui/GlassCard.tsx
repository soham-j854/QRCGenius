import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true, ...props }: GlassCardProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-glass-border bg-glass-surface backdrop-blur-2xl transition-all duration-300",
                "pointer-events-auto shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)]",
                hoverEffect && "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(22,163,74,0.15)] hover:scale-[1.01]",
                className
            )}
            {...props}
        >
            {/* Glossy Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none" />

            {/* Inner Rim Light (Simulated with box-shadow in CSS, or this internal border) */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
