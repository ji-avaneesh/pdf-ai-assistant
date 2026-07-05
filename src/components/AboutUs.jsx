import React from 'react';
import { Sparkles, CheckCircle, Shield, Cpu, Database, Server } from 'lucide-react';

const INFRASTRUCTURE_NODES = [
  { icon: <Cpu className="w-5 h-5 text-indigo-400" />, title: "MERN Stack Core Architecture", desc: "Decoupled pipeline routing served via asynchronous Node.js streams and high-performance React runtime contexts." },
  { icon: <Sparkles className="w-5 h-5 text-cyan-400" />, title: "Generative Text Embeddings", desc: "Deep layout alignment utilizing state-of-the-art semantic text chunking and LLM contextual indexing." },
  { icon: <Server className="w-5 h-5 text-emerald-400" />, title: "AWS Mumbai Cloud Edge", desc: "Low-latency remote computation matrix deploying database queries inside secure container segments." },
  { icon: <Database className="w-5 h-5 text-amber-400" />, title: "15-Day TTL Security Protocol", desc: "Strict algorithmic data lifecycle compliance that automatically sweeps storage paths clean after 15 days." }
];

export default function AboutUs({ setCurrentView }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 animate-fadeIn space-y-12">
      {/* Platform Banner */}
      <div className="text-center bg-gradient-to-b from-slate-800/40 to-slate-900/10 border border-slate-800 rounded-3xl p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs mb-4 uppercase tracking-wider">
          🌐 System Manifest
        </div>
        <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent mb-3">
          About PDF AI Assistant
        </h2>
        <p className="text-indigo-400 font-medium tracking-wide text-xs sm:text-sm uppercase">The Next-Generation Intelligence Engine for Researchers</p>
      </div>

      {/* Abstract Mission */}
      <div className="bg-slate-800/30 backdrop-blur-md border-l-4 border-indigo-500 rounded-2xl p-6 sm:p-8 border border-slate-800 relative group">
        <h3 className="text-md font-bold text-slate-200 mb-3 flex items-center gap-2">🎯 Core Platform Vector</h3>
        <p className="text-sm text-slate-400 leading-relaxed font-normal tracking-wide">
          Engineered specifically to solve the problem of information overload, PDF AI Assistant transforms boring, massive, static documents into interactive knowledge vectors. Whether you are an engineering student preparing for exams or a researcher scanning complex technical papers, our platform reads behind the lines to deliver precise answers in milliseconds.
        </p>
      </div>

      {/* Infrastructure Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 border-l-2 border-indigo-500 pl-3">Architecture & Compliance Node Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INFRASTRUCTURE_NODES.map((node, idx) => (
            <div key={idx} className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6 flex gap-4 items-start hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-300 group">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 group-hover:border-indigo-500/30 transition-colors shrink-0">
                {node.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{node.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{node.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button onClick={() => setCurrentView('landing')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/10">
          ← Return to Console
        </button>
      </div>
    </div>
  );
}
