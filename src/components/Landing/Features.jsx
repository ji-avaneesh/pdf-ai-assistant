import React from 'react';
import { Cpu, MessageSquare, Shield } from 'lucide-react';

const FEATURES_DATA = [
  { icon: <Cpu className="w-5 h-5 text-indigo-400" />, title: "Instant Extraction", desc: "Extracts text from scanned or complex PDFs in milliseconds using optical parsing." },
  { icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, title: "Contextual Chat", desc: "Talk directly to your documents. The AI answers only from the provided text." },
  { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "Bank-Grade Security", desc: "Your data is completely encrypted and permanently deleted automatically after 15 days." }
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Engineered for Rapid Research</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES_DATA.map((feat, idx) => (
          <div key={idx} className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors duration-200">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-fit mb-4">{feat.icon}</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">{feat.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
