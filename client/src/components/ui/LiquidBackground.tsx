import { motion } from "framer-motion";

export const LiquidBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full bg-background overflow-hidden -z-10 transition-colors duration-500">
            {/* Dark Mode Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-slate-900 to-cyan-950 opacity-0 dark:opacity-90 transition-opacity duration-500" />

            {/* Light Mode Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 via-white to-cyan-100 opacity-100 dark:opacity-0 transition-opacity duration-500" />

            {/* Moving Blobs - Colors adapt to theme via classes */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    poster: "blur",
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/60 dark:bg-emerald-600/40 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-40 blur-[100px]"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-300/50 dark:bg-teal-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 blur-[120px]"
            />

            <motion.div
                animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-200/40 dark:bg-green-500/20 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-20 blur-[90px]"
            />

            {/* Global Noise Overlay */}
            <div className="absolute inset-0 z-[50] glass-noise opacity-30 pointer-events-none" />
        </div>
    );
};
