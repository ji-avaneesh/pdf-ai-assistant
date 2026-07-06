import React from 'react';
import { LayoutGrid, Combine, Scissors, Eye, Key } from 'lucide-react';

export default function ToolkitGrid({ setIsSignupMode, setShowAuthModal }) {
  // 🛠️ तुम्हारे प्रोजेक्ट के लिए एकदम रिलेवेंट PDF टूल्स
  const TOOLS = [
    {
      icon: <Combine className="w-6 h-6 text-indigo-400" />,
      name: "Merge PDF Workspace",
      desc: "Combine multiple documents into one single cohesive vector ensemble."
    },
    {
      icon: <Scissors className="w-6 h-6 text-cyan-400" />,
      name: "Split & Segment",
      desc: "Extract specific pages safely into isolated sandbox sub-documents."
    },
    {
      icon: <Eye className="w-6 h-6 text-teal-400" />,
      name: "OCR Optical Parser",
      desc: "Convert scanned static raw images into fully searchable text segments."
    },
    {
      icon: <Key className="w-6 h-6 text-emerald-400" />,
      name: "Secure Lock (AES)",
      desc: "Lock your production documents with robust custom password structures."
    }
  ];

  return (
    <section className="relative w-full bg-[#070b13] py-20 border-t border-slate-800/40 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📢 एक शानदार और क्लीन हेडर */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight text-slate-200">
            Advanced PDF Toolkit Suite
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium leading-relaxed">
            Fast, client-side execution utilities built to manipulate document matrix configurations seamlessly.
          </p>
        </div>

        {/* 🧰 टूल्स का 3D स्टाइल ग्रिड लेआउट */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool, index) => (
            <div
              key={index}
              onClick={() => { setIsSignupMode(false); setShowAuthModal(true); }}
              className="group bg-slate-950/40 border border-slate-800/60 hover:border-indigo-500/30 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col gap-4 hover:-translate-y-1.5 shadow-xl hover:bg-slate-900/40"
            >
              {/* आइकॉन कंटेनर */}
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner group-hover:bg-slate-950 group-hover:border-indigo-500/20 transition-all duration-300">
                {tool.icon}
              </div>

              {/* टेक्स्ट */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {tool.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
