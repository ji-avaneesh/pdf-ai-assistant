import React from 'react';
import { Briefcase, ArrowRight, Sparkles, Code } from 'lucide-react';

const OPEN_POSITIONS = [
  { title: "Full-Stack System Engineer Intern", department: "Engineering", location: "Remote / Noida Node", structure: "Full-Time" },
  { title: "AI Pipeline Integration Specialist", department: "Core Intelligence", location: "Noida Dev Hub", structure: "Contract" }
];

export default function Careers({ setCurrentView }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 animate-fadeIn space-y-12 selection:bg-indigo-500 selection:text-white">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Engineering Ecosystem
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Scale With Us</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">We are indexing brilliant minds to deploy optimized knowledge parsers and complex data architectures.</p>
      </div>

      <div className="space-y-4">
        {OPEN_POSITIONS.map((job, idx) => (
          <div key={idx} className="bg-slate-900/30 backdrop-blur-sm border border-slate-850 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-indigo-500/30 hover:bg-[#0b1324]/20 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer shadow-md">
            <div className="space-y-2.5">
              <h3 className="text-base font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium font-mono select-none">
                <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5 text-indigo-400" /> {job.department}</span>
                <span>•</span>
                <span>📍 {job.location}</span>
                <span>•</span>
                <span className="text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-md border border-indigo-500/10">{job.structure}</span>
              </div>
            </div>
            <button
              onClick={() => alert("Application router active! Forward your repository link and profile metrics to support@pdfaiassistant.com.")}
              className="px-4 py-2.5 bg-slate-950 border border-slate-850 hover:border-indigo-500/40 hover:bg-slate-900 text-slate-300 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shrink-0 active:scale-95 shadow-md"
            >
              Apply Metrics <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={() => setCurrentView('landing')} 
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md"
        >
          ← Back to Core Console
        </button>
      </div>
    </div>
  );
}
