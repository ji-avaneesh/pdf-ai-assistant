import React from 'react';
import { Sparkles, CheckCircle, Zap, Shield, MessageSquare, Terminal } from 'lucide-react';

const SERVICE_LIST = [
  { icon: <Terminal className="w-5 h-5 text-indigo-400" />, title: "Automated Data Extraction", desc: "Utilizes optimized algorithmic parsing to cleanly pull unstructured tables, schema values, and metadata." },
  { icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, title: "Dynamic Text Conversions", desc: "Cross-platform document restructuring, compressing large asset arrays down to light scalable footprints." },
  { icon: <Sparkles className="w-5 h-5 text-emerald-400" />, title: "Contextual AI Synthesis", desc: "Advanced semantic mapping using secure enterprise model tokens for isolated, fact-based Q&A." },
  { icon: <Shield className="w-5 h-5 text-amber-400" />, title: "Vector Vault Security", desc: "Isolated environment spaces protecting memory allocations with end-to-end payload encryption layers." }
];

export default function Services({ setCurrentView }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 animate-fadeIn space-y-12 selection:bg-indigo-500 selection:text-white">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          🛠️ Services Console
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Technical Capabilities</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">Production-grade automated pipelines engineered for precision text processing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICE_LIST.map((service, idx) => (
          <div key={idx} className="bg-slate-900/30 backdrop-blur-sm border border-slate-850 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/25 hover:bg-[#0b1324]/20 hover:-translate-y-1 transition-all duration-300 group shadow-lg cursor-pointer">
            <div>
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl w-fit mb-4.5 group-hover:border-cyan-500/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{service.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-medium select-none">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Active System</span>
              <span className="font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-850">Cluster::v1.0.4</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={() => setCurrentView('landing')} 
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md"
        >
          ← Back to Console Terminal
        </button>
      </div>
    </div>
  );
}
