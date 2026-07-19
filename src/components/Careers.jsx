import React from 'react';
import { 
  Briefcase, ArrowRight, Sparkles, Code, Globe, Clock, 
  BookOpen, TrendingUp, Award, CheckCircle, MessageSquare, Shield,
  Heart, Compass, Target, Bookmark
} from 'lucide-react';

export default function Careers({ setCurrentView }) {

  const whyWorkHere = [
    { title: "Remote Friendly", desc: "Collaborate from anywhere. We support asynchronous communication and distributed engineering.", icon: <Globe className="w-5 h-5 text-indigo-400" /> },
    { title: "Learning Budget", desc: "Access premium coursework, books, and conference passes with an annual education stipend.", icon: <BookOpen className="w-5 h-5 text-cyan-400" /> },
    { title: "Flexible Hours", desc: "Control your work calendar. We prioritize focus hours, quality deliverables, and healthy rest cycles.", icon: <Clock className="w-5 h-5 text-purple-400" /> },
    { title: "Latest AI Technologies", desc: "Deploy pipelines utilizing Gemini, OpenAI API, high-speed vector grids, and modular stacks.", icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { title: "Global Team", desc: "Join an international cohort of researchers, UI specialists, and backplane developers.", icon: <Compass className="w-5 h-5 text-emerald-400" /> },
    { title: "Career Growth", desc: "Clear promotion pathways, code authorship credits, and rapid product launch cycles.", icon: <TrendingUp className="w-5 h-5 text-pink-400" /> }
  ];

  const cultureTimeline = [
    { name: "Innovation", desc: "We continuously push layout boundaries and vector chunking math." },
    { name: "Ownership", desc: "Every engineer designs, builds, and deploys their own code routes." },
    { name: "Learning", desc: "We host weekly pipeline review sessions and academic paper reviews." },
    { name: "Collaboration", desc: "Cross-functional pair programming and open architectural discussions." },
    { name: "Impact", desc: "We optimize workflows for millions of pages and actual active users daily." }
  ];

  const openPositions = [
    { 
      title: "Senior Full-Stack Engineer", 
      dept: "Engineering", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "4+ Years Experience",
      salary: "₹18L - ₹24L per annum",
      stack: "React, Node.js, Express, MongoDB, AWS",
      desc: "Architect scalable document retrieval pipelines, design robust React layouts, and optimize backend caching."
    },
    { 
      title: "AI Pipeline Integration Engineer", 
      dept: "Core Intelligence", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "2+ Years Experience",
      salary: "₹15L - ₹20L per annum",
      stack: "Python, OpenAI API, LangChain, Vector Embeddings",
      desc: "Implement semantic chunking logic, interface vector database clusters, and program custom LLM instruction templates."
    }
  ];

  const hiringSteps = [
    { title: "Apply", desc: "Submit your resume, profile metrics, and repository link." },
    { title: "Resume Review", desc: "Our engineering leads inspect your coding style and past workflows." },
    { title: "Technical Interview", desc: "Deep dive coding session building a modular node or pipeline." },
    { title: "Final Discussion", desc: "Align on cultural parameters, role expectations, and roadmaps." },
    { title: "Offer", desc: "Welcome to the PDF AI Assistant core intelligence team!" }
  ];

  const benefits = [
    { title: "Competitive Salary", desc: "Top-tier compensation grids reflecting skills and code quality." },
    { title: "Remote Work", desc: "Complete home office stipend to buy screens, seats, and fast fiber." },
    { title: "Paid Leave", desc: "Generous vacation parameters, parent leaves, and focus breaks." },
    { title: "AI Research", desc: "Dedicated work hours to experiment with new multimodal frameworks." },
    { title: "Learning Budget", desc: "Subsidized courses, technical books, and bootcamp accesses." },
    { title: "Health Benefits", desc: "Comprehensive health and wellness coverage plans." }
  ];

  const testimonials = [
    { quote: "The engineering ownership here is unmatched. I can build, test, and ship a major backend pipeline improvement to staging in the same afternoon.", employee: "Rahul Sharma", role: "Full-Stack Engineer" },
    { quote: "Every week we review the latest AI research papers and update our vector chunking models accordingly. It's an incredible learning loop.", employee: "Priya Nair", role: "AI Research Lead" }
  ];

  const handleApplyClick = (jobTitle) => {
    alert(`Applying for "${jobTitle}"! Please forward your repository link and profile metrics to support@pdfaiassistant.com.`);
  };

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
        .glow-border-hover:hover {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.08);
          transform: translate3d(0, -3px, 0);
        }
      `}</style>

      {/* Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28 relative z-10">

        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="text-center space-y-6 pt-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Join Our Team
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-100 max-w-4xl mx-auto">
            Build The Future Of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">AI Document Research</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Help us redefine how humans interact with documents using artificial intelligence. We are seeking creative engineers who love building performant, low-latency code.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <a 
              href="#open-roles"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl transition-all duration-300 transform active:scale-[0.98]"
            >
              View Open Roles
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
            WHY WORK HERE (6 Cards)
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Why Work With Us</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Engineered to support developer flow, wellness, and professional impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyWorkHere.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/30 border border-slate-850 rounded-2xl p-6 space-y-4 hover:border-indigo-500/20 hover:bg-indigo-950/5 transition-all duration-300 group"
              >
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-fit text-slate-400 group-hover:border-indigo-500/25 group-hover:text-indigo-400 transition-colors">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            OUR CULTURE (Horizontal timeline)
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Cultural Tenets</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">The principles we look for in every new engineering node.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto pt-4 relative">
            <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500/10 via-indigo-500/30 to-indigo-500/10 -translate-y-1/2 z-0"></div>
            {cultureTimeline.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/40 border border-slate-850 rounded-2xl p-5 text-center relative z-10 shadow-lg hover:border-indigo-500/35 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-[10px] font-mono font-bold text-indigo-400 mx-auto mb-4 group-hover:border-indigo-500/40 transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">{item.name}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            OPEN POSITIONS (Premium Cards)
            ======================================================== */}
        <section id="open-roles" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Active Job Openings</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Build, deploy, and scale the document intelligence backplane with us.</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((job, idx) => (
              <div 
                key={idx} 
                className="glow-border-hover border border-slate-850 bg-slate-950/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-indigo-400 transition-colors tracking-tight">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider select-none">
                      <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5 text-indigo-400" /> {job.dept}</span>
                      <span>•</span>
                      <span>📍 {job.loc}</span>
                      <span>•</span>
                      <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">{job.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => handleApplyClick(job.title)}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 border border-indigo-550 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-indigo-600/10"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => alert(`Saved "${job.title}" to saved jobs list!`)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                      aria-label="Save Job"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {job.desc}
                </p>

                <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono text-slate-500 font-bold select-none uppercase tracking-wider">
                  <span>💼 {job.exp}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>💰 {job.salary}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-slate-400">Stack: {job.stack}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            HIRING PROCESS
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Our Hiring Flow</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">From application to offer: a simple 5-step evaluation protocol.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 max-w-5xl mx-auto text-center">
            {hiringSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl relative shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-slate-200 tracking-tight mb-1 uppercase tracking-wider">{step.title}</h4>
                <p className="text-[10px] text-slate-550 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            EMPLOYEE BENEFITS
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Employee Benefits</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">We take care of the essentials so you can focus on building.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl flex gap-3.5 items-start hover:border-slate-800 transition-colors shadow-md"
              >
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-550 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            TESTIMONIALS
            ======================================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Employee Testimonials</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Hear what our core engineers say about our daily work culture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1324]/30 border border-slate-850/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl"
              >
                <p className="text-xs sm:text-sm text-slate-350 italic leading-relaxed font-medium">
                  "{test.quote}"
                </p>
                <div className="border-t border-slate-900/60 pt-4 mt-6 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-200">{test.employee}</span>
                  <span className="text-[9px] font-mono text-slate-550 font-bold uppercase tracking-wider">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            FINAL CTA
            ======================================================== */}
        <section className="text-center bg-gradient-to-b from-indigo-950/15 via-slate-950/20 to-transparent border border-indigo-950/20 rounded-3xl p-8 sm:p-14 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready To Shape The Future Of AI?
            </h2>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-medium">
              Join our engineering node to build fast, beautiful, and secure context vector parsers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="#open-roles"
                className="px-8 py-4 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-650/15 shadow-xl transition-all duration-300 transform active:scale-[0.98]"
              >
                Join Our Team Today
              </a>
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-6 py-4 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                Contact HR
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

