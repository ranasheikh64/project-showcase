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
    <footer className="bg-black border-t border-zinc-900 py-8 px-4 md:px-10 relative">
      <div className="max-w-[1250px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono">
        <span>© 2026 Rana Sheikh. All rights reserved.</span>
        
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/rana6424sheikh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/ranasheikh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:rana6424sheikh@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
          
          <button
            onClick={scrollUp}
            className="ml-2 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowUpCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
