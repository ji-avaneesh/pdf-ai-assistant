import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FileText, X } from 'lucide-react';

// 🛠️ बिल्कुल सटीक पाथ्स (अब Toolkit.jsx भी इसमें जुड़ गया है)
import AboutUs from './components/AboutUs.jsx';
import Careers from './components/Careers.jsx';
import Media from './components/Media.jsx';
import Services from './components/Services.jsx';
import LandingPage from './components/LandingPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatBox from './components/ChatBox.jsx';
import Toolkit from './components/Toolkit.jsx'; // <-- नया इम्पोर्ट

const BACKEND_AUTH_URL = "https://pdf-ai-assistant-int4.onrender.com/api/auth";
const BACKEND_DOC_URL = "https://pdf-ai-assistant-int4.onrender.com/api/document";
const BACKEND_CHAT_URL = "https://pdf-ai-assistant-int4.onrender.com/api/document/chat";

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
  const [chat, setChat] = useState([
    { role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

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

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans flex flex-col overflow-x-hidden selection:bg-indigo-500 selection:text-white">

      {/* Navbar Section */}
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

      {/* Main Framework Content Routing */}
      <main className="flex-1 flex flex-col relative w-full">
        {isLoggedIn ? (
          <div className="flex-1 flex w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-6 h-[calc(100vh-4rem)] overflow-hidden">
            <Sidebar
              isUploading={isUploading}
              handleFileUpload={handleFileUpload}
              uploadHistory={uploadHistory}
              selectedDocId={selectedDocId}
              setSelectedDocId={setSelectedDocId}
            />
            <ChatBox
              selectedDocId={selectedDocId}
              uploadHistory={uploadHistory}
              chat={chat}
              question={question}
              setQuestion={setQuestion}
              isTyping={isTyping}
              handleSendMessage={handleSendMessage}
              chatEndRef={chatEndRef}
            />
          </div>
        ) : currentView === 'about' ? (
          <AboutUs setCurrentView={setCurrentView} />
        ) : currentView === 'careers' ? (
          <Careers setCurrentView={setCurrentView} />
        ) : currentView === 'media' ? (
          <Media setCurrentView={setCurrentView} />
        ) : currentView === 'services' ? (
          <Services setCurrentView={setCurrentView} />
        ) : currentView === 'toolkit' ? ( // 🛠️ फिक्स्ड टूलकिट रूट रास्ता खोल दिया है!
          <Toolkit setCurrentView={setCurrentView} />
        ) : (
          <LandingPage
            setCurrentView={setCurrentView}
            setIsSignupMode={setIsSignupMode}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </main>

      {/* Auth Form Overlay Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"><X className="w-5 h-5" /></button>
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
              <button type="submit" className="w-full py-3.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 mt-2 transition-colors">
                {isSignupMode ? 'Sign Up' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
