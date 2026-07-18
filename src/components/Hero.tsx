import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Briefcase, Smartphone, Sparkles, Terminal, Code, Cpu, Mail, Calendar, MapPin, GraduationCap } from "lucide-react";
// careerTimeline removed

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [tagIndex, setTagIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<"code" | "app">("code"); // Code-to-App state

  const taglines = [
    "Flutter App Developer",
    "SM Technology Engineer",
    "Dart & Firebase Developer",
    "Mobile Solutions Craftsman"
  ];

  // Typing effect
  useEffect(() => {
    const currentTag = taglines[tagIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentTag.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTag.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIndex === currentTag.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTagIndex((prev) => (prev + 1) % taglines.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, tagIndex]);

  // Code-to-App automatic toggle loop
  useEffect(() => {
    const interval = setInterval(() => {
      setViewMode((prev) => (prev === "code" ? "app" : "code"));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    const resumeText = `
RANA SHEIKH - RESUME
Flutter App Developer @ SM Technology
Email: rana6424sheikh@gmail.com
Location: Dhaka, Bangladesh
GitHub: github.com/rana6424sheikh
LinkedIn: linkedin.com/in/ranasheikh

CAREER SUMMARY
Passionate and dedicated Flutter App Developer specializing in building high-fidelity cross-platform mobile apps. Hands-on experience with native integration, custom layouts, state-management (Riverpod, Bloc), and modern AI API interactions.

PROFESSIONAL EXPERIENCE
- Flutter App Developer | SM Technology
  July 2025 - Present
  Developing premium cross-platform apps, optimizing rendering performance, and managing API synchronization.

CAREER JOURNEY MILESTONES
- 2025 (July) - Present: Flutter App Developer @ SM Technology.
- 2023: Commenced dedicated specialization in Flutter and mobile ecosystems.
- 2022: Started Diploma in Computer Science & Technology @ Mymensingh Polytechnic Institute.

TECHNICAL EXPERTISE
- Frameworks: Flutter, Dart
- Backend & DB: Node.js, Express, Firebase Firestore, MongoDB, Hive (NoSQL)
- Version Control: Git & GitHub
    `.trim();

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Rana_Sheikh_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative bg-black text-white">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Left column: Text content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              Flutter Developer @ SM Technology
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <span className="text-zinc-500 font-mono text-sm tracking-wider uppercase">Lead Flutter Showcase</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">Masterful</span> <br /> Mobile Interfaces
              </h1>
              <div className="h-8 flex items-center">
                <span className="text-lg md:text-xl font-mono text-zinc-400 flex items-center gap-1">
                  <span className="text-violet-400 animate-pulse">&gt;</span>
                  {typedText}
                  <span className="w-1.5 h-5 bg-cyan-400 ml-1 animate-ping"></span>
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 max-w-lg text-sm sm:text-base leading-relaxed"
            >
              I am a Flutter App Developer at <strong>SM Technology</strong>. My professional background centers on translating complex application designs into high-performance, fluid mobile systems with clean reactive state.
            </motion.p>

            {/* Core buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <a
                href="mailto:rana6424sheikh@gmail.com"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-95 transition-all cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                Contact Rana
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                <Briefcase className="h-4.5 w-4.5 text-zinc-400" />
                Explore Projects
              </button>
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800/80 hover:border-zinc-700 bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4 text-zinc-500" />
                Download CV
              </button>
            </motion.div>

            {/* Social connections */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 border-t border-zinc-900 pt-6 w-full max-w-sm text-zinc-500 font-mono text-xs"
            >
              <span>CONNECT:</span>
              <a href="https://github.com/rana6424sheikh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="text-zinc-800">•</span>
              <a href="https://linkedin.com/in/ranasheikh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right column: Interactive Code-to-App Showcase card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center items-center w-full min-h-[420px]"
            id="code-to-app-showcase"
          >
            {/* Header Controls */}
            <div className="w-full max-w-[360px] bg-zinc-950 border border-zinc-800/80 rounded-2xl p-1 shadow-2xl shadow-violet-900/10">
              <div className="flex bg-zinc-900/60 rounded-xl p-1 border border-zinc-800/40">
                <button
                  onClick={() => setViewMode("code")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    viewMode === "code" ? "bg-violet-600 text-white shadow-md shadow-violet-950/20" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Code Source (Dart)
                </button>
                <button
                  onClick={() => setViewMode("app")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    viewMode === "app" ? "bg-violet-600 text-white shadow-md shadow-violet-950/20" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Staging Simulator
                </button>
              </div>
            </div>

            {/* Visual Canvas Card */}
            <div className="relative mt-6 w-full max-w-[360px] h-[450px] rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col">
              <AnimatePresence mode="wait">
                {viewMode === "code" ? (
                  <motion.div
                    key="code-preview"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col bg-zinc-950 p-5 font-mono text-left"
                  >
                    {/* Editor Window Chrome */}
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] text-zinc-500 tracking-wider">RanaApp.dart</span>
                      <Code className="h-3.5 w-3.5 text-zinc-600" />
                    </div>

                    {/* Code Block */}
                    <div className="flex-1 text-xs text-zinc-400 overflow-y-auto space-y-1.5 leading-relaxed selection:bg-violet-900/50">
                      <pre className="text-[10px]">
                        <span className="text-rose-400">import</span> <span className="text-zinc-300">'package:flutter/material.dart'</span>;<br />
                        <span className="text-rose-400">import</span> <span className="text-zinc-300">'package:sm_tech/core.dart'</span>;<br />
                        <br />
                        <span className="text-indigo-400">class</span> <span className="text-amber-400">SMProductView</span> <span className="text-indigo-400">extends</span> <span className="text-emerald-400">StatelessWidget</span> &#123;<br />
                        &nbsp;&nbsp;<span className="text-amber-300">@override</span><br />
                        &nbsp;&nbsp;<span className="text-emerald-400">Widget</span> <span className="text-violet-400">build</span>(<span className="text-emerald-400">BuildContext</span> context) &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-400">return</span> <span className="text-emerald-400">MaterialApp</span>(<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;theme: <span className="text-emerald-400">ThemeData</span>.dark(),<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;home: <span className="text-emerald-400">Scaffold</span>(<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body: <span className="text-emerald-400">ActiveSimulator</span>(<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;developer: <span className="text-zinc-300">"Rana Sheikh"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;company: <span className="text-zinc-300">"SM Technology"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;startedIn: <span className="text-zinc-300">"2023"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;);<br />
                        &nbsp;&nbsp;&#125;<br />
                        &#125;
                      </pre>
                    </div>

                    {/* Terminal Action Indicator */}
                    <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Compilation Ready</span>
                      <span className="font-sans font-medium text-violet-400 animate-pulse flex items-center gap-1 cursor-pointer" onClick={() => setViewMode("app")}>
                        Simulate <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="app-preview"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col bg-zinc-950 p-4"
                  >
                    {/* Simulated Mobile Frame Chrome */}
                    <div className="flex items-center justify-between px-2 pb-3 border-b border-zinc-900 mb-4">
                      <span className="text-xs font-semibold text-zinc-300">09:41</span>
                      {/* Speaker Notch */}
                      <div className="w-16 h-4.5 bg-zinc-900 rounded-full border border-zinc-800/80 flex items-center justify-center">
                        <div className="w-10 h-1.5 bg-black rounded-full" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-2.5 rounded-[2px] border border-zinc-300/80 flex items-center p-[1px]"><span className="w-full h-full bg-zinc-300" /></span>
                      </div>
                    </div>

                    {/* App UI Content */}
                    <div className="flex-1 flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 p-3 overflow-hidden text-left relative justify-between">
                      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-3">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">R</div>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-200">SM App Ecosystem</h4>
                          <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Session
                          </span>
                        </div>
                      </div>

                      {/* Mockup screen info */}
                      <div className="border border-zinc-800 bg-zinc-950/80 rounded-xl p-3.5 space-y-2 flex-1 flex flex-col justify-center">
                        <span className="text-[9px] text-cyan-400 font-mono block tracking-widest">DEVELOPER HIGHLIGHTS</span>
                        <div className="space-y-1.5 text-zinc-300 text-xs font-mono">
                          <p className="text-[10px] text-zinc-400">Name: <span className="text-white font-sans">Rana Sheikh</span></p>
                          <p className="text-[10px] text-zinc-400">Position: <span className="text-white font-sans">Flutter App Developer</span></p>
                          <p className="text-[10px] text-zinc-400">At: <span className="text-white font-sans">SM Technology</span></p>
                        </div>
                        <div className="w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mt-2" />
                      </div>

                      {/* App Control buttons bar */}
                      <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-800 bg-zinc-950 rounded-xl mt-3">
                        <span className="text-[8px] text-zinc-500 font-mono uppercase">Device Active</span>
                        <span className="text-[10px] font-semibold font-mono text-violet-400 flex items-center gap-1 cursor-pointer" onClick={() => setViewMode("code")}>
                          View Source <Code className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Timeline Section Removed */}
    </div>
  );
}
