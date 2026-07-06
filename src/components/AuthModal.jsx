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
  phoneMode, setPhoneMode,
  showToast, setIsLoggedIn, setUser, fetchUserHistory, BACKEND_AUTH_URL
}) {
  const [captchaCode, setCaptchaCode] = useState(generateRandomCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  // 📲 मोबाइल ओटीपी स्टेट्स
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

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

  // 💬 गेटवे ट्रिगर विथ लाइव बटन बफ़रिंग
  const requestOtpGateway = async (channelType) => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      showToast("Please enter a valid 10-digit mobile number.", "error");
      return;
    }
    setOtpLoading(true);
    try {
      await axios.post(`${BACKEND_AUTH_URL}/send-otp`, { mobile: mobileNumber, channel: channelType });
      setIsOtpSent(true);
      showToast(`⚡ OTP code successfully routed via ${channelType === 'whatsapp' ? 'WhatsApp' : 'SMS'}!`);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to trigger OTP cluster.", "error");
    } finally {
      setOtpLoading(false);
    }
  };

  // ⚡ Auto OTP Validate (6 Digits Detect)
  useEffect(() => {
    if (otpInput.length === 6) {
      triggerAutoValidation();
    }
  }, [otpInput]);

  const triggerAutoValidation = async () => {
    setOtpLoading(true);
    showToast("🔑 Checking credentials: Validating OTP...");
    try {
      const res = await axios.post(`${BACKEND_AUTH_URL}/verify-otp`, { mobile: mobileNumber, otp: otpInput });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setIsOtpSent(false);
      setOtpInput("");
      showToast("🎉 Session authorized! Welcome back.");
      fetchUserHistory(res.data.user.id || res.data.user._id);
    } catch (err) {
      showToast(err.response?.data?.message || "Invalid OTP token check failed.", "error");
      setOtpInput("");
    } finally {
      setOtpLoading(false);
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    if (phoneMode) return;

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

        <button onClick={() => { setShowAuthModal(false); setPhoneMode(false); refreshCaptcha(); setIsOtpSent(false); setOtpInput(""); }} className="absolute top-5 right-5 text-slate-500 hover:text-slate-200 transition-colors z-20">
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
            <div className="space-y-3 mb-4">
              <button type="button" onClick={() => showToast("OAuth sandbox initializing...")} className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-950 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md group">
                <svg className="w-4 h-4 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.216 1.414 15.42 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.795-.085-1.4-.195-1.905z"/>
                </svg>
                Continue with Google
              </button>
              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-800/40"></div>
                <span className="px-3 text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">Or Gateway via</span>
                <div className="flex-1 border-t border-slate-800/40"></div>
              </div>
            </div>

            {/* 📲 Input Node Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800/60 rounded-xl mb-4 text-xs font-bold font-mono">
              <button type="button" onClick={() => setPhoneMode(false)} className={`py-1.5 rounded-lg transition-all ${!phoneMode ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>EMAIL_NODE</button>
              <button type="button" onClick={() => setPhoneMode(true)} className={`py-1.5 rounded-lg transition-all ${phoneMode ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>PHONE_OTP</button>
            </div>

            {/* 📝 Form Block */}
            <form onSubmit={validateAndSubmit} className="space-y-3">
              {!phoneMode ? (
                <>
                  <div className={`transition-all duration-300 overflow-hidden ${isSignupMode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input type="text" required={isSignupMode} value={name} onChange={(e) => setName(e.target.value)} placeholder="Avaneesh Kumar" className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 placeholder:text-slate-700 font-medium" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="macbook@gmail.com" className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 placeholder:text-slate-700 font-medium" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Secure Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 placeholder:text-slate-700 font-medium" />
                  </div>
                </>
              ) : (
                /* 📲 फोन ओटीपी लेआउट विथ लाइव बफ़रिंग स्टेट्स */
                <div className="space-y-3 animate-fadeIn">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number</label>
                    <div className="flex gap-2">
                      <span className="bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-2.5 text-sm text-slate-400 font-mono font-bold flex items-center justify-center">+91</span>
                      <input type="tel" maxLength="10" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} placeholder="98765 43210" className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 placeholder:text-slate-700 font-mono font-bold" />
                    </div>
                  </div>

                  {/* ⚡ फिक्स्ड: यहाँ बटन्स के अंदर स्पिनर लोड होगा जब यूज़र टैप करेगा */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      disabled={otpLoading || !mobileNumber || mobileNumber.length !== 10}
                      onClick={() => requestOtpGateway('sms')}
                      className="py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      {otpLoading ? "🌀 SMS Node..." : "💬 Request SMS"}
                    </button>

                    <button
                      type="button"
                      disabled={otpLoading || !mobileNumber || mobileNumber.length !== 10}
                      onClick={() => requestOtpGateway('whatsapp')}
                      className="py-2.5 px-3 rounded-xl border border-emerald-900/30 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/40 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      {otpLoading ? "🌀 WA Matrix..." : "💚 WhatsApp Code"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Enter Verification OTP (Auto-Validating)</label>
                    <input type="text" maxLength="6" value={otpInput} onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))} placeholder="X X X X X X" className="w-full bg-slate-950 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-center text-sm font-mono font-bold tracking-[0.6em] text-indigo-400 focus:outline-none focus:border-indigo-500 placeholder:text-slate-800" />
                  </div>
                </div>
              )}

              {/* 🛡️ कैप्चा बॉक्स */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Bot Security Verification</span>
                  {captchaError && <span className="text-[9px] font-bold text-rose-400 animate-pulse">❌ Invalid Code. Resetting...</span>}
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-slate-800 px-3 py-2 rounded-lg font-mono font-extrabold text-sm tracking-[0.2em] text-indigo-400 select-none relative overflow-hidden flex items-center justify-center shadow-inner min-w-[95px]">
                    <span className="line-through decoration-indigo-500/30 decoration-2 skew-x-6 select-none">{captchaCode}</span>
                  </div>
                  <button type="button" onClick={refreshCaptcha} className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 transition-colors shadow">🔄</button>
                  <input type="text" maxLength="5" required value={userCaptchaInput} onChange={(e) => setUserCaptchaInput(e.target.value)} placeholder="Aa1" className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-2.5 py-2 text-sm text-center font-mono font-bold text-slate-200 focus:outline-none focus:border-indigo-500/60 placeholder:text-slate-800" />
                </div>
              </div>

              {!phoneMode && (
                <button type="submit" disabled={isUploading} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl">
                  {isUploading ? "INITIALIZING..." : (isSignupMode ? 'Deploy Cloud Node' : 'Initialize Token Session')}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* 🎚️ स्लाइडर बटन */}
        <div className="mt-4 bg-slate-950 border border-slate-800/80 p-1.5 rounded-xl flex relative shadow-inner shrink-0">
          <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-800 rounded-lg shadow-md transition-all duration-300 ease-out ${isSignupMode ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
          <button type="button" onClick={() => { setIsSignupMode(false); refreshCaptcha(); }} className={`relative z-10 w-1/2 py-2 text-xs font-extrabold tracking-widest transition-colors duration-300 rounded-lg ${!isSignupMode ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>LOG IN</button>
          <button type="button" onClick={() => { setIsSignupMode(true); refreshCaptcha(); }} className={`relative z-10 w-1/2 py-2 text-xs font-extrabold tracking-widest transition-colors duration-300 rounded-lg ${isSignupMode ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>SIGN UP</button>
        </div>

      </div>
    </div>
  );
}
