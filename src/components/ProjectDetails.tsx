import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, MonitorSmartphone, ArrowRight, Smartphone, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetails({ project: initialProject, onBack }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAppPopup, setShowAppPopup] = useState(false);

  const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!project.liveUrl || project.liveUrl === "#" || project.liveUrl === "") {
      e.preventDefault();
      setShowAppPopup(true);
    }
  };

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
            category: item.category || initialProject.category || "web",
            features: initialProject.features?.length ? initialProject.features : ["Full-stack implementation", "Responsive Design"],
            liveUrl: item.liveLink || "",
            githubUrl: item.github || "",
            images: item.images && item.images.length > 0 ? item.images : initialProject.images,
            glowColor: initialProject.glowColor || "rgba(139, 92, 246, 0.5)",
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

  // Auto-slider for images
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-100 pt-28 pb-20 px-4 md:px-10 relative overflow-hidden font-sans">
      
      <div className="max-w-[1250px] mx-auto relative z-10">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white mb-8 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          BACK
        </button>

        <div className="space-y-8">
          
          {/* Header Title & Actions */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {project.name}
            </h1>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={project.liveUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleAppClick}
                className="bg-zinc-100 hover:bg-white text-black font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer text-sm flex items-center gap-2.5 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                App Store
              </a>
              
              <a 
                href={project.liveUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleAppClick}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer text-sm flex items-center gap-2.5 shadow-lg border border-zinc-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                Google Play
              </a>
            </div>
          </div>

          {/* Horizontal Screenshots Carousel */}
          <div className="pt-6 pb-2">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar" 
              style={{ scrollbarWidth: 'none' }}
            >
              {project.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative shrink-0 snap-center w-[230px] md:w-[260px] aspect-[19.5/40] bg-black rounded-[2.5rem] p-1.5 shadow-2xl z-10 flex items-center justify-center border-[3px] border-[#434B5D]"
                  style={{
                    boxShadow: "inset 0 0 4px 1px rgba(255,255,255,0.2), 0 20px 40px -10px rgba(0,0,0,0.8)"
                  }}
                >
                  {/* Hardware Buttons */}
                  <div className="absolute -left-[5px] top-[15%] w-1 h-6 bg-[#434B5D] rounded-l-md" />
                  <div className="absolute -left-[5px] top-[22%] w-1 h-10 bg-[#434B5D] rounded-l-md" />
                  <div className="absolute -left-[5px] top-[30%] w-1 h-10 bg-[#434B5D] rounded-l-md" />
                  <div className="absolute -right-[5px] top-[25%] w-1 h-12 bg-[#434B5D] rounded-r-md" />

                  <div className="relative w-full h-full bg-zinc-900 rounded-[2.2rem] overflow-hidden border-[4px] border-black">
                    <img
                      src={img}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      alt={`Screenshot ${idx + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About this app */}
          <div className="space-y-4 pt-4 max-w-3xl">
            <div className="flex items-center justify-between cursor-pointer group">
              <h2 className="text-xl font-bold text-white">About this app</h2>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
              {project.description || project.tagline}
              {project.caseStudy && (
                <div className="mt-4 text-zinc-400">
                  <strong className="text-zinc-200">Key Features:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {project.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>

        </div>
      </div>
      <AnimatePresence>
        {showAppPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAppPopup(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowAppPopup(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">App Coming Soon</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  This application is currently not published on the App Store or Google Play yet. Stay tuned for the official release!
                </p>
                <button 
                  onClick={() => setShowAppPopup(false)}
                  className="mt-6 w-full py-3 bg-zinc-100 hover:bg-white text-black font-bold rounded-xl transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
