import React from 'react';
import { Shield, Lock, EyeOff, Globe, CheckCircle, Server, Send } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("🎉 Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#070b13] pt-16 pb-6 shrink-0 text-slate-400 font-sans text-sm relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* ग्लो इफेक्ट्स */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ----------------- मुख्य ग्रिड सेक्शन ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* कॉलम 1: ब्रांड और परिचय (जहाँ इमेज लोगो फिट किया है) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              {/* 🖼️ पुराना डिब्बा आइकॉन हटाकर यहाँ तुम्हारी भेजी हुई 3D इमेज सेट कर दी है */}
              <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-0.5 shadow-lg group-hover:border-indigo-500/40 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.3)] transition-all duration-300">
                <img
                  src="/footer-logo.png"
                  alt="PDF AI Assistant 3D Logo"
                  className="w-full h-full object-cover rounded-lg pointer-events-none"
                />
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">
                PDF AI <span className="text-indigo-500 font-medium">Assistant</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Your intelligent companion for understanding documents. Summarize, ask questions, and get reliable answers from any PDF in seconds.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">💬 Chat with any PDF</li>
              <li className="flex items-center gap-2">🔍 Extract insights instantly</li>
              <li className="flex items-center gap-2">⏱️ Summarize in seconds</li>
            </ul>

            {/* सोशल मीडिया आइकॉन्स */}
            <div className="flex items-center gap-3 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H8.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM4.169 7.488a2.074 2.074 0 1 1 .001-4.149 2.074 2.074 0 0 1 0 4.149zm1.782 12.964H2.384V9h3.567v11.452z"/></svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800/80 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              </a>
            </div>
          </div>

          {/* कॉलम 2: प्रोडक्ट */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">AI Chat</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Summarizer</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Translator</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">OCR Parse</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Citation Generator</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Notes & Highlights</button></li>
            </ul>
          </div>

          {/* कॉलम 3: सोलूशन्स */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Solutions</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Students</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Researchers</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Law Firms</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Healthcare</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Finance</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Enterprise</button></li>
            </ul>
          </div>

          {/* कॉलम 4: रिसोर्सेज */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Documentation</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">API Reference</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Pricing Plans</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">FAQ</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Blog</button></li>
              <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 transition-colors">Roadmap</button></li>
            </ul>
          </div>

          {/* कॉलम 5: न्यूज़लेटर */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-normal mb-1">Subscribe to our newsletter for tips, updates, and new features.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl focus-within:border-indigo-500 transition-all max-w-full">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent px-2.5 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg text-white transition-colors shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* ----------------- कंप्लायंस बैज बार ----------------- */}
        <div className="border-t border-slate-800/60 pt-6 pb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-slate-400">
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">Secure Upload</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Your files are safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">AES-256 Encryption</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Bank-level guard</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <EyeOff className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">No Data Selling</p>
              <p className="text-[9px] text-slate-500 mt-0.5">We respect privacy</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <Globe className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">GDPR Ready</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">SOC 2 Ready</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Enterprise security</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <Server className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-slate-200 leading-none">99.9% Uptime</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Reliable & available</p>
            </div>
          </div>
        </div>

        {/* ----------------- सबसे नीचे का कॉपीराइट बार ----------------- */}
        <div className="border-t border-slate-800/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 PDF AI Assistant. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-rose-500 text-sm">❤️</span> in India 🇮🇳
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#security" className="hover:text-slate-300 transition-colors">Security</a>
            <span>|</span>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
