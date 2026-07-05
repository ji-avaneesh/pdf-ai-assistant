import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FileText, Sparkles, Upload, CheckCircle, Send,
  ChevronDown, ChevronUp, Zap, MessageSquare, Quote,
  Clock, Eye, ArrowRight, Mail, X, DollarSign, Shield, Cpu
} from 'lucide-react';

// ==========================================
// 🛠️ SUB-COMPONENTS IMPORTS (Synced with your exact filenames)
// ==========================================
import AboutUs from './components/AboutUs.jsx';
import Careers from './components/Careers.jsx';
import Media from './components/Media.jsx';
import Services from './components/Services.jsx';

const BACKEND_AUTH_URL = "http://localhost:5001/api/auth";
const BACKEND_DOC_URL = "http://localhost:5001/api/document";
const BACKEND_CHAT_URL = "http://localhost:5001/api/document/chat";

const WHATSAPP_LINK = "https://wa.me/919999999999";
const INSTAGRAM_LINK = "https://instagram.com/_avaneeshkumar";
const FACEBOOK_LINK = "https://facebook.com";

const ANIMATED_WORDS = ["with AI", "with Speed", "with Accuracy", "with Intelligence"];

const TOOLKIT_CATEGORIES = [
  {
    title: "Compress & Convert",
    apps: [
      { name: "Compress PDF", desc: "Reduce file size while keeping maximum quality." },
      { name: "PDF Converter", desc: "Convert Word, Excel, PPT, and images to/from PDF." },
      { name: "PDF to Word", desc: "Extract raw PDF data into editable DOCX format." },
      { name: "PDF to Excel", desc: "Convert PDF tables into clean Excel sheets." },
      { name: "PDF to PPT", desc: "Transform documents into PowerPoint presentations." },
      { name: "PDF to JPG", desc: "Extract all embedded graphics or turn pages into images." }
    ]
  },
  {
    title: "AI & Smart Features",
    apps: [
      { name: "AI PDF Assistant", desc: "Deep conversation engine powered by contextual models." },
      { name: "Chat with PDF", desc: "Interactive prompt streams locked to specific document text." },
      { name: "AI PDF Summarizer", desc: "Generates high-level rapid briefs and core abstract vectors." },
      { name: "Translate PDF", desc: "Instantly translate entire documents into multiple world languages." },
      { name: "AI Question Generator", desc: "Automatically draft quizzes, MCQs, or study guides from papers." }
    ]
  },
  {
    title: "Organize & Optimize",
    apps: [
      { name: "Merge PDF", desc: "Combine multiple document fragments into a structured single file." },
      { name: "Split PDF", desc: "Extract or divide specific page vectors into individual files." },
      { name: "Rotate PDF", desc: "Fix orientation loops and rotate landscape or upside-down pages." },
      { name: "Delete PDF Pages", desc: "Purge unneeded layout blocks or clear empty sheets from storage." },
      { name: "Extract PDF Pages", desc: "Isolate and download only the strict pages you need." },
      { name: "Organize PDF", desc: "Drag, rearrange, sort, or build structural indexing hierarchies." }
    ]
  },
  {
    title: "View, Edit & Sign",
    apps: [
      { name: "Edit PDF", desc: "Modify, draw, append geometric vectors, or add texts directly." },
      { name: "PDF Annotator", desc: "Highlight, underline, add sticky commentary nodes, or draw blocks." },
      { name: "PDF Reader", desc: "Smooth viewing viewport with dark mode parsing configurations." },
      { name: "Number Pages", desc: "Stitch clean serial indexes or customized headers/footers seamlessly." },
      { name: "Crop PDF", desc: "Trim precise margins or fit asymmetric page padding dimensions." },
      { name: "Sign PDF", desc: "Embed legal cryptographical signatures or biometric draw seals." },
      { name: "Unlock PDF", desc: "Strip owner protection locks or decapsulate security credentials." },
      { name: "Protect PDF", desc: "Enforce strict encryption keys and layer custom access credentials." }
    ]
  }
];

const FEATURES = [
  { icon: <Cpu className="w-5 h-5 text-indigo-400" />, title: "Instant Extraction", desc: "Extracts text from scanned or complex PDFs in milliseconds using optical parsing." },
  { icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, title: "Contextual Chat", desc: "Talk directly to your documents. The AI answers only from the provided text." },
  { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "Bank-Grade Security", desc: "Your data is completely encrypted and permanently deleted automatically after 15 days." }
];

const PRICING_PLANS = [
  { name: "Free Starter", price: "0", period: "/ month", desc: "Perfect for testing your workflow.", features: ["Upload up to 3 PDFs", "Max 10MB per file", "Standard Gemini Speed", "15-day secure retention"], btnText: "Get Started Free" },
  { name: "Individual", price: "399", period: "/ month", desc: "Ideal for student & solo researchers.", features: ["Upload up to 20 PDFs", "Max 25MB per file", "Faster Response Time", "Advanced context parsing"], btnText: "Upgrade to Individual", isPopular: true },
  { name: "Pro Plan", price: "799", period: "/ month", desc: "For heavy academic & power users.", features: ["Unlimited PDF uploads", "Up to 50MB per file", "Priority Gemini 1.5 Flash", "Deep layout understanding"], btnText: "Go Pro" },
  { name: "Company Plan", price: "Custom", period: "", desc: "Custom deployment for big teams.", features: ["Dedicated database storage", "Custom TTL auto-delete days", "Team collaboration dashboard", "Priority SLA support"], btnText: "Contact Me", isCustom: true }
];

const FAQS = [
  { q: "How accurately can the AI read complex data?", a: "Extremely accurately. It cross-references layouts, tables, and raw text seamlessly." },
  { q: "Is my uploaded PDF data secure?", a: "Yes. All data is encrypted and automatically wiped from our cloud storage clusters within 15 days." },
  { q: "Can I use it for heavy textbooks?", a: "Absolutely. It comfortably parses files up to 50MB and scans hundreds of pages in just seconds." }
];

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [uploadHistory, setUploadHistory] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [question, setQuestion] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [chat, setChat] = useState([
    { role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }
  ]);

  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const fullWord = ANIMATED_WORDS[textIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      if (currentText === fullWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);

      if (currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % ANIMATED_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  const fetchUserHistory = async (userId) => {
    try {
      const res = await axios.get(`${BACKEND_DOC_URL}/history/${userId}`);
      setUploadHistory(res.data);
    } catch (err) {
      console.log("No history found.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("userId", user?.id || user?._id);

    setIsUploading(true);
    try {
      const res = await axios.post(`${BACKEND_DOC_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert(`🎉 ${res.data.message}`);

      const docId = res.data.document.id || res.data.document._id;
      const newDoc = {
        id: docId,
        fileName: res.data.document.fileName,
        fileSize: res.data.document.fileSize,
        expires: res.data.document.expiresAt
      };
      setUploadHistory(prev => [newDoc, ...prev]);
      setSelectedDocId(docId);
    } catch (err) {
      alert(err.response?.data?.message || "PDF Upload Failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/signup`, { name, email, password });
      alert(res.data.message);
      setIsSignupMode(false);
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setCurrentView('landing');
      fetchUserHistory(res.data.user.id || res.data.user._id);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setUploadHistory([]);
    setSelectedDocId(null);
    setCurrentView('landing');
    setChat([{ role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim() || !selectedDocId) return;

    const userMsg = { role: 'user', text: question };
    setChat(prev => [...prev, userMsg]);

    const currentQuestion = question;
    setQuestion("");
    setIsTyping(true);

    try {
      const res = await axios.post(BACKEND_CHAT_URL, {
        documentId: selectedDocId,
        question: currentQuestion
      });
      setChat(prev => [...prev, { role: 'ai', text: res.data.answer }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'ai', text: "Failed to get response from AI server. Please verify your Gemini API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToSection = (id) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans flex flex-col overflow-x-hidden selection:bg-indigo-500 selection:text-white">

      {/* Navbar Link Controls */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              PDF AI <span className="text-indigo-500 font-medium">Assistant</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
            <button onClick={() => setCurrentView('landing')} className={`transition-colors ${currentView === 'landing' ? 'text-white font-semibold' : 'hover:text-white'}`}>Home</button>
            <button onClick={() => setCurrentView('about')} className={`transition-colors ${currentView === 'about' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>About Us</button>
            <button onClick={() => setCurrentView('services')} className={`transition-colors ${currentView === 'services' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Services</button>
            <button onClick={() => setCurrentView('media')} className={`transition-colors ${currentView === 'media' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Media</button>
            <button onClick={() => setCurrentView('careers')} className={`transition-colors ${currentView === 'careers' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Careers</button>
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 font-medium">👋 {user?.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500 transition-all duration-200">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => { setIsSignupMode(false); setShowAuthModal(true); }} className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all">
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container Router */}
      <main className="flex-1 flex flex-col relative w-full">
        {isLoggedIn ? (
          <div className="flex-1 flex w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-6 h-[calc(100vh-4rem)] overflow-hidden">
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

              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
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
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/40 flex gap-3 shrink-0">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={selectedDocId ? "Ask anything about this document..." : "Select a document from Cloud Vault to begin..."} disabled={!selectedDocId || isTyping} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50" />
                <button type="submit" disabled={!question.trim() || !selectedDocId || isTyping} className="px-5 bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40"><Send className="w-4 h-4" /></button>
              </form>
            </div>
          </div>
        ) : currentView === 'about' ? (
          /* 🛠️ FIXED HERE: Changed old <AboutMe /> layout selector directly into new <AboutUs /> */
          <AboutUs setCurrentView={setCurrentView} />
        ) : currentView === 'careers' ? (
          <Careers setCurrentView={setCurrentView} />
        ) : currentView === 'media' ? (
          <Media setCurrentView={setCurrentView} />
        ) : currentView === 'services' ? (
          <Services setCurrentView={setCurrentView} />
        ) : currentView === 'toolkit' ? (
          <div className="w-full max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-xs mb-4 uppercase tracking-wider">
                🧰 Power Engine Toolkit
              </div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-3">All-In-One PDF Suite</h2>
            </div>

            <div className="space-y-12 mb-16">
              {TOOLKIT_CATEGORIES.map((category, catIdx) => (
                <div key={catIdx} className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 border-l-2 border-indigo-500 pl-3">{category.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.apps.map((app, appIdx) => (
                      <div key={appIdx} onClick={() => setCurrentView('landing')} className="bg-slate-800/20 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-200 cursor-pointer group flex items-start gap-4">
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg shrink-0"><FileText className="w-4 h-4 text-slate-400" /></div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">{app.name}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{app.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 text-center pt-20 pb-12 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-xs mb-6 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI-Powered PDF Summaries
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none h-[140px] sm:h-[160px]">
                Understand PDFs <br className="mb-2"/>
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.3)]">
                  10X Better <span className="text-white font-light font-mono">|</span> {currentText}
                </span>
              </h1>

              <div className="max-w-2xl mx-auto mb-12 relative group">
                <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-2xl"></div>
                <div className="relative bg-slate-900/60 backdrop-blur-md border-l-4 border-indigo-500 rounded-xl p-5 border border-slate-800 text-left flex items-start gap-4 shadow-xl">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0 mt-0.5"><Quote className="w-4 h-4 scale-x-[-1]" /></div>
                  <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed tracking-wide">
                    Summarize, ask questions, and get reliable answers from any PDF in seconds. <span className="text-indigo-400 font-semibold block sm:inline mt-1 sm:mt-0">Perfect for students and engineering researchers.</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }} className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 shadow-xl group">Sign up Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1" /></button>
                <button onClick={() => setCurrentView('toolkit')} className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700/50 text-sm">Explore Toolkit</button>
              </div>
            </div>

            {/* Dashboard Container Box */}
            <div className="max-w-4xl mx-auto w-full px-4 mb-20">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 text-xs text-slate-500 font-mono">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2">Interactive_Preview_Dashboard.env</span>
                </div>
                <div className="h-48 border border-dashed border-slate-700/60 rounded-xl flex flex-col items-center justify-center text-center p-6 bg-slate-900/40">
                  <FileText className="w-10 h-10 text-slate-700 mb-2" />
                  <h4 className="text-sm font-semibold text-slate-400">No Document Selected</h4>
                  <p className="text-xs text-slate-600 max-w-xs mt-1">Create an account to securely drop vectors, analyze layouts, and access the Live Vault.</p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <section id="features" className="max-w-6xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Engineered for Rapid Research</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURES.map((feat, idx) => (
                  <div key={idx} className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-fit mb-4">{feat.icon}</div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">{feat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="max-w-7xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
              <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Simple, Transparent Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {PRICING_PLANS.map((plan, idx) => (
                  <div key={idx} className={`bg-slate-800/30 border rounded-2xl p-6 flex flex-col relative overflow-hidden ${plan.isPopular ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-600/5' : 'border-slate-800'}`}>
                    <h3 className="text-lg font-bold text-slate-200 mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-extrabold text-white">{plan.isCustom ? "" : "₹"}{plan.price}</span>
                      <span className="text-xs text-slate-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 my-6 flex-1 text-xs text-slate-400">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> <span>{f}</span></li>
                      ))}
                    </ul>
                    {plan.isCustom ? (
                      <a href="mailto:support@pdfaiassistant.com?subject=Company Plan Inquiry" className="w-full py-3 rounded-xl font-semibold text-xs text-center bg-slate-900 border border-slate-800 text-slate-300 block">{plan.btnText}</a>
                    ) : (
                      <button onClick={() => { setIsSignupMode(true); setShowAuthModal(true); }} className={`w-full py-3 rounded-xl font-semibold text-xs ${plan.isPopular ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'}`}>{plan.btnText}</button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="max-w-3xl mx-auto w-full px-4 py-16 border-t border-slate-800/40 scroll-mt-12">
              <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-slate-800/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700/60 transition-colors">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 text-left font-medium flex items-center justify-between gap-4 text-slate-200">
                      <span>{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openFaq === i && <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* SOCIAL FOOTER */}
            <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 backdrop-blur-md pt-12 pb-6 shrink-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2"><div className="bg-indigo-600 p-1.5 rounded-lg text-white"><FileText className="w-4 h-4" /></div><span className="font-bold text-base text-slate-200">PDF AI Assistant</span></div>
                    <p className="text-xs text-slate-500 leading-relaxed">An advanced full-stack workspace engineered to securely extract knowledge from complex data vectors in seconds.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation</h4>
                    <ul className="space-y-2 text-xs text-slate-500 font-medium">
                      <li><button onClick={() => setCurrentView('landing')} className="hover:text-indigo-400 text-left block">✦ Home Console</button></li>
                      <li><button onClick={() => setCurrentView('about')} className="hover:text-indigo-400 text-left block">✦ About us</button></li>
                      <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-400 text-left block">✦ Services Console</button></li>
                      <li><button onClick={() => setCurrentView('toolkit')} className="hover:text-indigo-400 text-left block">✦ PDF Toolkit App</button></li>
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
                    <div className="text-xs text-slate-500 leading-relaxed mt-1">
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 block mt-0.5">📍 Noida Development Hub, UP, India</a>
                    </div>
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
          </div>
        )}
      </main>

      {/* AUTH MODAL POP-UP */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-500"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold mb-1.5 text-slate-100">{isSignupMode ? 'Create an Account' : 'Welcome Back'}</h2>
            <form onSubmit={isSignupMode ? handleSignup : handleLogin} className="space-y-4">
              {isSignupMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
              </div>
              <button type="submit" className="w-full py-3.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 mt-2">
                {isSignupMode ? 'Sign Up' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
