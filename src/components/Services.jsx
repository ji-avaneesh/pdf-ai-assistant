import React from 'react';
import { 
  Sparkles, CheckCircle, Zap, Shield, MessageSquare, Terminal, 
  Search, FileText, Globe, Key, Layers, Server, Activity, ArrowRight
} from 'lucide-react';

export default function Services({ setCurrentView }) {
  
  const stats = [
    { value: "10M+", label: "Pages Processed" },
    { value: "99.8%", label: "Accuracy" },
    { value: "<2 sec", label: "Latency" },
    { value: "Enterprise", label: "Ready" }
  ];

  const services = [
    { icon: <FileText className="w-5 h-5 text-indigo-400" />, title: "AI Document Analysis", desc: "Scan complex legal briefs, engineering guides, and manuals. Extract core structures and definitions instantly." },
    { icon: <Search className="w-5 h-5 text-cyan-400" />, title: "Semantic Search", desc: "Query intent rather than keyword matches. Find exact answers deep within multi-page files." },
    { icon: <MessageSquare className="w-5 h-5 text-purple-400" />, title: "Document Summarization", desc: "Compress large text payloads into clean executive summaries and brief bullet matrices." },
    { icon: <Zap className="w-5 h-5 text-amber-400" />, title: "Question Answering", desc: "Interactive conversational Q&A threads backed by a strict system-instruction sandbox." },
    { icon: <Layers className="w-5 h-5 text-emerald-400" />, title: "OCR Processing", desc: "Multimodal extraction pipeline powered by Gemini Vision to process scanned charts, maps, and images." },
    { icon: <Globe className="w-5 h-5 text-pink-400" />, title: "Multi-language Support", desc: "Analyze documents and start conversations in English, Hindi, Hinglish, and other major dialects." },
    { icon: <Key className="w-5 h-5 text-rose-400" />, title: "Vector Search", desc: "Map textual representations into high-dimensional similarity vectors for low-latency retrieval." },
    { icon: <Terminal className="w-5 h-5 text-blue-400" />, title: "API Integration", desc: "Expose document vaults to remote queries and ingest data programmatically into active nodes." }
  ];

  const timeline = [
    { step: "01", title: "Upload", desc: "Securely drop PDF" },
    { step: "02", title: "Processing", desc: "Extract layouts & text" },
    { step: "03", title: "Embedding", desc: "Vector similarity map" },
    { step: "04", title: "Context", desc: "Lock query boundaries" },
    { step: "05", title: "AI Answers", desc: "Deliver citation response" }
  ];

  const advantages = [
    { title: "Research Grade Accuracy", desc: "Fact-locked context pipeline guarantees clean, citation-supported responses without hallucinations.", icon: <CheckCircle className="w-5 h-5 text-emerald-400" /> },
    { title: "Enterprise Security", desc: "Isolated environment partitions. Strict data lifecycles with automatic 15-day TTL sweeps.", icon: <Shield className="w-5 h-5 text-indigo-400" /> },
    { title: "Lightning Fast", desc: "Asynchronous Node.js indexing and parallel embedding sweeps return results in under 2 seconds.", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { title: "Scalable Infrastructure", desc: "Render container infrastructure built to scale seamlessly for large corporate workloads.", icon: <Server className="w-5 h-5 text-cyan-400" /> }
  ];

  const platforms = ["React", "Next.js", "Node.js", "OpenAI", "LangChain", "Pinecone", "Vercel", "AWS"];

  return (
    <div className="w-full bg-[#070b13] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* 🪄 Custom CSS Micro-animations */}
      <style>{`
        @keyframes fadeUpIn {
          0% { opacity: 0; transform: translate3d(0, 30px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-up {
          animation: fadeUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .glow-hover:hover {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.08);
          transform: translate3d(0, -3px, 0);
        }
      `}</style>

      {/* Floating Neon Aurora Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[1000px] right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[180px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28 relative z-10">

        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="text-center space-y-6 pt-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            AI Platform Services
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-100 max-w-4xl mx-auto">
            Everything You Need To Build <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Intelligent Document Workflows</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Deploy scalable document analysis services. Connect our robust API vectors to parse PDFs, index content chunks, and serve real-time semantic query loops.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => setCurrentView('landing')}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl transition-all duration-300 transform active:scale-[0.98]"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => setCurrentView('landing')}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300"
            >
              Console Login
            </button>
          </div>

          {/* Animated Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-12 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 shadow-lg"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            OUR SERVICES (8 Premium Cards)
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Core Services</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">High-performance computational modules ready for production workloads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="glow-hover border border-slate-800/80 bg-slate-950/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-[#070b13] border border-slate-800 rounded-xl w-fit text-slate-400 group-hover:border-indigo-500/20 group-hover:text-indigo-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 tracking-tight uppercase tracking-wide group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
                
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="mt-6 text-[10px] font-mono font-bold text-indigo-400 group-hover:text-white transition-colors flex items-center gap-1"
                >
                  LEARN MORE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            HOW OUR AI WORKS (Timeline)
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Pipeline Lifecycle</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">The algorithmic ingestion journey that powers our citation answers.</p>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto pt-4 relative">
            <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500/10 via-indigo-500/30 to-indigo-500/10 -translate-y-1/2 z-0"></div>
            {timeline.map((node, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/40 border border-slate-850 rounded-2xl p-5 text-center relative z-10 shadow-lg hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-indigo-400 mx-auto mb-4 group-hover:border-indigo-500/40 transition-colors">
                  {node.step}
                </div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">{node.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{node.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            WHY CHOOSE US
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Why Choose Us</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Designed for enterprise-tier Q&A precision and computational safety.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {advantages.map((adv, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 space-y-4 hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center group-hover:border-indigo-500/30 transition-all shrink-0">
                  {adv.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{adv.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            TECH STACK LOGO STRIP
            ======================================================== */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[9px] font-mono font-bold text-slate-650 uppercase tracking-widest">
            ENGINE BACKPLANE LOGICAL MATRIX
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 select-none">
            {platforms.map((plat, idx) => (
              <span 
                key={idx} 
                className="text-xs font-mono font-black text-slate-600 hover:text-indigo-400 transition-colors duration-300 cursor-pointer"
              >
                {plat.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================
            CTA SECTION
            ======================================================== */}
        <section className="text-center bg-gradient-to-b from-indigo-950/15 via-slate-950/20 to-transparent border border-indigo-950/20 rounded-3xl p-8 sm:p-14 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready To Build Smarter Workflows?
            </h2>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
              Experience dynamic AI-powered document search and vector summarization instantly. Set up a free developer sandbox session.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-650/15 shadow-xl transition-all duration-300 transform active:scale-[0.98]"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-6 py-4 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
