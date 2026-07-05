import React from 'react';
import { Briefcase, ArrowRight, Sparkles, Code } from 'lucide-react';

const OPEN_POSITIONS = [
  { title: "Full-Stack System Engineer Intern", department: "Engineering", location: "Remote / Noida Node", structure: "Full-Time" },
  { title: "AI Pipeline Integration Specialist", department: "Core Intelligence", location: "Noida Dev Hub", structure: "Contract" }
];

export default function Careers({ setCurrentView }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 animate-fadeIn space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Engineering Ecosystem
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Scale With Us</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">We are indexing brilliant minds to deploy optimized knowledge parsers and complex data architectures.</p>
      </div>

      <div className="space-y-4">
        {OPEN_POSITIONS.map((job, idx) => (
          <div key={idx} className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-300 group">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> {job.department}</span>
                <span>•</span>
                <span>📍 {job.location}</span>
                <span>•</span>
                <span className="text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-md border border-indigo-500/10">{job.structure}</span>
              </div>
            </div>
            <button
              onClick={() => alert("Application router active! Forward your repository link and profile metrics to support@pdfaiassistant.com.")}
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs transition-all flex items-center gap-2 shrink-0 group-hover:translate-x-0.5"
            >
              Apply Metrics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => setCurrentView('landing')} className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to Core Console
        </button>
      </div>
    </div>
  );
}
