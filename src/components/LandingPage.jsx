import React, { useState, useEffect } from 'react';

// 🛠️ Sub-folder Component Imports
import Hero from './landing/Hero.jsx';
import ToolkitGrid from './landing/ToolkitGrid.jsx';
import Features from './landing/Features.jsx';
import Pricing from './landing/Pricing.jsx';
import Faq from './landing/Faq.jsx';
import Footer from './landing/Footer.jsx';

const ANIMATED_WORDS = ["with AI", "with Speed", "with Accuracy", "with Intelligence"];

export default function LandingPage({ setCurrentView, setIsSignupMode, setShowAuthModal }) {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing animation handler state logic
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
  }, [currentText, isDeleting, textIndex, typingSpeed]);

  return (
    <div className="w-full flex flex-col overflow-y-auto">
      {/* Render subviews with corresponding parameters */}
      <Hero
        currentText={currentText}
        setIsSignupMode={setIsSignupMode}
        setShowAuthModal={setShowAuthModal}
        setCurrentView={setCurrentView}
      />
      <ToolkitGrid
        setIsSignupMode={setIsSignupMode}
        setShowAuthModal={setShowAuthModal}
      />
      <Features />
      <Pricing
        setIsSignupMode={setIsSignupMode}
        setShowAuthModal={setShowAuthModal}
      />
      <Faq />
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
