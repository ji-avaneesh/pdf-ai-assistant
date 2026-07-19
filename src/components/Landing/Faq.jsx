import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS_DATA = [
  { 
    q: "How accurately can the AI read complex data and tables?", 
    a: "Extremely accurately. PDF AI Assistant utilizes state-of-the-art vector embedding chunking and Google Gemini 1.5 Flash API models. It cross-references text layouts, nested tables, and citations without hallucinating." 
  },
  { 
    q: "What happens if my PDF is a scanned image or blueprint?", 
    a: "Our system features an automatic Gemini Vision OCR Fallback pipeline. If sparse or image-only text is detected, the server converts the PDF pages to high-resolution base64 inline streams and transcribes the text automatically." 
  },
  { 
    q: "Is my uploaded PDF data private and secure?", 
    a: "Yes, 100%. All uploads are encrypted in transit and at rest using AES-256 protocols. Your documents are strictly isolated in your private sandbox, never used to train public models, and automatically purged via a 15-day TTL lifecycle." 
  },
  { 
    q: "Does it support questions in Hindi, Hinglish, or other languages?", 
    a: "Yes! You can ask questions in plain English, Hindi, or Hinglish (e.g. 'Is document me summary kya hai?'). The AI dynamically matches your input language while keeping answers fact-locked to the document." 
  },
  { 
    q: "Can I use it for heavy textbooks and multi-page manuals?", 
    a: "Absolutely. The platform comfortably parses documents up to 50MB and scans hundreds of pages in under 2 seconds." 
  },
  { 
    q: "How do I get started with developer or enterprise access?", 
    a: "You can sign up for free in less than 30 seconds using your Google account or email. For custom corporate deployments, reach out to jiavaneesh399@gmail.com." 
  }
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/40 scroll-mt-12 selection:bg-indigo-500 selection:text-white">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
          Everything you need to know about our AI vector indexing, data privacy, and OCR capabilities.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS_DATA.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div 
              key={i} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? 'bg-slate-950/60 border-indigo-500/40 shadow-lg shadow-indigo-600/5' 
                  : 'bg-[#0b1324]/30 border-slate-850 hover:border-slate-700'
              }`}
            >
              <button 
                onClick={() => setOpenFaq(isOpen ? null : i)} 
                className="w-full px-6 py-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-slate-100 hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              
              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium border-t border-slate-900/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
