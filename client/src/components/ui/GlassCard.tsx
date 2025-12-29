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
                "relative overflow-hidden rounded-2xl border border-glass-border bg-glass-surface backdrop-blur-3xl transition-all duration-300",
                "pointer-events-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                hoverEffect && "hover:bg-white/[0.55] hover:border-white/30 hover:shadow-[0_16px_48px_0_rgba(22,163,74,0.2)] hover:scale-[1.02] cursor-default",
                className
            )}
            {...props}
        >
            {/* Glossy Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-white/2 to-transparent opacity-40 pointer-events-none" />

            {/* Inner Rim Light */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
