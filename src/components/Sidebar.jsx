import React from 'react';
import { Plus, FileText, ChevronRight, Sparkles, X } from 'lucide-react';

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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-68 bg-[#070b13] border-r border-slate-800/60 flex flex-col h-full font-sans select-none text-slate-200 shrink-0 transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile Header Close Button */}
        <div className="flex md:hidden items-center justify-between p-3.5 border-b border-slate-900 bg-[#0b1324]/20 shrink-0">
          <span className="text-xs font-mono font-bold text-slate-400">PDF AI VAULT</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-500 hover:text-white rounded transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      {/* ➕ New Document Button */}
      <div className="p-3.5 shrink-0">
        <label className="w-full h-11 border border-slate-800 hover:border-indigo-500/50 bg-[#0b1324] hover:bg-indigo-500/5 rounded-xl px-4 flex items-center justify-between transition-all duration-200 cursor-pointer group shadow-sm">
          <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
          <div className="flex items-center gap-2.5">
            <Plus className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-bold tracking-wide group-hover:text-white transition-colors">
              {isUploading ? "Vectorizing..." : "New Document"}
            </span>
          </div>
          <span className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-mono font-bold">PDF</span>
        </label>
      </div>

      {/* 🗄️ Core Scrollable Vault */}
      <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-900">
        <div className="px-2 py-2 text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest flex items-center justify-between">
          <span>Active Context Vault</span>
          <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 text-slate-500">{uploadHistory.length}</span>
        </div>

        {uploadHistory.length === 0 ? (
          <div className="h-28 flex flex-col items-center justify-center text-slate-600 gap-1 text-center px-4">
            <p className="text-xs font-semibold">Workspace Empty</p>
            <p className="text-[10px] text-slate-700">Initialize your first cluster node.</p>
          </div>
        ) : (
          uploadHistory.map((doc) => {
            const docId = doc.id || doc._id;
            const isSelected = docId === selectedDocId;

            return (
              <div
                key={docId}
                onClick={() => setSelectedDocId(docId)}
                className={`group relative px-3 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-150 select-none border
                  ${isSelected
                    ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-md'
                    : 'bg-transparent border-transparent hover:bg-slate-950/30 text-slate-400 hover:text-slate-200'
                  }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-indigo-500 rounded-r-sm"></div>
                )}

                <FileText className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />

                <div className="overflow-hidden flex-1 min-w-0">
                  <p className="text-xs font-bold truncate leading-none">
                    {doc.fileName}
                  </p>
                  <p className="text-[9px] text-slate-600 mt-1.5 font-mono">
                    {formatSize(doc.fileSize)}
                  </p>
                </div>

                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ⚙️ Status Section */}
      <div className="p-3.5 border-t border-slate-900 bg-[#070b13] shrink-0">
        <div className="bg-[#0b1324] border border-slate-800/40 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-mono font-bold text-indigo-400 tracking-wider">WORKSPACE STATUS</p>
            <p className="text-xs font-bold text-slate-400 truncate">V2_Engine_Active</p>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}
