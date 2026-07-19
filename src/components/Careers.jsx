import React, { useState } from 'react';
import { 
  Briefcase, ArrowRight, Sparkles, Code, Globe, Clock, 
  BookOpen, TrendingUp, Award, CheckCircle, MessageSquare, Shield,
  Heart, Compass, Target, Bookmark, X, Send, User, Mail, Phone, Briefcase as JobIcon, Link as LinkIcon
} from 'lucide-react';

export default function Careers({ setCurrentView }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: 'Fresher',
    portfolio: '',
    resume: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      title: "Frontend Engineer (Fresher / Entry Level)", 
      dept: "Engineering", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "Fresher / 0-1 Yr Experience",
      salary: "₹6L - ₹10L per annum",
      stack: "React, Tailwind CSS, JavaScript, Vite",
      desc: "Build highly responsive user interfaces, craft futuristic glassmorphism designs, and optimize chat stream rendering performance."
    },
    { 
      title: "Backend Engineer (Fresher / Entry Level)", 
      dept: "Engineering", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "Fresher / 0-1 Yr Experience",
      salary: "₹6L - ₹10L per annum",
      stack: "Node.js, Express, MongoDB, REST APIs",
      desc: "Implement backend servers, maintain JWT credentials authentication protocols, and build document upload pipelines."
    },
    { 
      title: "Full-Stack AI Engineer", 
      dept: "Core AI & Systems", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "0-2 Years Experience",
      salary: "₹12L - ₹18L per annum",
      stack: "React, Node.js, Python, OpenAI API, Gemini API, Vector DBs",
      desc: "Architect multimodal PDF parsing fallback sequences, design vector indexing models, and connect LLM context boundaries."
    },
    { 
      title: "Data Scientist & Analytics Engineer", 
      dept: "Data Science", 
      loc: "Remote / Noida Node", 
      type: "Full-Time",
      exp: "0-2 Years Experience",
      salary: "₹10L - ₹15L per annum",
      stack: "Python, Pandas, SQL, Dataform, Text Analytics",
      desc: "Analyze vector data clusters, design semantic chunking metrics, and optimize transcription accuracy parameters."
    }
  ];

  const hiringSteps = [
    { title: "Apply", desc: "Submit your resume, profile metrics, and repository link." },
    { title: "Resume Review", desc: "Our engineering leads inspect your coding style and past workflows." },
    { title: "Technical Interview", desc: "Deep dive coding session building a modular node or pipeline." },
    { title: "Final Discussion", desc: "Align on cultural expectations, salary parameters, and roadmaps." },
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

  const openApplyModal = (jobTitle) => {
    setFormData(prev => ({ ...prev, role: jobTitle }));
    setIsSubmitted(false);
    setShowApplyModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct email subject and body for mailto link
    const subject = encodeURIComponent(`Job Application: ${formData.role} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Avaneesh,\n\n` +
      `Here is a new job application submitted on PDF AI Assistant website:\n\n` +
      `Candidate Name: ${formData.name}\n` +
      `Email Address: ${formData.email}\n` +
      `Phone Number: ${formData.phone || 'Not provided'}\n` +
      `Position Applied: ${formData.role}\n` +
      `Experience Level: ${formData.experience}\n` +
      `GitHub/Portfolio Link: ${formData.portfolio}\n` +
      `Resume URL / Link: ${formData.resume || 'Not provided'}\n\n` +
      `Cover Letter / Additional Notes:\n` +
      `"${formData.notes || 'None'}"\n\n` +
      `Please review the application and respond back to the candidate at ${formData.email}.\n\n` +
      `Best regards,\n` +
      `PDF AI Careers Portal`
    );

    // Trigger local mailto dispatch to the requested email address
    window.location.href = `mailto:jiavaneesh399@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
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
                className="bg-[#0b1324]/30 border border-slate-855 rounded-2xl p-6 space-y-4 hover:border-indigo-500/20 hover:bg-indigo-955/5 transition-all duration-300 group"
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
                      onClick={() => openApplyModal(job.title)}
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
                  <span className="text-slate-400 font-sans">Stack: {job.stack}</span>
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
                <p className="text-[10px] text-slate-555 leading-relaxed">{step.desc}</p>
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
                  <p className="text-[10px] text-slate-555 leading-relaxed font-medium">{item.desc}</p>
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
                  <span className="text-[9px] font-mono text-slate-555 font-bold uppercase tracking-wider">{test.role}</span>
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
              <a 
                href="mailto:jiavaneesh399@gmail.com?subject=HR Inquiry - PDF AI Assistant Careers&body=Hi, I am interested in exploring engineering roles at PDF AI Assistant. Here is my profile details..."
                className="px-6 py-4 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center"
              >
                Contact HR
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================
          INTERACTIVE HIRING APPLICATION MODAL
          ======================================================== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-[#0b1324] border border-slate-800/90 w-full max-w-xl rounded-2xl p-6 sm:p-8 relative shadow-2xl my-8">
            
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-5 right-5 text-slate-550 hover:text-slate-200 transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[9px] uppercase tracking-widest mb-2">
                    Hiring Portal
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Submit Candidate Metrics</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Submit your coding parameters directly to our HR vector</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                      <input 
                        type="text" 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Avaneesh Kumar" 
                        className="w-full bg-slate-950 border border-slate-800/85 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                      <input 
                        type="email" 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="candidate@gmail.com" 
                        className="w-full bg-slate-950 border border-slate-800/85 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 99999 99999" 
                        className="w-full bg-slate-950 border border-slate-800/85 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Position *</label>
                    <div className="relative">
                      <JobIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                      <select 
                        required
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800/85 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 font-semibold appearance-none"
                      >
                        {openPositions.map((job, idx) => (
                          <option key={idx} value={job.title} className="bg-[#0b1324]">{job.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Experience Tier *</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800/85 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 font-semibold appearance-none"
                    >
                      <option value="Fresher" className="bg-[#0b1324]">Fresher (0 - 1 Year)</option>
                      <option value="1-2 Years" className="bg-[#0b1324]">Junior (1 - 2 Years)</option>
                      <option value="3+ Years" className="bg-[#0b1324]">Senior (3+ Years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">GitHub / Portfolio Link *</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-650" />
                      <input 
                        type="url" 
                        required 
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://github.com/your-username" 
                        className="w-full bg-slate-950 border border-slate-800/85 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Resume Link / Cloud Drive URL</label>
                  <input 
                    type="url" 
                    name="resume"
                    value={formData.resume}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/file/d/your-resume-link" 
                    className="w-full bg-slate-950 border border-slate-800/85 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notes / Pitch</label>
                  <textarea 
                    rows="3"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Briefly state why you're a good fit for this role..." 
                    className="w-full bg-slate-950 border border-slate-800/85 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-700 font-semibold resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.99] mt-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Application
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto shadow-xl">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">Application Structured!</h3>
                  <p className="text-xs text-slate-450 leading-relaxed max-w-sm mx-auto">
                    We have generated your metrics. Please click the button below to open your email client and send the pre-filled dispatch directly to **jiavaneesh399@gmail.com**.
                  </p>
                </div>

                <div className="flex justify-center gap-3.5 pt-2">
                  <button 
                    onClick={() => {
                      const subject = encodeURIComponent(`Job Application: ${formData.role} - ${formData.name}`);
                      const body = encodeURIComponent(
                        `Hello Avaneesh,\n\n` +
                        `Here is my job application details:\n\n` +
                        `Name: ${formData.name}\n` +
                        `Email: ${formData.email}\n` +
                        `Phone: ${formData.phone || 'Not provided'}\n` +
                        `Role: ${formData.role}\n` +
                        `Experience: ${formData.experience}\n` +
                        `GitHub/Portfolio: ${formData.portfolio}\n` +
                        `Resume URL: ${formData.resume || 'Not provided'}\n\n` +
                        `Notes:\n` +
                        `"${formData.notes || 'None'}"`
                      );
                      window.location.href = `mailto:jiavaneesh399@gmail.com?subject=${subject}&body=${body}`;
                    }}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-550 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    Open Mail Client <Send className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                  >
                    Close Portal
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
