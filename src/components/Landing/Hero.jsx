import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ currentText, setIsSignupMode, setShowAuthModal, setCurrentView }) {
  return (
    <div className="max-w-4xl mx-auto px-4 text-center pt-20 pb-12 relative">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-xs mb-6 tracking-wide uppercase">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI-Powered PDF Summaries
      </div>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none h-[140px] sm:h-[160px]">
        Understand PDFs <br className="mb-2"/>
        <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.3)]">
          10X Better <span className="text-white font-light font-mono">|</span> {currentText}
        </span>
      </h1>

      <div className="max-w-2xl mx-auto mb-12 relative group">
        <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-2xl"></div>
        <div className="relative bg-slate-900/60 backdrop-blur-md border-l-4 border-indigo-500 rounded-xl p-5 border border-slate-800 text-left flex items-start gap-4 shadow-xl">
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed tracking-wide">
            Summarize, ask questions, and get reliable answers from any PDF in seconds. <span className="text-indigo-400 font-semibold block sm:inline mt-1 sm:mt-0">Perfect for students and engineering researchers.</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-xl group transition-all"
        >
          Sign up Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setCurrentView('toolkit')}
          className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700/50 text-sm transition-all"
        >
          Explore Toolkit
        </button>
      </div>
    </div>
  );
}
