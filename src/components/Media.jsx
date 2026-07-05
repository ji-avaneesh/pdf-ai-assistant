import React from 'react';
import { Eye, Clock, ArrowUpRight, Radio } from 'lucide-react';

const MEDIA_RELEASES = [
  { date: "July 2026", tag: "Ecosystem Release", title: "PDF AI Assistant Launches Full Multi-Tier Secure Integration Hub", snippet: "Deploying high-speed vector models globally alongside a 15-day strict storage auto-purge protocol for security." },
  { date: "May 2026", tag: "Tech Stack", title: "MERN Framework Refactoring Completes Successfully with Low-Latency AWS Cluster Nodes", snippet: "System speeds improve by 40% across North India networks following isolated infrastructure changes." }
];

export default function Media({ setCurrentView }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 animate-fadeIn space-y-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> Newsroom Terminal
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Media Releases</h2>
      </div>

      <div className="space-y-6">
        {MEDIA_RELEASES.map((press, idx) => (
          <div key={idx} className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/40 hover:border-slate-700 transition-all group flex flex-col sm:flex-row gap-4 justify-between items-start">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3 text-[10px] font-bold tracking-wider uppercase">
                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {press.date}</span>
                <span className="text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-md">{press.tag}</span>
              </div>
              <h3 className="text-base font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{press.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{press.snippet}</p>
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-white group-hover:border-indigo-500/30 transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => setCurrentView('landing')} className="px-5 py-2.5 bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold transition-all">
          ← Return Home
        </button>
      </div>
    </div>
  );
}
