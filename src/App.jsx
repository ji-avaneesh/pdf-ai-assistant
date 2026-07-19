import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Menu, X } from 'lucide-react';

// 🛠️ Component Imports
import AboutUs from './components/AboutUs.jsx';
import Careers from './components/Careers.jsx';
import Media from './components/Media.jsx';
import Services from './components/Services.jsx';
import LandingPage from './components/LandingPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatBox from './components/ChatBox.jsx';
import Toolkit from './components/Toolkit.jsx';
import AuthModal from './components/AuthModal.jsx';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocal 
  ? "http://localhost:5001" 
  : "https://pdf-ai-assistant-int4.onrender.com";

const BACKEND_AUTH_URL = `${API_BASE}/api/auth`;
const BACKEND_DOC_URL = `${API_BASE}/api/document`;
const BACKEND_CHAT_URL = `${API_BASE}/api/document/chat`;

// Attach Bearer Token Interceptor for backend authentication
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "dev_token_user_123";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔔 In-App Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

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
      const historyList = res.data.data || res.data;
      setUploadHistory(Array.isArray(historyList) ? historyList : []);
    } catch (err) {
      console.log("No history found.");
    }
  };

  const handleSelectDocument = async (docId) => {
    setSelectedDocId(docId);
    if (!docId) {
      setChat([
        { role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }
      ]);
      return;
    }

    try {
      const res = await axios.get(`${BACKEND_DOC_URL}/chat/history/${docId}`);
      const messagesData = res.data.data?.messages || res.data.messages;
      if (messagesData && messagesData.length > 0) {
        const mapped = messagesData.map(m => ({
          role: m.sender,
          text: m.text
        }));
        setChat(mapped);
      } else {
        setChat([
          { role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }
        ]);
      }
    } catch (err) {
      console.error("🚨 Failed to load chat history:", err);
      setChat([
        { role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }
      ]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("userId", user?.id || user?._id || user?.uid || "dev_user_123");

    setIsUploading(true);
    try {
      const res = await axios.post(`${BACKEND_DOC_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showToast(`🎉 ${res.data.message || "Document chunked & vectorized successfully!"}`);

      const docPayload = res.data.data?.document || res.data.document;
      const docId = docPayload.id || docPayload._id;
      const newDoc = {
        id: docId,
        fileName: docPayload.fileName,
        fileSize: docPayload.fileSize,
        expires: docPayload.expiresAt
      };
      setUploadHistory(prev => [newDoc, ...prev]);
      handleSelectDocument(docId);
    } catch (err) {
      const errMessage = err.response?.data?.error?.message || err.response?.data?.message || "PDF Upload Failed!";
      showToast(errMessage, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    setIsUploading(true);
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/signup`, { name, email, password });
      showToast(res.data.message || "Account created successfully!");
      setIsSignupMode(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Signup Failed!", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsUploading(true);
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setCurrentView('landing');
      showToast("🚀 Gateway secured. Session authorized!");
      fetchUserHistory(res.data.user.id || res.data.user._id);
    } catch (err) {
      showToast(err.response?.data?.message || "Invalid credentials standard!", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setUploadHistory([]);
    setSelectedDocId(null);
    setCurrentView('landing');
    setSidebarOpen(false);
    setMobileMenuOpen(false);
    showToast("Session purged. Disconnected from node.");
    setChat([{ role: 'ai', text: 'Hello! Upload a PDF or select an existing one from your dashboard, and ask me anything.' }]);
  };

  const navigateToView = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
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

      let aiResponse = "";
      if (typeof res.data === 'string' && res.data.includes("data: ")) {
        const lines = res.data.split('\n');
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.fullAnswer) aiResponse = parsed.fullAnswer;
              else if (parsed.token) aiResponse += parsed.token;
            } catch (e) {}
          }
        }
      } else {
        aiResponse = res.data.answer || res.data.data?.answer || res.data.reply || res.data.text || res.data.message || (typeof res.data === 'string' ? res.data : "I have processed your request.");
      }

      setChat(prev => [...prev, { role: 'ai', text: aiResponse || "I have processed your request based on the document context." }]);
    } catch (err) {
      console.error("AI Server Fetch Error:", err);
      const errMsg = err.response?.data?.error?.message || err.response?.data?.message || "Neural server connection timeout.";
      setChat(prev => [...prev, {
        role: 'ai',
        text: `⚠️ ${errMsg}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    /* 🛠️ Lock viewport height for active chat threads to prevent double scrolling */
    <div className={`w-full bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative
      ${isLoggedIn ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}
    >

      {/* 🔔 Toast Notification Banner */}
      {toast.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-5 py-3.5 rounded-xl border font-sans text-xs font-bold tracking-wide shadow-2xl flex items-center gap-3 backdrop-blur-md animate-slideDown"
          style={{
            backgroundColor: toast.type === "error" ? "rgba(244, 63, 94, 0.12)" : "rgba(16, 185, 129, 0.12)",
            borderColor: toast.type === "error" ? "rgba(244, 63, 94, 0.4)" : "rgba(16, 185, 129, 0.4)",
            color: toast.type === "error" ? "#fda4af" : "#a7f3d0"
          }}
        >
          <span>{toast.type === "error" ? "⚠️" : "⚡"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <style>{`
        @keyframes slideDown { 0% { transform: translate3d(-50%, -40px, 0); opacity: 0; } 100% { transform: translate3d(-50%, 0, 0); opacity: 1; } }
        .animate-slideDown { animation: slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
      `}</style>

      {/* Navbar Section */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigateToView('landing')}>
            <div className="w-8 h-8 bg-slate-950 border border-slate-800/80 rounded-lg overflow-hidden p-0.5 shadow-md group-hover:border-indigo-500/40 transition-all duration-300">
              <img src="/footer-logo.png" alt="Logo" className="w-full h-full object-cover rounded-md pointer-events-none" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              PDF AI <span className="text-indigo-500 font-medium">Assistant</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
            <button onClick={() => navigateToView('landing')} className={`transition-colors ${currentView === 'landing' ? 'text-white font-semibold' : 'hover:text-white'}`}>Home</button>
            <button onClick={() => navigateToView('about')} className={`transition-colors ${currentView === 'about' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>About Us</button>
            <button onClick={() => navigateToView('services')} className={`transition-colors ${currentView === 'services' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Services</button>
            <button onClick={() => navigateToView('media')} className={`transition-colors ${currentView === 'media' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Media</button>
            <button onClick={() => navigateToView('careers')} className={`transition-colors ${currentView === 'careers' ? 'text-indigo-400 font-semibold' : 'hover:text-white'}`}>Careers</button>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 font-medium">👋 {user?.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500 transition-all duration-200">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => { setIsSignupMode(false); setShowAuthModal(true); }} className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all">Sign in</button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 md:hidden text-slate-400 hover:text-white focus:outline-none transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {!isLoggedIn && mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3.5 flex flex-col gap-2.5 text-sm text-slate-400 font-medium">
            <button onClick={() => navigateToView('landing')} className={`text-left py-2 px-3 rounded-lg transition-colors ${currentView === 'landing' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50 hover:text-white'}`}>Home</button>
            <button onClick={() => navigateToView('about')} className={`text-left py-2 px-3 rounded-lg transition-colors ${currentView === 'about' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50 hover:text-white'}`}>About Us</button>
            <button onClick={() => navigateToView('services')} className={`text-left py-2 px-3 rounded-lg transition-colors ${currentView === 'services' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50 hover:text-white'}`}>Services</button>
            <button onClick={() => navigateToView('media')} className={`text-left py-2 px-3 rounded-lg transition-colors ${currentView === 'media' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50 hover:text-white'}`}>Media</button>
            <button onClick={() => navigateToView('careers')} className={`text-left py-2 px-3 rounded-lg transition-colors ${currentView === 'careers' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-800/50 hover:text-white'}`}>Careers</button>
          </div>
        )}
      </nav>

      {/* 🚀 Main Content Router */}
      <main className={`flex-1 flex flex-col relative w-full ${isLoggedIn ? 'h-[calc(100vh-4rem)] overflow-hidden' : ''}`}>
        {isLoggedIn ? (
          <div className="flex-1 flex w-full h-full overflow-hidden bg-[#070b13] relative">
            <Sidebar
              isUploading={isUploading}
              handleFileUpload={handleFileUpload}
              uploadHistory={uploadHistory}
              selectedDocId={selectedDocId}
              setSelectedDocId={handleSelectDocument}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
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
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        ) : currentView === 'about' ? (
          <AboutUs setCurrentView={navigateToView} />
        ) : currentView === 'careers' ? (
          <Careers setCurrentView={navigateToView} />
        ) : currentView === 'media' ? (
          <Media setCurrentView={navigateToView} />
        ) : currentView === 'services' ? (
          <Services setCurrentView={navigateToView} />
        ) : currentView === 'toolkit' ? (
          <Toolkit setCurrentView={navigateToView} />
        ) : (
          <LandingPage
            setCurrentView={navigateToView}
            setIsSignupMode={setIsSignupMode}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </main>

      {/* 🔐 Clean Authentication Subcomponent */}
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isSignupMode={isSignupMode}
        setIsSignupMode={setIsSignupMode}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={handleSignup}
        handleLogin={handleLogin}
        isUploading={isUploading}
        showToast={showToast}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        fetchUserHistory={fetchUserHistory}
        BACKEND_AUTH_URL={BACKEND_AUTH_URL}
      />
    </div>
  );
}
