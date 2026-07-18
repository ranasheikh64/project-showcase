import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Footer from "./components/Footer";
import { Project } from "./types";
import { Menu, X, ArrowLeft } from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on header when scrolled
      setScrolled(window.scrollY > 20);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Featured Projects", id: "projects" }
  ];

  const handleHomeClick = () => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setMobileMenu(false);
    setSelectedProject(null);
    // Tiny delay to allow screen rendering back to home before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-violet-900/45 selection:text-white relative">
      {/* Top sticky floating Scroll Progress Bar Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Header Navbar Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-zinc-900/80 py-3.5"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between">
          
          {/* Brand Logo Link */}
          <div
            onClick={handleHomeClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-8.5 w-8.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform shadow-md">
              R
            </div>
            <div className="text-left leading-none">
              <span className="font-extrabold text-sm text-white tracking-wide block">Rana Sheikh</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-wider block mt-0.5">PORTFOLIO</span>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {selectedProject && (
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer hover:bg-zinc-900/40 flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back Home
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer hover:bg-zinc-900/40"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Consult Button Right Side Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="mailto:rana6424sheikh@gmail.com"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-950/20 hover:shadow-violet-950/40 active:scale-95 transition-all cursor-pointer"
            >
              Consult Rana
            </a>
          </div>

          {/* Mobile Menu Action trigger button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenu ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenu && (
          <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-900 backdrop-blur-xl absolute top-full inset-x-0 p-4 space-y-1.5 text-left shadow-2xl animate-fade-in">
            {selectedProject && (
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setSelectedProject(null);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all block cursor-pointer"
              >
                ← Back Home
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all block cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <a
                href="mailto:rana6424sheikh@gmail.com"
                className="w-full flex items-center justify-center rounded-xl bg-violet-600 py-3 text-xs font-bold text-white shadow-md"
              >
                Consult Rana
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Structured Sections Render Stack */}
      <main className="relative">
        {selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <>
            <Hero />
            <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
