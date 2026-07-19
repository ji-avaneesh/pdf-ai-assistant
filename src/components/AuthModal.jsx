import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  isSignupMode,
  setIsSignupMode,
  name, setName,
  email, setEmail,
  password, setPassword,
  handleSignup,
  handleLogin,
  isUploading,
  showToast, setIsLoggedIn, setUser, fetchUserHistory, BACKEND_AUTH_URL
}) {
  const [captchaCode, setCaptchaCode] = useState(generateRandomCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  // 🌐 Google Sign-in initialization and callback handler
  useEffect(() => {
    if (showAuthModal) {
      const initGoogle = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '825964724911-m9b3tqphk74a96p5u6r0e08f22l3o0v9.apps.googleusercontent.com',
            callback: handleGoogleLoginResponse
          });
          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-btn"),
            { 
              theme: "dark", 
              size: "large", 
              text: "continue_with", 
              shape: "pill",
              width: "350"
            }
          );
        }
      };

      initGoogle();
      const interval = setInterval(() => {
        if (window.google) {
          initGoogle();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showAuthModal]);

  const handleGoogleLoginResponse = async (response) => {
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/google`, {
        token: response.credential
      });
      const { token, user: userData } = res.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      showToast("Successfully authenticated via Google!");
      if (fetchUserHistory) {
        fetchUserHistory(token);
      }
    } catch (err) {
      console.error("🚨 Google Auth Error:", err);
      showToast(err.response?.data?.message || "Google authentication failed.", "error");
    }
  };

  const triggerSandboxGoogleLogin = async () => {
    const mockEmail = prompt("Enter developer email to simulate Google Sign-in:", "developer@pdfaiassistant.com");
    if (!mockEmail) return;
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/google`, {
        token: "sandbox-token-bypass",
        mockEmail,
        mockName: mockEmail.split('@')[0].toUpperCase()
      });
      const { token, user: userData } = res.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      showToast("Authenticated via Developer Sandbox!");
      if (fetchUserHistory) {
        fetchUserHistory(token);
      }
    } catch (err) {
      showToast("Sandbox login failed.", "error");
    }
  };

  function generateRandomCaptcha() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateRandomCaptcha());
    setUserCaptchaInput("");
    setCaptchaError(false);
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();

    if (userCaptchaInput !== captchaCode) {
      setCaptchaError(true);
      setCaptchaCode(generateRandomCaptcha());
      setUserCaptchaInput("");
      return;
    }
    setCaptchaError(false);
    if (isSignupMode) handleSignup(e);
    else handleLogin(e);
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none animate-fadeIn overflow-hidden">

      <style>{`
        @keyframes swipeLeft { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes swipeRight { 0% { opacity: 0; transform: translateX(-30px); } 100% { opacity: 1; transform: translateX(0); } }
        .animate-swipe-left { animation: swipeLeft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-swipe-right { animation: swipeRight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      `}</style>

      <div className="bg-[#0b1324] border border-slate-800/90 w-full max-w-md min-h-[590px] rounded-2xl p-7 relative shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">

        <button onClick={() => { setShowAuthModal(false); refreshCaptcha(); }} className="absolute top-5 right-5 text-slate-500 hover:text-slate-200 transition-colors z-20">
          <X className="w-5 h-5" />
        </button>

        <div key={isSignupMode ? 'signup' : 'login'} className={`flex-1 flex flex-col justify-between ${isSignupMode ? 'animate-swipe-left' : 'animate-swipe-right'}`}>
          <div>
            <div className="text-center mb-5">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-slate-950 border border-slate-800 p-1 shadow-md">
                <img src="/footer-logo.png" alt="Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                {isSignupMode ? 'Deploy Pro Instance' : 'Access Neural Network'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Verify credentials via secure gateway protocol</p>
            </div>

            {/* 🌐 Google Auth */}
            <div className="space-y-3 mb-4 flex flex-col items-center">
              <div id="google-signin-btn" className="w-full flex justify-center min-h-[44px]"></div>
              
              <button 
                type="button" 
                onClick={triggerSandboxGoogleLogin} 
                className="w-full py-1.5 px-3 rounded-xl text-[9px] font-bold font-mono text-slate-500 hover:text-slate-350 hover:bg-slate-900/30 border border-dashed border-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                ⚡ RUN DEVELOPER OAUTH BYPASS
              </button>

              <div className="flex items-center my-1 w-full">
                <div className="flex-1 border-t border-slate-800/40"></div>
                <span className="px-3 text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">Or credentials via</span>
                <div className="flex-1 border-t border-slate-800/40"></div>
              </div>
            </div>

            {/* 📝 Form Block */}
            <form onSubmit={validateAndSubmit} className="space-y-4">
              <div className={`transition-all duration-300 overflow-hidden ${isSignupMode ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <label htmlFor="auth-fullName" className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  id="auth-fullName"
                  name="fullName"
                  type="text" 
                  required={isSignupMode} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Avaneesh Kumar" 
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-700 transition-all duration-300 font-medium" 
                />
              </div>
              <div>
                <label htmlFor="auth-email" className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  id="auth-email"
                  name="email"
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="macbook@gmail.com" 
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-700 transition-all duration-300 font-medium" 
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Secure Password</label>
                <input 
                  id="auth-password"
                  name="password"
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-700 transition-all duration-300 font-medium" 
                />
              </div>

              {/* 🛡️ Captcha verification block */}
              <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-550 uppercase tracking-wider">Bot Security Verification</span>
                  {captchaError && <span className="text-[9px] font-bold text-rose-450 animate-pulse">❌ Invalid Code. Resetting...</span>}
                </div>
                <div className="flex gap-2.5 items-center">
                  <div className="bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-slate-800 px-3 py-2 rounded-lg font-mono font-extrabold text-sm tracking-[0.2em] text-indigo-400 select-none relative overflow-hidden flex items-center justify-center shadow-inner min-w-[95px] h-10">
                    <span className="line-through decoration-indigo-500/35 decoration-2 skew-x-6 select-none">{captchaCode}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={refreshCaptcha} 
                    className="h-10 w-10 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors shadow flex items-center justify-center"
                    aria-label="Refresh Captcha"
                  >
                    🔄
                  </button>
                  <input 
                    id="auth-captcha"
                    name="captcha"
                    type="text" 
                    maxLength="5" 
                    required 
                    value={userCaptchaInput} 
                    onChange={(e) => setUserCaptchaInput(e.target.value)} 
                    placeholder="Aa1" 
                    className="w-full h-10 bg-slate-950 border border-slate-800/80 rounded-lg px-2.5 py-2 text-sm text-center font-mono font-bold text-slate-200 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-800 transition-all duration-300" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading} 
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 mt-2 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-indigo-650/15 transform active:scale-[0.99]"
              >
                {isUploading ? "INITIALIZING..." : (isSignupMode ? 'Deploy Cloud Node' : 'Initialize Token Session')}
              </button>
            </form>
          </div>
        </div>

        {/* 🎚️ Mode switch slider buttons */}
        <div className="mt-5 bg-slate-950 border border-slate-850 p-1.5 rounded-xl flex relative shadow-inner shrink-0">
          <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-900 border border-slate-800 rounded-lg shadow-md transition-all duration-300 ease-out ${isSignupMode ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
          <button type="button" onClick={() => { setIsSignupMode(false); refreshCaptcha(); }} className={`relative z-10 w-1/2 py-2.5 text-[10px] font-extrabold tracking-widest transition-colors duration-300 rounded-lg ${!isSignupMode ? 'text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}>LOG IN</button>
          <button type="button" onClick={() => { setIsSignupMode(true); refreshCaptcha(); }} className={`relative z-10 w-1/2 py-2.5 text-[10px] font-extrabold tracking-widest transition-colors duration-300 rounded-lg ${isSignupMode ? 'text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}>SIGN UP</button>
        </div>

      </div>
    </div>
  );
}
