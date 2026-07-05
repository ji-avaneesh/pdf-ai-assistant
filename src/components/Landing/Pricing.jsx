import React from 'react';
import { CheckCircle } from 'lucide-react';

const PRICING_PLANS_DATA = [
  { name: "Free Starter", price: "0", period: "/ month", desc: "Perfect for testing your workflow.", features: ["Upload up to 3 PDFs", "Max 10MB per file", "Standard Gemini Speed", "15-day secure retention"], btnText: "Get Started Free" },
  { name: "Individual", price: "399", period: "/ month", desc: "Ideal for student & solo researchers.", features: ["Upload up to 20 PDFs", "Max 25MB per file", "Faster Response Time", "Advanced context parsing"], btnText: "Upgrade to Individual", isPopular: true },
  { name: "Pro Plan", price: "799", period: "/ month", desc: "For heavy academic & power users.", features: ["Unlimited PDF uploads", "Up to 50MB per file", "Priority Gemini 1.5 Flash", "Deep layout understanding"], btnText: "Go Pro" },
  { name: "Company Plan", price: "Custom", period: "", desc: "Custom deployment for big teams.", features: ["Dedicated database storage", "Custom TTL auto-delete days", "Team collaboration dashboard", "Priority SLA support"], btnText: "Contact Me", isCustom: true }
];

export default function Pricing({ setIsSignupMode, setShowAuthModal }) {
  return (
    <section id="pricing" className="max-w-7xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
      <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Simple, Transparent Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-8">
        {PRICING_PLANS_DATA.map((plan, idx) => (
          <div key={idx} className={`bg-slate-800/30 border rounded-2xl p-6 flex flex-col relative overflow-hidden ${plan.isPopular ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-600/5' : 'border-slate-800'}`}>
            <h3 className="text-lg font-bold text-slate-200 mb-1">{plan.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-extrabold text-white">{plan.isCustom ? "" : "₹"}{plan.price}</span>
              <span className="text-xs text-slate-500">{plan.period}</span>
            </div>
            <ul className="space-y-3 my-6 flex-1 text-xs text-slate-400">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            {plan.isCustom ? (
              <a href="mailto:support@pdfaiassistant.com?subject=Company Plan Inquiry" className="w-full py-3 rounded-xl font-semibold text-xs text-center bg-slate-900 border border-slate-800 text-slate-300 block hover:bg-slate-800 transition-colors">{plan.btnText}</a>
            ) : (
              <button
                onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }}
                className={`w-full py-3 rounded-xl font-semibold text-xs transition-colors ${plan.isPopular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'}`}
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
