import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(totalHeight > 0 ? (current / totalHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] overflow-hidden">
      <div
        className="h-full origin-left transition-transform duration-100"
        style={{
          transform: `scaleX(${progress / 100})`,
          background:
            "linear-gradient(90deg, oklch(72% 0.24 290), oklch(65% 0.2 220), oklch(75% 0.25 192))",
          boxShadow: "0 0 8px oklch(72% 0.24 290 / 0.8)",
        }}
      />
    </div>
  );
}
