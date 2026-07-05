import React from 'react';
import { FileText } from 'lucide-react';

export default function ToolkitGrid() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 mb-20">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 text-xs text-slate-500 font-mono">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="ml-2">Interactive_Preview_Dashboard.env</span>
        </div>
        <div className="h-48 border border-dashed border-slate-700/60 rounded-xl flex flex-col items-center justify-center text-center p-6 bg-slate-900/40">
          <FileText className="w-10 h-10 text-slate-700 mb-2" />
          <h4 className="text-sm font-semibold text-slate-400">No Document Selected</h4>
          <p className="text-xs text-slate-600 max-w-xs mt-1">Create an account to securely drop vectors, analyze layouts, and access the Live Vault.</p>
        </div>
      </div>
    </div>
  );
}
