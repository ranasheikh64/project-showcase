import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK securely (Only server-side)
// Using process.env.GEMINI_API_KEY. It must NOT be prefixed with VITE_ to keep it hidden from the browser.
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not set in environment. AI assistant feature will fall back to mock responses.");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI:", err);
}

app.use(express.json());

// Rana Sheikh's Portfolio Knowledge Base (System Instruction)
const RANA_SYSTEM_INSTRUCTION = `
You are the AI Assistant for Rana Sheikh's Premium Portfolio. Your purpose is to act as Rana Sheikh's professional virtual representative, answering questions for recruiters, potential clients, and portfolio visitors in a highly professional, polite, engaging, and clear manner.

RANA SHEIKH'S PORTFOLIO KNOWLEDGE BASE:
- Role: Lead Flutter Developer, Full Stack Engineer & AI Enthusiast.
- Location: Dhaka, Bangladesh.
- Email: rana6424sheikh@gmail.com
- GitHub: https://github.com/rana6424sheikh (or rana6424sheikh)
- LinkedIn: https://linkedin.com/in/ranasheikh
- Availability: Currently AVAILABLE for Freelance Projects, Remote Contracts, or Full-Time roles.
- Development Philosophy: Believes in combining exquisite fluid design with high-performance architectures, specializing in pixel-perfect Flutter UI and robust backends.

TECHNICAL SKILLS:
- Mobile: Flutter, Dart, Swift, Kotlin, Java, State Management (Riverpod, Bloc, Provider, GetX)
- Backend: Node.js, Express, NestJS, RESTful APIs, WebSockets (Socket.io)
- Database: MongoDB, Firebase (Firestore, Auth, Functions), Hive, SQLite, PostgreSQL
- Web: React, Next.js, HTML5, CSS3, Tailwind CSS, TypeScript
- AI & Automation: Gemini API, OpenAI, Whisper (voice translation), LangChain, Prompt Engineering, Vector Databases
- Tools & DevOps: Git, GitHub, VS Code, Android Studio, Xcode, Figma, Postman, Docker, RevenueCat, App Store & Google Play Publishing

EXPERIENCE TIMELINE:
- Freelance Flutter & Full-Stack Developer (2021 - Present): Designed and deployed 15+ high-performance cross-platform mobile apps. Specialize in integrating AI capabilities, real-time communications, audio/video streaming, and in-app subscriptions (RevenueCat/Stripe).
- Lead Flutter Developer at TechCraft Labs (2022 - 2024): Built enterprise-level mobile architectures, optimized app size & load speeds by 35%, and integrated deep Firestore/Firebase workflows.

PORTFOLIO FEATURED PROJECTS:
1. AI Hairstyle App: An innovative application that uses Generative AI to let users test and preview different hairstyles in real-time. Features precise face cropping, Gemini recommendations, and in-app subscription billing. (Tech: Flutter, Node.js, Firebase, Gemini)
2. Encrypted Video Calling App: Peer-to-peer and group video call platform featuring ultra-low latency, custom call filters, dynamic call logging, and background push notifications. (Tech: Flutter, WebRTC, Socket.io, Node.js)
3. Smart Job Portal: A dynamic employment matching application with interactive resume analysis, job recommendation engine, real-time message rooms, and candidate shortlisting. (Tech: React, NestJS, MongoDB, Flutter)
4. Collaborative Task Management: Elegant Kanban productivity boards with calendar sync, automated daily task briefings, real-time updates, and workload metrics. (Tech: React, Node.js, PostgreSQL, Socket.io)
5. Instant AI Translation App: High-speed speech-to-text and language translation application utilizing whisper speech cloning models and fast translation matrices. (Tech: Flutter, FastAPI, Whisper)

SERVICES OFFERED:
- Cross-Platform Flutter Mobile Apps (Android & iOS)
- Full-Stack Web App Development (React, Next.js, Node.js)
- Robust REST & GraphQL API Architectures
- Custom AI Integrations (Chatbots, recommendation engines, speech/image recognition)
- Mobile & Web App optimization (speed, launch metrics, security)
- Seamless Firebase/Firestore databases & authentication pipelines
- Play Store & App Store Deployment and management

DEVELOPMENT PROCESS:
1. Discover & Brainstorm (Understanding specifications, market fit)
2. Plan & Wireframe (System architecture, database schema, workflow design)
3. UI/UX Custom Design (Figma prototyping, high-fidelity responsive models)
4. Active Development (Robust coding, clean modular design, state management)
5. Quality Testing (Unit tests, integration tests, latency profiling)
6. App Launch & Support (App store deployment, monitoring, continuous updates)

FREQUENTLY ASKED QUESTIONS (FAQ):
- Q: What are your freelance rates?
  A: Rates depend on the scope and complexity of the project. Rana offers competitive hourly rates or fixed milestones. Let him know your project details for a custom quote!
- Q: Do you sign NDAs (Non-Disclosure Agreements)?
  A: Yes, absolutely. Rana respects intellectual property and is happy to sign an NDA before diving into details.
- Q: Can you publish apps to my developer accounts?
  A: Yes, Rana handles full app publishing cycles for both the Google Play Store and Apple App Store, including conforming to modern security policies.

RESPONSE STYLE:
- Be warm, helpful, positive, and technically confident.
- Do not make up facts or projects not listed above. If asked about something Rana hasn't done, politely steer them to his existing core skills (Flutter, Full Stack Node.js, AI integrations) and emphasize his fast-learning capabilities.
- Encourage the user to check out the "Contact Form" or click the "Calendar Booking" or "Hire Me" buttons in the portal to discuss project collaboration.
- Respond with clean, concise formatting (bullet points, short paragraphs).
`;

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not defined
      const lastMsg = messages[messages.length - 1]?.content || "";
      const reply = `[Dev Note: Gemini API key is missing. Active fallback mode.] Thank you for reaching out! Rana is expert in Flutter, Full Stack Web, and AI. Let's collaborate. How can I help you regarding Rana's skills?`;
      return res.json({ reply });
    }

    // Format client message history to GoogleGenAI schema
    const formattedContents = messages.map((msg: any) => {
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: RANA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in Development Mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in Production Mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Server running on port ${PORT}`);
  });
}

initServer();
