export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: "all" | "mobile" | "backend" | "ai" | "web";
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideo?: string;
  caseStudy?: string;
  glowColor: string;
  images: string[];
}

export interface Skill {
  name: string;
  level: number; // percentage
  icon: string;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  points: string[];
  techUsed: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  glowColor: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
