import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Footer from "./components/Footer";
import { Project } from "./types";
import { Menu, X, ArrowLeft, Mail, Instagram, Github, Twitter, FileText, MessageCircle } from "lucide-react";

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
            ? "bg-black/90 backdrop-blur-md border-zinc-900 py-4"
            : "bg-[#0b0b10] border-transparent py-5"
        }`}
      >
        <div className="max-w-[1250px] mx-auto px-4 md:px-10 flex items-center justify-between">
          
          {/* Left Side: Email & Socials */}
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-400">
            <a 
              href="mailto:rana6424sheikh@gmail.com" 
              className="hidden sm:block text-sm font-medium hover:text-white transition-colors tracking-wide"
            >
              rana6424sheikh@gmail.com
            </a>

          </div>

          {/* Right Side: CV & WhatsApp */}
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-400">
            <a 
              href="https://docs.google.com/document/d/1sCwUspHuPcLFX90T2cnHoEIDgiatoFIiJ5_pqqJv-j8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2 tracking-wide"
            >
              <span className="hidden sm:inline">View CV</span>
              <FileText className="w-[18px] h-[18px]" />
            </a>
            <div className="border-l border-zinc-800 pl-4 sm:pl-6">
              <a 
                href="https://wa.me/8801613475871"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors flex items-center"
              >
                <MessageCircle className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

        </div>
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
            <Hero onSelectProject={(proj) => setSelectedProject(proj)} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
