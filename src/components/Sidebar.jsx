import React from 'react';
import { Upload, Clock, FileText, CheckCircle } from 'lucide-react';

export default function Sidebar({ isUploading, handleFileUpload, uploadHistory, selectedDocId, setSelectedDocId }) {
  return (
    <div className="w-80 flex flex-col gap-4 shrink-0 h-full">
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shrink-0">
        <h3 className="font-semibold text-slate-200 flex items-center gap-2 text-sm tracking-wider uppercase">
          <Upload className="w-4 h-4 text-indigo-400" /> Upload Center
        </h3>
        <label className={`border-2 border-dashed ${isUploading ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-700 hover:border-indigo-500 bg-slate-900/50 hover:bg-indigo-500/5'} rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 group`}>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
          <div className="p-2.5 rounded-xl bg-slate-800 group-hover:bg-indigo-600 transition-all">
            <Upload className="w-5 h-5 text-slate-400 group-hover:text-white" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">{isUploading ? 'Processing...' : 'Choose PDF File'}</p>
            <p className="text-xs text-slate-500 mt-1">Max capacity 50MB</p>
          </div>
        </label>
      </div>

      <div className="flex-1 bg-slate-800/50 border border-slate-800 rounded-2xl p-5 flex flex-col min-h-0">
        <h3 className="font-semibold text-slate-200 flex items-center gap-2 text-sm tracking-wider uppercase mb-3">
          <Clock className="w-4 h-4 text-emerald-400" /> Cloud Vault
        </h3>
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-0">
          {uploadHistory.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-center p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <FileText className="w-8 h-8 text-slate-700 mb-2" />
              <p className="text-xs text-slate-500 font-medium">No documents indexed yet.</p>
            </div>
          ) : (
            uploadHistory.map((doc) => (
              <div
                key={doc.id || doc._id}
                onClick={() => setSelectedDocId(doc.id || doc._id)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 relative overflow-hidden group ${
                  selectedDocId === (doc.id || doc._id) ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${selectedDocId === (doc.id || doc._id) ? 'text-indigo-400' : 'text-slate-400'}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200 truncate pr-4">{doc.fileName}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span className="text-emerald-500/90 font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Ready</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
