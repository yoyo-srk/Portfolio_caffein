import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Services from "./components/Services";

export default function App() {
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return next;
    });
  };

  return (
    <>
      <Preloader />
      <ScrollProgress />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar isLight={isLight} onToggleTheme={toggleTheme} />

        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Services />
          <Contact />
        </main>

        <Footer />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(18% 0.015 270)",
            border: "1px solid oklch(72% 0.24 290 / 0.3)",
            color: "oklch(96% 0.005 0)",
          },
        }}
      />
    </>
  );
}
