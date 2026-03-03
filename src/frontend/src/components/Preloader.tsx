import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "oklch(15% 0.01 270)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Outer spinning ring */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-24 h-24 rounded-full"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(oklch(15% 0.01 270), oklch(15% 0.01 270)), linear-gradient(135deg, oklch(72% 0.24 290), oklch(65% 0.2 220), oklch(75% 0.25 192))",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                animation: "preloader-ring 1.2s linear infinite",
              }}
            />
            <div
              className="absolute w-20 h-20 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, oklch(72% 0.24 290 / 0.4), transparent 70%)",
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
            {/* Monogram */}
            <span
              className="relative font-display font-bold text-3xl gradient-text z-10"
              style={{ letterSpacing: "-0.02em" }}
            >
              SK
            </span>
          </div>

          {/* Loading text */}
          <motion.p
            className="absolute bottom-16 font-mono text-sm"
            style={{ color: "oklch(60% 0.005 0)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
