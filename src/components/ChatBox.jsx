import React from 'react';
import { Bot, User, ArrowUp, Cpu, Sparkles, MessageSquare, Menu } from 'lucide-react';

export default function ChatBox({ selectedDocId, uploadHistory, chat, question, setQuestion, isTyping, handleSendMessage, chatEndRef, sidebarOpen, setSidebarOpen }) {

  const activeDoc = uploadHistory.find(doc => (doc.id || doc._id) === selectedDocId);

  const handleSuggestionClick = (text) => {
    if (!selectedDocId || isTyping) return;
    setQuestion(text);
  };

  return (
    /* Lock height and flex direction to ensure chat box occupies correct viewport bounds */
    <div className="flex-1 bg-[#0b1324] flex flex-col h-full relative font-sans overflow-hidden">

      {/* 🌐 Top Fixed Navbar Header */}
      <div className="bg-[#0b1324]/80 border-b border-slate-800/40 px-6 py-3.5 flex items-center justify-between shrink-0 select-none backdrop-blur z-20">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 mr-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800/80 rounded-lg hover:border-indigo-500/30 transition-colors focus:outline-none"
            aria-label="Open document vault"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="text-xs font-mono font-extrabold text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Chat Thread Core</span>
          </div>
          {activeDoc && (
            <>
              <span className="text-slate-800">/</span>
              <span className="text-xs font-bold text-slate-300 truncate max-w-[150px] sm:max-w-[300px]">
                {activeDoc.fileName}
              </span>
            </>
          )}
        </div>

        {activeDoc && (
          <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/20 px-2 py-0.5 rounded">
            <Cpu className="w-3 h-3 animate-spin" />
            STREAM: ON
          </div>
        )}
      </div>

      {/* 📜 2. Scrollable Message Container with custom scrollbar styling */}
      <div className="flex-1 overflow-y-auto bg-[#0b1324] pr-1 custom-scrollbar">

        {chat.length <= 1 && !activeDoc ? (
          /* 🔮 Empty State */
          <div className="max-w-2xl mx-auto px-4 sm:px-6 h-full min-h-[400px] flex flex-col justify-center items-center text-center gap-6 animate-fadeIn py-12 select-none">
            <div className="w-14 h-14 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-center text-indigo-400 shadow-xl">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                What can I analyze today?
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto font-medium leading-relaxed">Select an active manuscript node from the Cloud Vault sidebar to begin vector chat strings.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mt-4">
              {[
                { text: "Summarize the entire core executive brief.", label: "Executive Summary", icon: "📋" },
                { text: "Extract all critical metrics & statistical data.", label: "Data Extraction", icon: "📊" },
                { text: "What are the primary technical bottlenecks mentioned?", label: "Technical Audit", icon: "⚙️" },
                { text: "Analyze the legal compliance or project constraints.", label: "Compliance Check", icon: "🛡️" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(item.text)}
                  className="p-4 bg-gradient-to-br from-slate-900/40 to-[#070b13]/40 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-950/10 active:scale-[0.98] group flex flex-col justify-between h-[105px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest group-hover:text-indigo-450 transition-colors">{item.label}</span>
                    <span className="text-xs select-none">{item.icon}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors line-clamp-2 leading-relaxed mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 💬 Chat Stream Thread */
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            {chat.map((msg, index) => {
              const isAI = msg.role === 'ai';
              return (
                <div
                  key={index}
                  className={`flex gap-3 sm:gap-4 max-w-3xl animate-fadeIn ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-md select-none transition-colors
                    ${isAI ? 'bg-slate-950 border-slate-800 text-indigo-400' : 'bg-indigo-600 border-indigo-500 text-white'}`}
                  >
                    {isAI ? <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>

                  <div className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed font-medium max-w-[85%] whitespace-pre-wrap shadow-sm
                    ${isAI
                      ? 'bg-slate-950/20 border border-slate-900/40 text-slate-200/90 rounded-tl-none'
                      : 'bg-slate-900/80 border border-slate-800/65 text-slate-100 rounded-tr-none'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* AI Thinking Bubble */}
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 mr-auto max-w-3xl animate-pulse">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border bg-slate-950 border-slate-800 text-indigo-400 flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="p-4 text-slate-500 font-mono text-[10px] sm:text-[11px] font-bold flex items-center gap-2 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                  THINKING...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* ⌨️ 3. Fixed Bottom Prompt Input Field Bar */}
      <div className="p-4 bg-gradient-to-t from-[#0b1324] via-[#0b1324] to-transparent shrink-0 z-10 mt-auto">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSendMessage} className="bg-slate-950 border border-slate-800/80 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/10 rounded-2xl p-2 transition-all flex items-center shadow-2xl">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={!selectedDocId || isTyping}
              placeholder={selectedDocId ? "Message PDF AI Assistant..." : "Select a document cluster node from vault to chat..."}
              className="flex-1 bg-transparent px-4 text-sm text-slate-200 focus:outline-none placeholder:text-slate-600 font-medium"
            />
            <button
              type="submit"
              disabled={!selectedDocId || !question.trim() || isTyping}
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
                ${selectedDocId && question.trim() && !isTyping
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer shadow-md'
                  : 'bg-slate-900 text-slate-700 cursor-not-allowed'}`}
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-600 mt-2.5 font-medium select-none tracking-wide">
            PDF AI Assistant can make mistakes. Verify critical blueprints matrix data directly.
          </p>
        </div>
      </div>

      {/* 🪄 Custom scrollbar stylesheet injection */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0b1324;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }
      `}</style>

    </div>
  );
}
