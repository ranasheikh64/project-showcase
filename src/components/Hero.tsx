import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Smartphone, Terminal, Code } from "lucide-react";
import { Project } from "../types";

interface HeroProps {
  onSelectProject?: (project: Project) => void;
}

export default function Hero({ onSelectProject }: HeroProps) {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://portfolio-backend-qcpy.vercel.app/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Map to Project type and show all
          const mappedProjects: Project[] = data.map((item: any, idx: number) => ({
            id: item._id,
            name: item.name,
            tagline: item.details ? item.details.substring(0, 50) + "..." : "Project Details",
            description: item.details || "",
            technologies: ["Flutter", "Dart", "Firebase"],
            category: item.category || "mobile",
            features: ["Full-stack implementation", "Responsive Design"],
            liveUrl: item.liveLink || "",
            githubUrl: item.github || "",
            images: item.images && item.images.length > 0 ? item.images : ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"],
            glowColor: idx % 3 === 0 ? "rgba(139, 92, 246, 0.5)" : idx % 3 === 1 ? "rgba(6, 182, 212, 0.5)" : "rgba(59, 130, 246, 0.5)",
          }));
          setProjectsData(mappedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects for hero:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative bg-black text-white min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-10 overflow-hidden">

      {/* Dynamic Background Glows for each column */}
      <div className="absolute top-1/2 left-1/6 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/6 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-[1250px] mx-auto w-full px-4 md:px-10 z-10 flex-1 flex flex-col justify-center">

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <span className="text-zinc-500 text-sm font-mono animate-pulse">Loading Projects...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12 items-end">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                {/* Top Icons */}
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141420] border border-zinc-800/60 flex items-center justify-center text-violet-400 shadow-lg">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#141420] border border-zinc-800/60 flex items-center justify-center text-violet-400 shadow-lg">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-zinc-400 font-medium text-sm md:text-base tracking-wide mb-3 text-center">
                  {project.name}
                </h3>

                {/* Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a2e] border border-blue-900/40 text-blue-400 text-[10px] font-mono mb-8">
                  <Code className="w-3 h-3" />
                  Developed in Flutter
                </div>

                {/* iPhone Simulator Mockup */}
                <div
                  className="relative w-full max-w-[280px] aspect-[19.5/40] bg-black rounded-[2.5rem] p-1.5 shadow-2xl transition-all duration-500 border-[3px] border-[#434B5D] cursor-pointer group-hover:-translate-y-2 group-hover:shadow-3xl"
                  style={{
                    boxShadow: hoveredIndex === index
                      ? `0 30px 60px -15px ${project.glowColor}, inset 0 0 4px 1px rgba(255,255,255,0.2)`
                      : "inset 0 0 4px 1px rgba(255,255,255,0.2), 0 20px 40px -10px rgba(0,0,0,0.8)"
                  }}
                  onClick={() => onSelectProject && onSelectProject(project)}
                >
                  {/* Hardware Buttons */}
                  <div className="absolute -left-[5px] top-[15%] w-1 h-6 bg-[#434B5D] rounded-l-md" /> {/* Mute */}
                  <div className="absolute -left-[5px] top-[22%] w-1 h-10 bg-[#434B5D] rounded-l-md" /> {/* Volume Up */}
                  <div className="absolute -left-[5px] top-[30%] w-1 h-10 bg-[#434B5D] rounded-l-md" /> {/* Volume Down */}
                  <div className="absolute -right-[5px] top-[25%] w-1 h-12 bg-[#434B5D] rounded-r-md" /> {/* Power */}

                  <div className="relative w-full h-full bg-zinc-900 rounded-[2.2rem] overflow-hidden border-[4px] border-black">
                    {/* Project Screen Image */}
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={carouselIndex % project.images.length}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        src={project.images[carouselIndex % project.images.length]}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={project.name}
                      />
                    </AnimatePresence>

                    {/* Overlay & View Details Button */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-30"
                        >
                          <motion.button
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="px-5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white text-xs font-semibold shadow-xl"
                          >
                            View Details
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
