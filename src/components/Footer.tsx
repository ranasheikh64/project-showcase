import React from "react";
import { Github, Linkedin, Mail, ArrowUpCircle } from "lucide-react";

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    { label: "Featured Projects", id: "projects" }
  ];

  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-4 md:px-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        {/* Left Side: Logo & Bio */}
        <div className="space-y-3 max-w-xs">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm">
              R
            </div>
            <span className="font-extrabold text-white text-sm tracking-wide">Rana Sheikh</span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Flutter App Developer at SM Technology, specializing in building high-fidelity cross-platform mobile applications and clean reactive Dart architectures.
          </p>
        </div>

        {/* Center Side: Quick Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center max-w-md">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                const el = document.getElementById(sec.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Right Side: Social Media links and scroll-up */}
        <div className="flex items-center gap-4 text-zinc-500">
          <a
            href="https://github.com/rana6424sheikh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
          <a
            href="https://linkedin.com/in/ranasheikh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href="mailto:rana6424sheikh@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
          
          <button
            onClick={scrollUp}
            className="ml-4 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowUpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 font-mono">
        <span>© 2026 Rana Sheikh. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-zinc-400 cursor-default">Dhaka, Bangladesh</span>
          <span>•</span>
          <span className="hover:text-zinc-400 cursor-default">Available for remote contracts</span>
        </div>
      </div>
    </footer>
  );
}
