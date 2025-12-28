import { motion } from "framer-motion";

export const LiquidBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full bg-background overflow-hidden -z-10 transition-colors duration-500">
            {/* Dark Mode Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 via-cyan-950 to-slate-900 opacity-0 dark:opacity-100 transition-opacity duration-500" />

            {/* Light Mode Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-white opacity-100 dark:opacity-0 transition-opacity duration-500" />

            {/* Primary Emerald Blob - Top Left */}
            <motion.div
                animate={{
                    x: [0, 80, -40, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.15, 1.05, 1],
                }}
                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/50 dark:bg-emerald-500/35 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 blur-3xl"
            />

            {/* Secondary Cyan Blob - Bottom Right */}
            <motion.div
                animate={{
                    x: [0, -120, 60, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.25, 0.95, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-300/40 dark:bg-cyan-600/25 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-40 blur-3xl"
            />

            {/* Tertiary Teal Blob - Center */}
            <motion.div
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-teal-300/45 dark:bg-teal-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-35 blur-3xl"
            />

            {/* Quaternary Green Blob - Center-Top */}
            <motion.div
                animate={{
                    x: [0, -60, 120, 0],
                    y: [0, 80, -80, 0],
                    scale: [1, 0.9, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-green-200/35 dark:bg-green-500/20 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-30 blur-3xl"
            />

            {/* Accent Emerald Blob - Top Right */}
            <motion.div
                animate={{
                    x: [0, 70, -70, 0],
                    y: [0, -100, 100, 0],
                    scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-600/25 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 blur-3xl"
            />

            {/* Subtle Light Rays - Light Mode Only */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-100 dark:opacity-0 pointer-events-none" />

            {/* Fine Grain Texture */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" fill=\"%23000\" filter=\"url(%23noise)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
                backgroundSize: "100px 100px"
            }} />
        </div>
    );
};
