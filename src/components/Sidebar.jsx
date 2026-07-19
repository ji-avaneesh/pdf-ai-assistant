import React from 'react';
import { Plus, FileText, ChevronRight, Sparkles, X, Activity, Database, Server } from 'lucide-react';

export default function Sidebar({ isUploading, handleFileUpload, uploadHistory, selectedDocId, setSelectedDocId, sidebarOpen, setSidebarOpen }) {

  const formatSize = (size) => {
    if (!size) return "0 KB";
    if (typeof size === 'string') return size;
    return `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-68 bg-gradient-to-b from-[#070b13] to-[#04060b] border-r border-slate-800/60 flex flex-col h-full font-sans select-none text-slate-200 shrink-0 transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile Header Close Button */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-slate-900 bg-[#0b1324]/20 shrink-0">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">PDF AI VAULT</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-500 hover:text-white rounded transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ➕ New Document Button */}
        <div className="p-4 shrink-0">
          <label className="w-full h-11 border border-slate-800 hover:border-indigo-500/50 bg-[#0b1324]/60 hover:bg-indigo-950/20 rounded-xl px-4 flex items-center justify-between transition-all duration-300 cursor-pointer group shadow-md active:scale-[0.98]">
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-xs font-bold tracking-wide text-slate-300 group-hover:text-white transition-colors">
                {isUploading ? "Vectorizing..." : "New Document"}
              </span>
            </div>
            <span className="text-[9px] bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-mono font-bold">PDF</span>
          </label>
        </div>

        {/* 🗄️ Core Scrollable Vault */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-950/50">
          <div className="px-2 py-2.5 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
            <span>Context Vault</span>
            <span className="bg-slate-950 border border-slate-900/60 px-2 py-0.5 rounded-full text-[10px] text-slate-400 font-bold">{uploadHistory.length}</span>
          </div>

          {uploadHistory.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-slate-600 gap-1 text-center px-4">
              <Database className="w-5 h-5 text-slate-800 mb-1" />
              <p className="text-xs font-semibold text-slate-550">Workspace Empty</p>
              <p className="text-[9px] text-slate-700 leading-normal">Initialize your first document node.</p>
            </div>
          ) : (
            uploadHistory.map((doc) => {
              const docId = doc.id || doc._id;
              const isSelected = docId === selectedDocId;

              return (
                <div
                  key={docId}
                  onClick={() => setSelectedDocId(docId)}
                  className={`group relative px-3 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-300 select-none border hover:translate-x-1
                    ${isSelected
                      ? 'bg-gradient-to-r from-indigo-950/20 to-slate-900/40 border-slate-800/80 text-indigo-300 shadow-lg'
                      : 'bg-transparent border-transparent hover:bg-slate-950/20 text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-md shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                  )}

                  <FileText className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />

                  <div className="overflow-hidden flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate leading-none transition-colors ${isSelected ? 'text-slate-200' : 'text-slate-450'}`}>
                      {doc.fileName}
                    </p>
                    <p className="text-[8px] text-slate-650 mt-1.5 font-mono">
                      {formatSize(doc.fileSize)}
                    </p>
                  </div>

                  <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ⚙️ Status Section with Live Telemetry */}
        <div className="p-4 border-t border-slate-900/80 bg-[#05090f] shrink-0">
          <div className="bg-[#080d15] border border-slate-800/35 rounded-xl p-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-500/5 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-[9px] font-mono font-bold text-slate-500 tracking-wider">ENGINE TELEMETRY</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <p className="text-xs font-bold text-slate-350 truncate">V2 Core Active</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-900/60 pt-2 flex items-center justify-between text-[8px] font-mono text-slate-600 font-bold select-none">
              <span className="flex items-center gap-1"><Server className="w-2.5 h-2.5" /> Latency: 12ms</span>
              <span className="flex items-center gap-1"><Activity className="w-2.5 h-2.5 text-indigo-500" /> Nodes: 8/8</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
