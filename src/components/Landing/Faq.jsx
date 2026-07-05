import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS_DATA = [
  { q: "How accurately can the AI read complex data?", a: "Extremely accurately. It cross-references layouts, tables, and raw text seamlessly." },
  { q: "Is my uploaded PDF data secure?", a: "Yes. All data is encrypted and automatically wiped from our cloud storage clusters within 15 days." },
  { q: "Can I use it for heavy textbooks?", a: "Absolutely. It comfortably parses files up to 50MB and scans hundreds of pages in just seconds." }
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQS_DATA.map((faq, i) => (
          <div key={i} className="bg-slate-800/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700/60 transition-colors duration-200">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 text-left font-medium flex items-center justify-between gap-4 text-slate-200">
              <span>{faq.q}</span>
              {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openFaq === i && <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
