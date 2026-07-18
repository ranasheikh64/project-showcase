import React, { useEffect, useState } from "react";
import { ArrowLeft, Github, Globe, Smartphone, ShieldCheck, Cpu, Code, BookOpen, Layers, Sparkles } from "lucide-react";
import { Project } from "../types";
import ImageCarousel from "./ImageCarousel";

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetails({ project: initialProject, onBack }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [loading, setLoading] = useState(false);

  // Auto-scroll to top when details screen mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const fetchSingleProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://portfolio-backend-qcpy.vercel.app/api/projects/${initialProject.id}`);
        if (response.ok) {
          const item = await response.json();
          setProject({
            id: item._id,
            name: item.name,
            tagline: item.details ? item.details.substring(0, 50) + "..." : "Project Details",
            description: item.details || "",
            technologies: initialProject.technologies?.length ? initialProject.technologies : ["React", "Node.js", "MongoDB"],
            category: "web",
            features: initialProject.features?.length ? initialProject.features : ["Full-stack implementation", "Responsive Design"],
            liveUrl: item.liveLink || "",
            githubUrl: item.github || "",
            images: item.images && item.images.length > 0 ? item.images : initialProject.images,
            glowColor: initialProject.glowColor || "rgba(6, 182, 212, 0.5)",
          });
        }
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSingleProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProject.id]);


  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-28 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* Background radial glow accents */}
      <div 
        className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-700" 
        style={{ backgroundColor: project.glowColor }}
      />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white mb-8 px-4 py-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO ALL MASTERPIECES
        </button>

        {/* Project Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Title, Interactive Carousel, Features & Specs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Title Area */}
            <div className="space-y-3 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
                  {project.category.toUpperCase()} ARCHITECTURE
                </span>
                <span className="text-[10px] font-mono text-zinc-500">•</span>
                <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                  Verified Showcase
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {project.name}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Prominent High-Fidelity Image Carousel */}
            <div 
              className="rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl relative"
              style={{
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px ${project.glowColor}10`
              }}
            >
              <ImageCarousel images={project.images} heightClass="h-64 sm:h-[380px]" autoPlayInterval={5000} />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-zinc-800/80 rounded-xl px-3 py-1.5 flex items-center gap-1.5 z-10 pointer-events-none">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-zinc-300">INTERACTIVE IMAGE ROTATION</span>
              </div>
            </div>

            {/* Description & Engineering Case Study */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6 text-left backdrop-blur-xl">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-violet-400" />
                  Product Overview
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.caseStudy && (
                <div className="border-t border-zinc-900 pt-6 space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-cyan-400" />
                    Engineering Case Study
                  </h3>
                  <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-900 font-mono text-xs text-zinc-300 leading-relaxed relative overflow-hidden">
                    {/* Visual coding background accent */}
                    <div className="absolute right-2 bottom-2 text-zinc-800/30 font-black text-6xl select-none pointer-events-none font-mono">
                      {"</>"}
                    </div>
                    {project.caseStudy}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Meta Information, Technologies, Action Buttons */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Core Action & Deployment links */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-5 backdrop-blur-xl shadow-xl">
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">
                LAUNCH CENTER
              </span>
              
              <div className="space-y-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3.5 py-4 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-zinc-700 text-white font-bold text-xs transition-all shadow-md active:scale-95 text-center cursor-pointer"
                >
                  <Github className="h-4.5 w-4.5 text-zinc-400" />
                  Explore Repository Code
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3.5 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg active:scale-95 text-center cursor-pointer"
                  >
                    <Globe className="h-4.5 w-4.5" />
                    Launch Live Production Demo
                  </a>
                )}
              </div>

              <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  GPL Licensed
                </span>
                <span>Production Grade</span>
              </div>
            </div>

            {/* Core Architecture and Specs */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-3">
                  SYSTEM CORE TECHNOLOGY
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 text-xs font-semibold font-mono flex items-center gap-1.5"
                    >
                      <Cpu className="h-3 w-3 text-cyan-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-900 pt-5 space-y-4">
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">
                  KEY REQUISITES & CAPABILITIES
                </span>
                
                <div className="space-y-3">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400">
                      <div className="h-5 w-5 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center shrink-0 text-violet-400 font-bold font-mono text-[10px]">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed pt-0.5">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Interactive Dev Sandbox Sandbox Simulator Info */}
            <div className="border border-zinc-900/60 bg-gradient-to-br from-zinc-950 to-black rounded-3xl p-6 text-zinc-500 text-xs space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                  SIMULATOR TELEMETRY
                </span>
              </div>
              <p className="leading-relaxed">
                This staging node displays mock metrics. If you are interested in deploying or white-labeling this product, please consult <strong className="text-zinc-300">Rana Sheikh</strong> directly.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:rana6424sheikh@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-white font-mono hover:underline cursor-pointer"
                >
                  Request Integration Call →
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
