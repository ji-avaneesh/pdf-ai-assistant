import React from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function ChatBox({ selectedDocId, uploadHistory, chat, question, setQuestion, isTyping, handleSendMessage, chatEndRef }) {
  return (
    <div className="flex-1 bg-slate-800/50 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><Sparkles className="w-4 h-4" /></div>
          <div>
            <h3 className="font-semibold text-sm text-slate-200">Contextual AI Agent</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedDocId ? `Tuned to: ${uploadHistory.find(d => (d.id || d._id) === selectedDocId)?.fileName}` : 'Awaiting document selection...'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 h-[calc(100vh-14rem)]">
        {chat.map((msg, i) => (
          <div key={i} className={`flex items-start gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`p-2.5 rounded-xl border text-sm shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed border shadow-sm ${
              msg.role === 'user' ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none' : 'bg-slate-900/60 border-slate-800 text-slate-300 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/40 flex gap-3 shrink-0">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={selectedDocId ? "Ask anything about this document..." : "Select a document from Cloud Vault to begin..."} disabled={!selectedDocId || isTyping} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50" />
        <button type="submit" disabled={!question.trim() || !selectedDocId || isTyping} className="px-5 bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40"><Send className="w-4 h-4" /></button>
      </form>
    </div>
  );
}
