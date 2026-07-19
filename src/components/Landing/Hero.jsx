import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ currentText, setIsSignupMode, setShowAuthModal, setCurrentView }) {
  // 3D mouse move tilt state configurations
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-12 lg:py-20 overflow-hidden bg-[#070b13] selection:bg-indigo-500 selection:text-white">

      {/* 🪄 Optimized 3D motion path (Left-Top Rotation + 4x Smooth Elastic Bounce) */}
      <style>{`
        @keyframes lagFree3DBounce {
          0% {
            transform: translate3d(-800px, -500px, 0) rotate(-360deg) scale(0.5);
            opacity: 0;
          }
          /* 1st Bounce: राइट साइड पर पहली ज़ोरदार लैंडिंग */
          32% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          /* 2nd Bounce: पहला उछाल (ऊपर उठना) */
          48% {
            transform: translate3d(0, -95px, 0) rotate(4deg);
          }
          62% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          /* 3rd Bounce: दूसरा उछाल (मध्यम) */
          74% {
            transform: translate3d(0, -40px, 0) rotate(-2deg);
          }
          84% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          /* 4th Bounce: तीसरा उछाल (छोटा सा) */
          91% {
            transform: translate3d(0, -15px, 0) rotate(1deg);
          }
          96% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          /* एकदम स्थिर हो जाना */
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }
        .animate-optimizedBounce {
          animation: lagFree3DBounce 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Ambient background accent lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Hero grid container layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Side: Call to Action and dynamic copy */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 z-20">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-100">
            Turn Documents <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              into Conversations
            </span>
          </h1>

          {/* Dynamic typing visual effect */}
          <div className="h-10 text-xl font-bold text-indigo-400 flex items-center justify-center lg:justify-start gap-1">
            <span>Analyze PDFs</span>
            <span className="text-white bg-indigo-600/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-lg shadow-inner">
              {currentText}
            </span>
            <span className="w-1 h-6 bg-indigo-500 animate-blink"></span>
          </div>

          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Upload complex technical blueprints, academic research papers, or legal drafts. Extract instant abstract summaries and context-locked analysis strings immediately.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Explore Toolkit Action Button */}
            <button
              onClick={() => setCurrentView('toolkit')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2.5 group shadow-lg"
            >
              <div className="w-4 h-4 rounded bg-slate-950 overflow-hidden border border-slate-700/60 group-hover:border-indigo-500/50 transition-colors shrink-0">
                <img src="/footer-logo.png" alt="mini logo" className="w-full h-full object-cover pointer-events-none" />
              </div>
              Explore Toolkit
            </button>
          </div>
        </div> {/* End of Left Side Panel */}

        {/* Right Side: 3D Interactive Hover Asset */}
        <div className="lg:col-span-7 flex items-center justify-center w-full z-10">
          <div
            className="relative w-full max-w-[600px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-2xl p-1.5 bg-gradient-to-tr from-indigo-500/10 to-transparent border border-slate-800/80 shadow-2xl transition-all duration-200 ease-out cursor-grab active:cursor-grabbing animate-optimizedBounce"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Illustrated Image Asset */}
              <img
                src="/hero-illustration.png"
                alt="PDF AI Assistant 3D Device View"
                className="w-full h-auto rounded-xl shadow-2xl pointer-events-none filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                style={{ transform: "translateZ(30px)" }}
              />

              {/* Neon Aura Glow */}
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Code Preview Terminal Window Section */}
      <div className="w-full max-w-5xl mx-auto mt-20 px-4 relative z-20">
        <div className="bg-[#0b1324] border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-indigo-500/30 transition-all duration-300">

          {/* Terminal Window Header Bar */}
          <div className="bg-[#070b13]/80 border-b border-slate-800/60 px-5 py-3.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-lg"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-lg"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-lg"></span>
              <span className="text-xs font-mono text-slate-500 font-bold ml-2 tracking-wide">
                Interactive_Preview_Dashboard.env
              </span>
            </div>
            {/* Live Connection Status Badge */}
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
              SYSTEM_CORE: ACTIVE
            </div>
          </div>

          {/* Terminal Window Main Frame */}
          <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center bg-gradient-to-b from-[#0b1324] to-[#080d1a]">

            {/* Drag & Drop File Upload Zone */}
            <div className="lg:col-span-3 border-2 border-dashed border-slate-800/80 group-hover:border-indigo-500/30 rounded-2xl p-10 bg-slate-950/40 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -inset-10 bg-indigo-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              {/* File Upload Vector Icon */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/20 shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-slate-200 tracking-tight">
                  Ready to Analyze Vector Ensembles
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                  Drag & drop your research manuscript or click to securely initialize a sandbox node.
                </p>
              </div>

              <button className="mt-2 px-5 py-2.5 text-xs font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-600 hover:text-white rounded-xl shadow-inner transition-all duration-200 pointer-events-auto">
                Select PDF Document
              </button>
            </div>

            {/* Live Engine Status Metrics */}
            <div className="lg:col-span-1 flex flex-col gap-4 border-l border-slate-800/40 lg:pl-6 h-full justify-between">
              <div className="flex flex-col gap-3.5">
                <h4 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Neural Node Status
                </h4>

                <div className="flex flex-col gap-1.5 bg-slate-950/50 border border-slate-900 p-3 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-400">CONTEXT LIMIT</span>
                  <span className="text-sm font-bold text-slate-200">Up to 2,000 Pages</span>
                </div>

                <div className="flex flex-col gap-1.5 bg-slate-950/50 border border-slate-900 p-3 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-400">ENCRYPTION HASH</span>
                  <span className="text-xs font-mono font-bold text-emerald-400/90 truncate">SHA-256 // LOCKED</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 font-medium leading-normal italic mt-2">
                *Guest instances are sandboxed. Upgrade to Pro for high-speed batch context parsing.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
