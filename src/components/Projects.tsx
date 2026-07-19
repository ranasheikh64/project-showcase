import React, { useState, useEffect } from "react";
import { Search, Globe, Github, BookOpen, Smartphone, Play, ArrowRight, Sparkles } from "lucide-react";
import { Project } from "../types";
import ImageCarousel from "./ImageCarousel";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://portfolio-backend-qcpy.vercel.app/api/projects");
        if (response.ok) {
          const data = await response.json();
          const mappedProjects: Project[] = data.map((item: any) => ({
            id: item._id,
            name: item.name,
            tagline: item.details ? item.details.substring(0, 50) + "..." : "Project Details",
            description: item.details || "",
            technologies: ["React", "Node.js", "MongoDB"], // Default placeholder since API lacks it
            category: item.category || "web",
            features: ["Full-stack implementation", "Responsive Design"],
            liveUrl: item.liveLink || "",
            githubUrl: item.github || "",
            images: item.images && item.images.length > 0 ? item.images : ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"],
            glowColor: "rgba(6, 182, 212, 0.5)", 
          }));
          setProjectsData(mappedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);


  // Filter projects based on Search input AND category filter
  const filteredProjects = projectsData.filter((proj) => {
    const matchesSearch =
      proj.name.toLowerCase().includes(search.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(search.toLowerCase()) ||
      proj.technologies.some((tech) => tech.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = filter === "all" || proj.category === filter;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "All Masterpieces" },
    { value: "mobile", label: "Mobile Apps (Flutter)" },
    { value: "web", label: "Web Dashboards" }
  ];

  return (
    <section id="projects" className="py-24 bg-black px-4 md:px-10 relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">01 // PORTFOLIO SHOWCASE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Featured Masterpieces</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center bg-zinc-950/80 border border-zinc-900 rounded-3xl p-4 mb-12 shadow-2xl backdrop-blur-xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat.value
                    ? "bg-zinc-900 border border-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tech (e.g. Flutter)..."
              className="w-full bg-zinc-900 text-sm text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-800 px-10 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 bg-zinc-950 border border-zinc-900 rounded-3xl">
            <span className="text-zinc-500 text-sm font-mono block animate-pulse">Loading projects...</span>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group relative flex flex-col bg-zinc-950 border border-zinc-900/85 rounded-3xl overflow-hidden hover:border-zinc-850 hover:bg-zinc-950 transition-all shadow-xl hover:shadow-violet-950/5 min-h-[440px] justify-between cursor-pointer active:scale-[0.99] duration-300"
                style={{
                  boxShadow: `0 0 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                }}
              >
                {/* Embedded self-scrolling interactive image carousel inside card */}
                <div className="relative overflow-hidden h-52 w-full border-b border-zinc-900">
                  <ImageCarousel 
                    images={proj.images} 
                    heightClass="h-full" 
                    autoPlayInterval={4000 + Math.random() * 2000} 
                    isMobile={proj.category === "mobile"}
                  />
                  
                  {/* Category overlay badge */}
                  <div className="absolute top-4 left-4 z-10 bg-black/85 backdrop-blur-md border border-zinc-900 px-2.5 py-1 rounded-lg text-[8px] font-mono font-black text-cyan-400 tracking-wider uppercase">
                    {proj.category}
                  </div>

                  {/* Technology visual indicator overlay */}
                  <div className="absolute bottom-3 left-4 z-10 bg-black/80 backdrop-blur-sm border border-zinc-900/80 px-2.5 py-1 rounded-lg text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                    <span className="h-1 w-1 bg-cyan-400 rounded-full animate-ping" />
                    Interactive Slides
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-black text-zinc-100 group-hover:text-white transition-colors">
                        {proj.name}
                      </h3>
                      {/* Standard device icon indicators */}
                      {proj.category === "mobile" ? (
                        <Smartphone className="h-4.5 w-4.5 text-cyan-500 shrink-0 mt-1" />
                      ) : (
                        <Globe className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Short features bullets */}
                    <ul className="space-y-1.5 text-xs text-zinc-500 pt-1">
                      {proj.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="h-1 w-1 bg-cyan-400 rounded-full mt-1.5 shrink-0" />
                          <span className="line-clamp-1 text-[11px]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies tags & details action footer inside card */}
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono font-bold rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 4 && (
                        <span className="text-[9px] font-mono text-zinc-500 px-1 py-1">
                          +{proj.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action controls footer */}
                    <div className="border-t border-zinc-900/80 pt-4 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 hover:text-zinc-300 font-semibold group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                        View Detailed Screen <ArrowRight className="h-3 w-3 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
                        Explore Mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950 border border-zinc-900 rounded-3xl">
            <span className="text-zinc-500 text-sm font-mono block">No matches found for "{search}"</span>
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-4 text-xs font-semibold text-cyan-400 hover:underline"
            >
              Clear Search filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
