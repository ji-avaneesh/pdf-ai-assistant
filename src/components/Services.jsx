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
    <div className="w-full max-w-5xl mx-auto px-4 py-16 animate-fadeIn space-y-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          🛠️ Services Console
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Technical Capabilities</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">Production-grade automated pipelines engineered for precision text processing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICE_LIST.map((service, idx) => (
          <div key={idx} className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-fit mb-4 group-hover:border-cyan-500/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-1.5 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{service.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Active System</span>
              <span className="font-mono">Cluster::v1.0.4</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => setCurrentView('landing')} className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to Console Terminal
        </button>
      </div>
    </div>
  );
}
