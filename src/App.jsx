import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// 🛠️ बिल्कुल सटीक पाथ्स
import AboutUs from './components/AboutUs.jsx';
import Careers from './components/Careers.jsx';
import Media from './components/Media.jsx';
import Services from './components/Services.jsx';
import LandingPage from './components/LandingPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatBox from './components/ChatBox.jsx';
import Toolkit from './components/toolkit.jsx';
import AuthModal from './components/AuthModal.jsx';

const BACKEND_AUTH_URL = "https://pdf-ai-assistant-int4.onrender.com/api/auth";
const BACKEND_DOC_URL = "https://pdf-ai-assistant-int4.onrender.com/api/document";
const BACKEND_CHAT_URL = "https://pdf-ai-assistant-int4.onrender.com/api/document/chat";

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [phoneMode, setPhoneMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔔 इन-ऐप टोस्ट पॉप-अप स्टेट
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
      showToast(`🎉 ${res.data.message || "Document vectorized successfully!"}`);

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
      showToast(err.response?.data?.message || "PDF Upload Failed!", "error");
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
    showToast("Session purged. Disconnected from node.");
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
      const aiResponse = res.data.answer || res.data.reply || res.data.text || res.data.message || (typeof res.data === 'string' ? res.data : "I have processed your request.");
      setChat(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err) {
      console.error("AI Server Fetch Error:", err);
      setChat(prev => [...prev, {
        role: 'ai',
        text: "Neural server connection timeout."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    /* 🛠️ फिक्स्ड: जब यूज़र लॉगिन होगा तभी h-screen और overflow-hidden लगेगा, वरना बिना लॉगिन के पूरा पेज नॉर्मल स्क्रोल होगा */
    <div className={`w-full bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative
      ${isLoggedIn ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}
    >

      {/* 🔔 एनिमेटेड टोस्ट पॉप-अप यूआई */}
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
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setCurrentView('landing')}>
            <div className="w-8 h-8 bg-slate-950 border border-slate-800/80 rounded-lg overflow-hidden p-0.5 shadow-md group-hover:border-indigo-500/40 transition-all duration-300">
              <img src="/footer-logo.png" alt="Logo" className="w-full h-full object-cover rounded-md pointer-events-none" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
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
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-500 transition-all duration-200">Logout</button>
              </div>
            ) : (
              <button onClick={() => { setIsSignupMode(false); setShowAuthModal(true); }} className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all">Sign in</button>
            )}
          </div>
        </div>
      </nav>

      {/* 🚀 Main Content Router */}
      {/* 🛠️ फिक्स्ड: यहाँ भी हाइट कंडीशन केवल isLoggedIn पर ही एक्टिवेट होगी */}
      <main className={`flex-1 flex flex-col relative w-full ${isLoggedIn ? 'h-[calc(100vh-4rem)] overflow-hidden' : ''}`}>
        {isLoggedIn ? (
          <div className="flex-1 flex w-full h-full overflow-hidden bg-[#070b13]">
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
        ) : currentView === 'toolkit' ? (
          <Toolkit setCurrentView={setCurrentView} />
        ) : (
          <LandingPage
            setCurrentView={setCurrentView}
            setIsSignupMode={setIsSignupMode}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </main>

      {/* 🔐 क्लीन प्रो ऑथेंटिकेशन सब-कॉम्पोनेंट */}
      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isSignupMode={isSignupMode}
        setIsSignupMode={setIsSignupMode}
        phoneMode={phoneMode}
        setPhoneMode={setPhoneMode}
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
