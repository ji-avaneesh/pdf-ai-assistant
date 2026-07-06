import React from 'react';
import { FileText } from 'lucide-react';

const TOOLKIT_CATEGORIES = [
  {
    title: "Compress & Convert",
    apps: [
      { name: "Compress PDF", desc: "Reduce file size while keeping maximum quality." },
      { name: "PDF Converter", desc: "Convert Word, Excel, PPT, and images to/from PDF." },
      { name: "PDF to Word", desc: "Extract raw PDF data into editable DOCX format." },
      { name: "PDF to Excel", desc: "Convert PDF tables into clean Excel sheets." },
      { name: "PDF to PPT", desc: "Transform documents into PowerPoint presentations." },
      { name: "PDF to JPG", desc: "Extract all embedded graphics or turn pages into images." }
    ]
  },
  {
    title: "AI & Smart Features",
    apps: [
      { name: "AI PDF Assistant", desc: "Deep conversation engine powered by contextual models." },
      { name: "Chat with PDF", desc: "Interactive prompt streams locked to specific document text." },
      { name: "AI PDF Summarizer", desc: "Generates high-level rapid briefs and core abstract vectors." },
      { name: "Translate PDF", desc: "Instantly translate entire documents into multiple world languages." },
      { name: "AI Question Generator", desc: "Automatically draft quizzes, MCQs, or study guides from papers." }
    ]
  },
  {
    title: "Organize & Optimize",
    apps: [
      { name: "Merge PDF", desc: "Combine multiple document fragments into a structured single file." },
      { name: "Split PDF", desc: "Extract or divide specific page vectors into individual files." },
      { name: "Rotate PDF", desc: "Fix orientation loops and rotate landscape or upside-down pages." },
      { name: "Delete PDF Pages", desc: "Purge unneeded layout blocks or clear empty sheets from storage." },
      { name: "Extract PDF Pages", desc: "Isolate and download only the strict pages you need." },
      { name: "Organize PDF", desc: "Drag, rearrange, sort, or build structural indexing hierarchies." }
    ]
  },
  {
    title: "View, Edit & Sign",
    apps: [
      { name: "Edit PDF", desc: "Modify, draw, append geometric vectors, or add texts directly." },
      { name: "PDF Annotator", desc: "Highlight, underline, add sticky commentary nodes, or draw blocks." },
      { name: "PDF Reader", desc: "Smooth viewing viewport with dark mode parsing configurations." },
      { name: "Number Pages", desc: "Stitch clean serial indexes or customized headers/footers seamlessly." },
      { name: "Crop PDF", desc: "Trim precise margins or fit asymmetric page padding dimensions." },
      { name: "Sign PDF", desc: "Embed legal cryptographical signatures or biometric draw seals." },
      { name: "Unlock PDF", desc: "Strip owner protection locks or decapsulate security credentials." },
      { name: "Protect PDF", desc: "Enforce strict encryption keys and layer custom access credentials." }
    ]
  }
];

export default function Toolkit({ setCurrentView }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 animate-fadeIn overflow-y-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-xs mb-4 uppercase tracking-wider">
          🧰 Power Engine Toolkit
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-3">All-In-One PDF Suite</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">Select any tool below to start processing your documents.</p>
      </div>

      <div className="space-y-12 mb-16">
        {TOOLKIT_CATEGORIES.map((category, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 border-l-2 border-indigo-500 pl-3">{category.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.apps.map((app, appIdx) => (
                <div
                  key={appIdx}
                  onClick={() => setCurrentView('landing')}
                  className="bg-slate-800/20 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-200 cursor-pointer group flex items-start gap-4"
                >
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">{app.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{app.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
