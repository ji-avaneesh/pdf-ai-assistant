import React from 'react';
import { 
  Sparkles, CheckCircle, Shield, Cpu, Database, Server, 
  ArrowRight, Lock, FileText, Layers, Search, Award, 
  Zap, Workflow, RefreshCw, ChevronRight, Activity, Terminal
} from 'lucide-react';

export default function AboutUs({ setCurrentView }) {
  
  const stats = [
    { value: "10M+", label: "Pages Processed", desc: "Across academic, legal, and engineering fields" },
    { value: "99.8%", label: "Answer Accuracy", desc: "Fact-locked context semantic parsing engine" },
    { value: "<2 sec", label: "Response Time", desc: "Ultra-low latency vector query pipelines" },
    { value: "24/7", label: "Cloud Availability", desc: "Distributed server-edge container status" }
  ];

  const storySteps = [
    { 
      type: "The Problem", 
      title: "Information Overload & Time Waste", 
      desc: "Researchers, developers, and compliance officers spend up to 40% of their workday scanning, searching, and copying text from massive, dense PDF manuals or blueprints.", 
      color: "from-rose-500/10 to-transparent", 
      borderColor: "border-rose-500/20",
      tagColor: "text-rose-400 bg-rose-500/10"
    },
    { 
      type: "Our Solution", 
      title: "Context-Locked Interactive Conversation", 
      desc: "An intelligent parser that maps documents to multi-dimensional vector embeddings, allowing you to ask queries in plain language and receive fact-accurate citations instantly.", 
      color: "from-indigo-500/10 to-transparent", 
      borderColor: "border-indigo-500/20",
      tagColor: "text-indigo-400 bg-indigo-500/10"
    },
    { 
      type: "Our Mission", 
      title: "Making Every Page Conversational", 
      desc: "We build tools that democratize deep contextual document learning, allowing builders, students, and legal professionals to absorb domain knowledge instantly.", 
      color: "from-purple-500/10 to-transparent", 
      borderColor: "border-purple-500/20",
      tagColor: "text-purple-400 bg-purple-500/10"
    }
  ];

  const timeline = [
    { step: "01", title: "Upload PDF", desc: "Drag & drop your blueprint, contract, or textbook into the sandbox vault." },
    { step: "02", title: "AI Reads & OCRs", desc: "Gemini Vision OCR transcribes raw layouts, scanned graphics, and text characters." },
    { step: "03", title: "Semantic Embeddings", desc: "Text is broken into optimized semantic chunks and indexed securely into our vector model." },
    { step: "04", title: "Natural Querying", desc: "Ask questions, cross-reference tables, or retrieve summaries in plain human language." },
    { step: "05", title: "Instant Citations", desc: "Receive immediate, accurate, bulleted answers linked directly to original content sources." }
  ];

  const techStack = [
    { icon: <Cpu className="w-5 h-5 text-indigo-400" />, title: "MERN Stack Pipeline", desc: "Decoupled pipeline routing served via asynchronous Node.js streams and high-performance React runtime contexts." },
    { icon: <Sparkles className="w-5 h-5 text-cyan-400" />, title: "Generative Embeddings", desc: "Deep layout alignment utilizing state-of-the-art semantic text chunking and LLM contextual indexing." },
    { icon: <Search className="w-5 h-5 text-purple-400" />, title: "Semantic Search Engine", desc: "Context-aware similarity mapping that searches for intent rather than simple literal keyword matching." },
    { icon: <Layers className="w-5 h-5 text-amber-400" />, title: "Vision OCR Fallback", desc: "Multimodal OCR powered by Gemini 1.5 Flash to automatically transcribe image-only PDF layouts." },
    { icon: <Server className="w-5 h-5 text-emerald-400" />, title: "Mumbai Cloud Edge", desc: "Low-latency remote computation matrix deploying database queries inside secure container segments." },
    { icon: <Shield className="w-5 h-5 text-rose-400" />, title: "TTL Data Security", desc: "Strict algorithmic data lifecycle compliance that automatically sweeps storage paths clean after 15 days." }
  ];

  const values = [
    { title: "Privacy First", desc: "Your documents remain yours. Your data is isolated, never used for training models, and fully encrypted in transit.", icon: <Lock className="w-5 h-5 text-indigo-400" /> },
    { title: "Research Grade Accuracy", desc: "No hallucinations. Our vector search answers are strictly fact-locked, citing only the contents of your uploaded documents.", icon: <Award className="w-5 h-5 text-emerald-400" /> },
    { title: "Lightning Fast Pipelines", desc: "Optimized parsing infrastructure delivers context-rich summaries and responses in less than 2 seconds.", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { title: "Continuous Innovation", desc: "Always upgrading. We continually iterate our model pipeline to support multi-modal formats and larger token limits.", icon: <RefreshCw className="w-5 h-5 text-cyan-400" /> }
  ];

  const platforms = [
    { name: "React", desc: "Frontend" },
    { name: "Node.js", desc: "Backend" },
    { name: "OpenAI", desc: "LLM Orchestration" },
    { name: "LangChain", desc: "Vector Pipelines" },
    { name: "Pinecone", desc: "Vector Store" },
    { name: "Vercel", desc: "Deployment" },
    { name: "AWS", desc: "Cloud Hosting" }
  ];

  const testimonials = [
    { quote: "Saved me hours of searching through complex structural blueprints. The fact-locked responses are exactly what engineers need.", author: "Siddharth Mehta", role: "Structural Engineer" },
    { quote: "The smartest PDF assistant I've used. The speed and layout accuracy of scanned images via the OCR fallback is unmatched.", author: "Ananya Iyer", role: "AI Software Developer" },
    { quote: "Perfect for compliance checks and legal drafts review. Finding specific clauses used to take hours, now it's instantaneous.", author: "Vikram Malhotra", role: "Legal Analyst" }
  ];

  const securityPoints = [
    { title: "AES-256 Encryption", desc: "Data encrypted at rest and in transit." },
    { title: "15-Day Auto-TTL Sweep", desc: "Zero persistent storage for peace of mind." },
    { title: "Private Isolated Sandboxes", desc: "Your files never mix with public instances." },
    { title: "Compliant Data Practices", desc: "Adherence to industry-standard data security guidelines." }
  ];

  return (
    <div className="w-full bg-[#070b13] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* 🪄 Embedded Smooth Custom Animations */}
      <style>{`
        @keyframes fadeUpIn {
          0% { opacity: 0; transform: translate3d(0, 30px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes neonPulse {
          0%, 100% { border-color: rgba(99, 102, 241, 0.25); box-shadow: 0 0 15px rgba(99, 102, 241, 0.05); }
          50% { border-color: rgba(99, 102, 241, 0.5); box-shadow: 0 0 30px rgba(99, 102, 241, 0.15); }
        }
        .animate-fade-up {
          animation: fadeUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .glow-card:hover {
          animation: neonPulse 2s infinite;
        }
        .timeline-progress::after {
          content: '';
          position: absolute;
          background: linear-gradient(to bottom, transparent, #4f46e5, transparent);
          width: 2px;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Background Neon Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28 relative z-10">

        {/* ========================================================
            SECTION 1: Premium Hero
            ======================================================== */}
        <section className="text-center space-y-8 pt-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            AI Research Platform
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-100 max-w-4xl mx-auto">
            Reimagining the Way Humans <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Interact with Documents</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            PDF AI Assistant is an enterprise-grade document intelligence network. Upload complex research manuscripts, legal dossiers, or data blueprints and start context-locked Q&A threads in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => setCurrentView('landing')}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-650/15 shadow-xl transition-all duration-300 flex items-center gap-2 group active:scale-[0.98]"
            >
              Get Started Free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#how-it-works"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center"
            >
              Learn More
            </a>
          </div>

          {/* Animated Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-12 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-slate-900/60 to-slate-950/40 border border-slate-800/80 rounded-2xl p-5 sm:p-6 text-center shadow-lg hover:border-indigo-500/25 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-2 tracking-wide uppercase font-mono">
                  {stat.label}
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 2: Our Story (Storytelling)
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Mission & Blueprint</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Designing the pipeline to bridge human questions with deep layout data vectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {storySteps.map((story, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-b ${story.color} border ${story.borderColor} rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-indigo-500/35 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="space-y-4 relative z-10">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-widest uppercase ${story.tagColor}`}>
                    {story.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-200 tracking-tight leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-455 leading-relaxed font-medium">
                    {story.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: How It Works (Timeline)
            ======================================================== */}
        <section id="how-it-works" className="space-y-12 relative">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">How it Works</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">The algorithmic journey of your document from raw PDF to responsive chat nodes.</p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:grid grid-cols-5 gap-6 max-w-5xl mx-auto pt-6 relative">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500/10 via-indigo-500/40 to-indigo-500/10 -translate-y-1/2 z-0"></div>
            {timeline.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/40 border border-slate-800/80 rounded-2xl p-5 text-center relative z-10 hover:border-indigo-500/35 transition-all duration-300 group hover:-translate-y-2 shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-black text-indigo-400 mx-auto mb-4 group-hover:border-indigo-500/50 shadow-md transition-colors">
                  {item.step}
                </div>
                <h4 className="text-xs font-bold text-slate-200 tracking-tight mb-2 uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden space-y-6 max-w-xl mx-auto relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-500/20">
            {timeline.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/30 border border-slate-800/60 rounded-xl p-5 relative hover:border-indigo-500/20 transition-all shadow-md"
              >
                <div className="absolute -left-[29px] top-4 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500/40 flex items-center justify-center text-[9px] font-black text-indigo-400 font-mono">
                  {item.step}
                </div>
                <h4 className="text-xs font-mono font-bold text-slate-200 mb-1.5 uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 4: Technology Stack
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Enterprise Infrastructure Stack</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Engineered using state-of-the-art modular stack layers for optimal responses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech, idx) => (
              <div 
                key={idx} 
                className="glow-card border border-slate-800/80 bg-slate-950/40 hover:bg-slate-900/10 rounded-2xl p-6 flex gap-4 items-start shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 group-hover:border-indigo-500/30 group-hover:text-indigo-400 transition-all duration-300 shrink-0">
                  {tech.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 tracking-tight group-hover:text-indigo-400 transition-colors uppercase tracking-wide">
                    {tech.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: Core Values
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Core Values</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">The principles that govern our codebase design and system rules.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/50 backdrop-blur-md border border-slate-900/60 rounded-2xl p-6 flex flex-col gap-4 shadow-xl hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center group-hover:border-indigo-500/30 transition-all duration-300 shrink-0">
                  {val.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 tracking-tight uppercase tracking-wider">
                    {val.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: Trust Section
            ======================================================== */}
        <section className="space-y-8 text-center max-w-4xl mx-auto">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            Powered by World-Class Tech Infrastructure
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 pt-3 select-none">
            {platforms.map((platform, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center group cursor-pointer"
              >
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-600 group-hover:text-indigo-400 transition-colors duration-300 font-mono">
                  {platform.name}
                </span>
                <span className="text-[8px] font-mono font-bold text-slate-700 mt-1 uppercase tracking-widest">
                  {platform.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 7: Testimonials
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Loved by Researchers & Engineers</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">See how professional teams and academics accelerate scanning times.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-[#0b1324]/30 to-transparent border border-slate-800/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-indigo-500/25 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="text-amber-500 text-xs tracking-wider select-none">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-medium italic">
                    "{test.quote}"
                  </p>
                </div>
                <div className="border-t border-slate-900/60 pt-4 mt-6 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-200">{test.author}</span>
                  <span className="text-[9px] font-mono text-slate-550 font-bold tracking-wider uppercase">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 8: Security
            ======================================================== */}
        <section className="bg-gradient-to-b from-slate-950 to-[#070b13] border border-slate-800/80 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-[9px] uppercase tracking-widest">
                <Shield className="w-3 h-3" />
                Security Protocols
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Enterprise Grade Privacy & Compliance
              </h3>
              <p className="text-xs text-slate-450 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Your data is strictly sandboxed. We follow industry best practices to ensure your uploaded document assets are processed without risk of leaks.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityPoints.map((sec, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900/20 border border-slate-850 p-4 rounded-xl flex gap-3 items-start hover:border-slate-800 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-200 tracking-tight">{sec.title}</h4>
                    <p className="text-[10px] text-slate-550 font-medium leading-normal">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 9: Final CTA
            ======================================================== */}
        <section className="text-center bg-gradient-to-b from-indigo-950/15 via-slate-950/20 to-transparent border border-indigo-950/20 rounded-3xl p-8 sm:p-14 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="space-y-6 max-w-2xl mx-auto animate-pulse [animation-duration:8s]">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Transform Your PDFs?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Experience the future of AI-powered document intelligence. Start a console session and ask questions naturally.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-650/15 shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-6 py-4 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                Return to Console
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
