import React from 'react';

export default function Features() {
  const FEATURE_ITEMS = [
    {
      image: "/extraction-feat.png",
      title: "Instant Extraction",
      desc: "Extracts text from scanned or complex structural PDFs in milliseconds using high-speed optical parsing models and contextual tokenizers."
    },
    {
      image: "/chat-feat.png",
      title: "Contextual Chat",
      desc: "Talk directly to your documents with 100% data guard. The core AI neural engine answers questions strictly locked from your provided vector text strings."
    },
    {
      image: "/security-feat.png",
      title: "Bank-Grade Security",
      desc: "Your data is completely encrypted via AES-256 protocols and permanently purged automatically from storage buckets after a strict 15-day TTL configuration."
    }
  ];

  return (
    <section className="relative w-full bg-[#070b13] py-24 border-t border-slate-800/40 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* बैकग्राउंड एम्बिएंट लाइट्स */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 📢 बड़ा और प्रीमियम हेडर */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Engineered for Rapid Research
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 max-w-xl mx-auto font-medium">
            Enterprise infrastructure built for absolute data integrity, instant semantic search capabilities, and production-ready workspace scalability.
          </p>
        </div>

        {/* 🎴 इंटरेक्टिव कार्ड्स का ग्रिड */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {FEATURE_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#0b1324]/40 border border-slate-800/60 hover:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer shadow-2xl"
              style={{ perspective: "1000px" }}
            >
              {/* 🖼️ टॉप इमेज कंटेनर - पैडिंग, बॉर्डर और नियॉन होवर ग्लो के साथ */}
              <div className="p-5 pb-0">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.05] pointer-events-none"
                  />
                  {/* इमेज के ऊपर स्लीक ग्रेडिएंट ओवरले */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* 📝 हेडिंग और कंटेंट ब्लॉक */}
              <div className="p-6 sm:p-8 flex flex-col gap-3 flex-grow">
                <h3 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed tracking-normal">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
