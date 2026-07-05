import React from 'react';
import { FileText, Mail, CheckCircle } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const WHATSAPP_LINK = "https://wa.me/919999999999";
  const INSTAGRAM_LINK = "https://instagram.com/_avaneeshkumar";
  const FACEBOOK_LINK = "https://facebook.com";

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 backdrop-blur-md pt-12 pb-6 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><FileText className="w-4 h-4" /></div>
              <span className="font-bold text-base text-slate-200">PDF AI Assistant</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">An advanced full-stack workspace engineered to securely extract knowledge from complex data vectors in seconds.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li><button onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 text-left block">✦ Home Console</button></li>
              <li><button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 text-left block">✦ About us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Cloud Vault Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-1.5 text-emerald-500/90 font-medium"><CheckCircle className="w-3.5 h-3.5" /> Data Encrypted (AES-256)</li>
              <li>⏳ Auto-Purge Protocol: <span className="text-amber-500 font-medium">15 Days TTL</span></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">GET IN TOUCH</h4>
            <a href="mailto:support@pdfaiassistant.com?subject=Project Inquiry" className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all w-fit"><Mail className="w-3.5 h-3.5" /> Support Mailbox</a>
            <div className="flex items-center gap-3.5 mt-2 border-t border-slate-800/80 pt-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-2 text-lg rounded-lg bg-slate-900 border border-slate-800 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all">💬</a>
              <a href="mailto:support@pdfaiassistant.com" className="p-2 text-lg rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">✉️</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="p-2 text-lg rounded-lg bg-slate-900 border border-slate-800 text-rose-400 hover:bg-purple-600 hover:text-white transition-all">📸</a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="p-2 text-lg rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all">👥</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
