import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Smartphone, Terminal, Code, Info, X } from "lucide-react";
import { Project } from "../types";

interface HeroProps {
  onSelectProject?: (project: Project) => void;
}

const ProjectCard = ({ 
  project, 
  index, 
  onSelectProject, 
  hoveredIndex, 
  setHoveredIndex, 
  carouselIndex,
  onShowAlert
}: { 
  project: Project;
  index: number;
  onSelectProject?: (p: Project) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  carouselIndex: number;
  onShowAlert: (msg: string) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInCenter, setIsInCenter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInCenter(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // Trigger when center of element is near center of screen
        threshold: 0
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleStoreClick = (e: React.MouseEvent, link?: string, storeName?: string) => {
    e.stopPropagation();
    if (link) {
      window.open(link, "_blank");
    } else {
      onShowAlert(`${storeName} link not available yet!`);
    }
  };

  const showOverlay = (isMobile && isInCenter) || (!isMobile && hoveredIndex === index);

  return (
    <motion.div
      ref={cardRef}
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
          boxShadow: showOverlay
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
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 z-30"
              >
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white text-xs font-semibold shadow-xl"
                  onClick={() => onSelectProject && onSelectProject(project)}
                >
                  View Details
                </motion.button>
                
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex gap-2 mt-1"
                >
                  <button 
                    onClick={(e) => handleStoreClick(e, project.googlePlayStoreLink, "Google Play Store")}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 hover:bg-zinc-800 transition-colors text-white text-[10px] font-semibold"
                  >
                    <svg viewBox="0 0 512 512" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                    Play Store
                  </button>
                  <button 
                    onClick={(e) => handleStoreClick(e, project.appleAppStoreLink, "Apple App Store")}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 hover:bg-zinc-800 transition-colors text-white text-[10px] font-semibold"
                  >
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-3.5 h-3.5 mb-[1px]">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    App Store
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function Hero({ onSelectProject }: HeroProps) {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto hide alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

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
            googlePlayStoreLink: item.googlePlayStoreLink || "",
            appleAppStoreLink: item.appleAppStoreLink || "",
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

      {/* Custom Alert Dialog */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setAlertMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#11111a] border border-zinc-800/60 p-6 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center relative overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-violet-500/20 rounded-full blur-[50px] pointer-events-none" />
              
              <button 
                onClick={() => setAlertMessage(null)}
                className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 text-violet-400">
                <Info className="w-6 h-6" />
              </div>
              
              <h4 className="text-white text-lg font-semibold mb-2">Notice</h4>
              <p className="text-zinc-400 text-center text-sm mb-6">{alertMessage}</p>
              
              <button 
                onClick={() => setAlertMessage(null)}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors text-white text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-[1250px] mx-auto w-full px-4 md:px-10 z-10 flex-1 flex flex-col justify-center">

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <span className="text-zinc-500 text-sm font-mono animate-pulse">Loading Projects...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12 items-end">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                onSelectProject={onSelectProject}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                carouselIndex={carouselIndex}
                onShowAlert={setAlertMessage}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
