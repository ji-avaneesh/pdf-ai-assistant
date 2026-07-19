import React, { useState } from 'react';
import { 
  Radio, Eye, Clock, ArrowUpRight, Download, Image as ImageIcon, 
  Search, Mail, Globe, Sparkles, Filter, ArrowLeft, CheckCircle, Send
} from 'lucide-react';

export default function Media({ setCurrentView }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const pressReleases = [
    { 
      date: "July 20, 2026", 
      tag: "Product Announcement", 
      source: "AI Newsroom", 
      title: "PDF AI Assistant Launches Full Multi-Tier Secure Integration Hub", 
      snippet: "Deploying high-speed vector models globally alongside a 15-day strict storage auto-purge protocol for security.",
      readTime: "3 min read",
      link: "https://github.com/ji-avaneesh/pdf-ai-assistant"
    },
    { 
      date: "June 14, 2026", 
      tag: "Technical Milestone", 
      source: "Tech Journal", 
      title: "MERN Framework Refactoring Completes Successfully with Low-Latency AWS Cluster Nodes", 
      snippet: "System speeds improve by 40% across North India networks following isolated infrastructure changes.",
      readTime: "4 min read",
      link: "https://github.com/ji-avaneesh/pdf-ai-assistant"
    },
    { 
      date: "May 02, 2026", 
      tag: "Feature Release", 
      source: "Product Updates", 
      title: "Multimodal Gemini 1.5 Flash OCR Fallback Integration Live", 
      snippet: "Enabling complete text extraction and interactive Q&A capabilities for scanned blueprints, handwriting, and image-based PDFs.",
      readTime: "2 min read",
      link: "https://github.com/ji-avaneesh/pdf-ai-assistant"
    },
    { 
      date: "March 18, 2026", 
      tag: "Security Audit", 
      source: "Enterprise Security", 
      title: "Successful AES-256 Vector Encryption Sandbox Verification", 
      snippet: "Complete independent security audit confirms zero data leaks or persistent cloud storage outside the 15-day TTL lifecycle.",
      readTime: "5 min read",
      link: "https://github.com/ji-avaneesh/pdf-ai-assistant"
    }
  ];

  const brandAssets = [
    { name: "Brand Logo Assets Pack", type: "ZIP / SVG / PNG", size: "2.4 MB", desc: "Dark and light themed logo marks, emblems, and horizontal lockups." },
    { name: "Product Mockups & UI Screenshots", type: "ZIP / High-Res PNG", size: "18.5 MB", desc: "Clean, frame-less mockups of the chat workspace and document vaults." },
    { name: "Press Kit Biography & FAQ", type: "PDF / Markdown", size: "1.1 MB", desc: "Company backgrounder, executive bios, and frequently asked press queries." }
  ];

  const handleDownload = (assetName) => {
    alert(`Starting download for "${assetName}" package. Pre-packaged ZIP payload generated!`);
  };

  const filteredReleases = pressReleases.filter(pr => {
    const matchesTab = activeTab === 'all' || pr.tag.toLowerCase().includes(activeTab) || pr.source.toLowerCase().includes(activeTab);
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pr.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full bg-[#070b13] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* 🪄 Embedded Smooth Custom Animations */}
      <style>{`
        @keyframes fadeUpIn {
          0% { opacity: 0; transform: translate3d(0, 30px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-up {
          animation: fadeUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .glow-hover:hover {
          border-color: rgba(244, 63, 94, 0.3);
          box-shadow: 0 0 25px rgba(244, 63, 94, 0.05);
          transform: translate3d(0, -3px, 0);
        }
      `}</style>

      {/* Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[1000px] left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[180px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">

        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="text-center space-y-6 pt-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono font-bold text-[10px] uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Newsroom & Brand Kit
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-100 max-w-4xl mx-auto">
            Our Latest Product Announcements <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">& Tech Milestones</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Follow the journey of PDF AI Assistant. Read press statements, download brand assets, and view structural system updates.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <a 
              href="#press-releases"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-xl shadow-rose-650/10 transition-all duration-300 transform active:scale-[0.98]"
            >
              Browse Releases
            </a>
            <button 
              onClick={() => setCurrentView('landing')}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300"
            >
              Console Terminal
            </button>
          </div>
        </section>

        {/* ========================================================
            PRESS RELEASES & FILTER SECTIONS
            ======================================================== */}
        <section id="press-releases" className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900 pb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Press Announcements</h2>
              <p className="text-xs text-slate-500 font-medium">Explore releases detailing vector infrastructure and Gemini OCR features.</p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..." 
                  className="w-full sm:w-60 bg-slate-950/60 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500/60 placeholder:text-slate-700 font-semibold"
                />
              </div>

              <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                {['all', 'announcement', 'milestone', 'release'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === tab ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15' : 'hover:text-slate-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((pr, idx) => (
                <div 
                  key={idx} 
                  className="glow-hover border border-slate-850 bg-slate-950/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-rose-500/80" /> {pr.date}</span>
                      <span className="text-rose-400 bg-rose-500/5 border border-rose-500/10 px-2 py-0.5 rounded">{pr.tag}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-200 group-hover:text-rose-400 transition-colors tracking-tight leading-snug">
                      {pr.title}
                    </h3>

                    <p className="text-xs text-slate-550 leading-relaxed font-medium">
                      {pr.snippet}
                    </p>
                  </div>

                  <div className="border-t border-slate-900/60 pt-5 mt-6 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-slate-650 uppercase tracking-widest">
                      Source: {pr.source} • {pr.readTime}
                    </span>
                    <a 
                      href={pr.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono font-bold text-rose-400 group-hover:text-white transition-colors flex items-center gap-1"
                    >
                      READ FULL <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 border border-dashed border-slate-850 rounded-2xl">
                <span className="text-xs text-slate-600 font-bold font-mono">NO RELEASES MATCHING SEARCH FILTER</span>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            IN THE NEWS FEATURED SECTION
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Featured Stories</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Explore technical reviews and layout discussions written by research communities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#0b1324]/30 border border-slate-850 rounded-2xl p-6 space-y-4 hover:border-slate-800 transition-colors shadow-lg">
              <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-widest">Academic Vector</span>
              <h4 className="text-sm font-bold text-slate-200 tracking-tight leading-snug">How PDF AI is changing student research & syllabus workflows</h4>
              <p className="text-[10px] text-slate-550 leading-relaxed font-medium">An analysis on utilizing context-locked embeddings to parse 400-page organic chemistry and mechanical textbooks instantly.</p>
            </div>

            <div className="bg-[#0b1324]/30 border border-slate-850 rounded-2xl p-6 space-y-4 hover:border-slate-800 transition-colors shadow-lg">
              <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Security Deep-dive</span>
              <h4 className="text-sm font-bold text-slate-200 tracking-tight leading-snug">Securing document contexts with isolated vector sandboxes</h4>
              <p className="text-[10px] text-slate-555 leading-relaxed font-medium">A structural audit detailing the 15-day TTL automated script that sweeps all temporary PDF text layers and user session lists.</p>
            </div>

            <div className="bg-[#0b1324]/30 border border-slate-855 rounded-2xl p-6 space-y-4 hover:border-slate-800 transition-colors shadow-lg">
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest">Model Comparison</span>
              <h4 className="text-sm font-bold text-slate-200 tracking-tight leading-snug">OCR transcription accuracy comparison: Gemini 1.5 vs standard vision parsers</h4>
              <p className="text-[10px] text-slate-555 leading-relaxed font-medium">Why the multimodal base64 OCR fallback handles nested technical tables, mathematical notations, and blurred layouts 2x cleaner.</p>
            </div>
          </div>
        </section>

        {/* ========================================================
            DOWNLOADABLE BRAND ASSETS
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Brand & Press Kit</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">Official downloadable assets for design integrations, publications, and references.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {brandAssets.map((asset, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300 shadow-md group"
              >
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl w-fit text-slate-400 group-hover:border-rose-500/20 group-hover:text-rose-400 transition-all">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 tracking-tight">{asset.name}</h4>
                  <p className="text-[10px] text-slate-555 leading-relaxed">{asset.desc}</p>
                </div>

                <div className="border-t border-slate-900 pt-4 mt-6 flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 select-none">
                  <span>{asset.type} • {asset.size}</span>
                  <button 
                    onClick={() => handleDownload(asset.name)}
                    className="p-2 bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                    aria-label={`Download ${asset.name}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            PRESS CONTACT CTA
            ======================================================== */}
        <section className="text-center bg-gradient-to-b from-rose-950/10 via-slate-950/20 to-transparent border border-rose-950/15 rounded-3xl p-8 sm:p-14 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
              Press Relations & Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-medium">
              Are you writing an article or need brand details? Drop a line directly to our email vector. We respond to all press, interview, and assets queries in under 12 hours.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:jiavaneesh399@gmail.com?subject=Press Inquiry - PDF AI Assistant&body=Hi Avaneesh, I am writing from [Media Publication]. I would like to inquire about..."
                className="px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 shadow-xl shadow-rose-650/15 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Contact Press Relations
              </a>
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-6 py-4 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return Home
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
