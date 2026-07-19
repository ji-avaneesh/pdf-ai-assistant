import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

const PRICING_PLANS_DATA = [
  { 
    name: "Free Starter", 
    price: "0", 
    period: "/ month", 
    desc: "Perfect for testing your document Q&A workflow.", 
    features: [
      "Upload up to 3 PDFs", 
      "Max 10MB per document", 
      "Standard Gemini 1.5 Flash Speed", 
      "15-day secure vector retention"
    ], 
    btnText: "Get Started Free" 
  },
  { 
    name: "Individual", 
    price: "399", 
    period: "/ month", 
    desc: "Ideal for students & solo researchers.", 
    features: [
      "Upload up to 20 PDFs", 
      "Max 25MB per document", 
      "Ultra-low latency response times", 
      "Advanced context chunking",
      "Multimodal OCR Fallback"
    ], 
    btnText: "Upgrade to Individual", 
    isPopular: true 
  },
  { 
    name: "Pro Plan", 
    price: "799", 
    period: "/ month", 
    desc: "For heavy academic & enterprise power users.", 
    features: [
      "Unlimited PDF uploads", 
      "Up to 50MB per document", 
      "Priority Gemini 1.5 Flash API", 
      "Deep nested layout understanding",
      "Export citation summaries"
    ], 
    btnText: "Go Pro" 
  },
  { 
    name: "Company Plan", 
    price: "Custom", 
    period: "", 
    desc: "Dedicated deployment for engineering teams.", 
    features: [
      "Dedicated database sandboxes", 
      "Custom TTL auto-delete rules", 
      "Team collaboration dashboard", 
      "Priority 24/7 SLA support"
    ], 
    btnText: "Contact Us", 
    isCustom: true 
  }
];

export default function Pricing({ setIsSignupMode, setShowAuthModal }) {
  return (
    <section id="pricing" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800/40 scroll-mt-12 selection:bg-indigo-500 selection:text-white relative">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Pricing
        </div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Simple, Predictable Plans
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Start for free and scale as your document vector analysis grows. Zero hidden charges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PRICING_PLANS_DATA.map((plan, idx) => (
          <div 
            key={idx} 
            className={`bg-[#0b1324]/40 border rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              plan.isPopular 
                ? 'border-indigo-500/80 bg-indigo-950/10 shadow-2xl shadow-indigo-600/10' 
                : 'border-slate-850 hover:border-slate-700'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-[9px] font-mono font-bold uppercase tracking-widest text-white px-3 py-1 rounded-bl-xl shadow-md">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-450 leading-relaxed min-h-[36px]">{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 my-6">
                <span className="text-4xl font-black text-white">{plan.isCustom ? "" : "₹"}{plan.price}</span>
                <span className="text-xs text-slate-500 font-mono font-bold">{plan.period}</span>
              </div>

              <div className="border-t border-slate-900 pt-6 mb-6">
                <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest block mb-3">Included Capabilities</span>
                <ul className="space-y-3 text-xs text-slate-350 font-medium">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> 
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {plan.isCustom ? (
              <a 
                href="mailto:jiavaneesh399@gmail.com?subject=Company Plan Inquiry - PDF AI Assistant&body=Hi Avaneesh, I am interested in exploring the Company Plan for PDF AI Assistant. Here are our team requirements..." 
                className="w-full py-3.5 rounded-xl font-bold text-xs text-center bg-slate-900 border border-slate-800 text-slate-300 block hover:bg-slate-800 hover:text-white transition-all shadow-md mt-4"
              >
                {plan.btnText}
              </a>
            ) : (
              <button
                onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg mt-4 ${
                  plan.isPopular 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20' 
                    : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {plan.btnText}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
